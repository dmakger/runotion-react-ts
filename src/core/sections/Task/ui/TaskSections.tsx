import React, {useEffect, useState} from 'react';
import {ISection, ISectionFunction} from "core/widget/Section/model/model";
import {getSectionsProjectsAPI, taskInOtherSectionProjectsAPI} from "core/entity/Project/api/SectionApi";
import Section from "core/widget/Section/ui/Section";
import LoadingWrapper from "core/widget/Loading/ui/wrapper/LoadingWrapper";
import {ITaskSection} from "core/sections/Task/model/model";
import {swapItemIntoSection} from "core/widget/Section/lib/section.lib";
import TaskDetailModal from 'core/modal/TaskDetail/ui/TaskDetailModal';
import CreateOrAddTaskModal from "core/modal/CreateOrAddTask/ui/CreateOrAddTaskModal";
import {addTaskInSectionAPI, createTaskAPI} from "core/entity/Task/api/TaskApi";
import {ITask} from "core/entity/Task/model/model";

interface TaskSectionsProps {
    projectId?: string | number
    className?: string
}

const TaskSections = ({projectId, className}: TaskSectionsProps) => {    
    // STATE
    const [sections, setSections] = useState<ITaskSection[]>()
    const [taskIsVisible, setTaskIsVisible] = useState(false)
    const [taskId, setTaskId] = useState<number>()

    const [sectionId, setSectionId] = useState<number>()
    const [sectionIsVisible, setSectionIsVisible] = useState(false)

    // EFFECT
    useEffect(() => {
        if (sections !== undefined || projectId === undefined) return
        getSectionsProjectsAPI(projectId).then(r => {
            setSections(r as ISection[])
        })
    }, [projectId, sections])

    // ITEM to SECTION
    const taskToSection = (newSectionId: number, itemId: number) => {
        const oldSections = sections ? [...sections] : []
        const newSections = swapItemIntoSection(itemId, newSectionId, sections)
        setSections(newSections)

        taskInOtherSectionProjectsAPI(newSectionId, itemId).catch(e => {
            setSections(oldSections)
        })
    }

    const addInSection = (task: ITask) => {
        if (sections === undefined) return
        setSections(() => {
            const sectionIndex = sections.findIndex(it => it.id === sectionId)
            const _sections = [...sections]
            let _body = _sections[sectionIndex].body
            if (_body === undefined)
                _body = []
            _sections[sectionIndex].body = [task, ..._body]
            return _sections
        })
    }

    const onTaskClick: ISectionFunction['onItemClick'] = (itemId: number) => {
        setTaskIsVisible(true)
        setTaskId(itemId)
    }

    const onAddTaskClick: ISectionFunction['onAddItemClick'] = (section: ITaskSection) => {
        setSectionIsVisible(true)
        setSectionId(section.id)
    }

    const createNewTask = () => {
        if (sections === undefined) return
        const body = {
            'project_id': projectId,
            'section_id': sectionId,
        }
        createTaskAPI(body).then(r => {
            addInSection(r)
            setSectionIsVisible(false)
            setSectionId(undefined)
        })
    }

    const addExistsTask = (task: ITask) => {
        if (sections === undefined) return
        const body = {taskId: task.id, sectionId}
        addTaskInSectionAPI(body).then(r => {
            addInSection(task)
            setSectionIsVisible(false)
            setSectionId(undefined)
        })
    }

    return (
        <LoadingWrapper isLoading={sections === undefined}>
            {sections !== undefined &&
                <Section sections={sections} itemToSection={taskToSection} 
                         onItemClick={onTaskClick} onAddItemClick={onAddTaskClick}
                         className={className}/>
            }
            <TaskDetailModal isVisible={taskIsVisible} setIsVisible={setTaskIsVisible} id={taskId}/>
            <CreateOrAddTaskModal isVisible={sectionIsVisible} setIsVisible={setSectionIsVisible}
                                  addExistsTask={addExistsTask} createNewTask={createNewTask}/>
        </LoadingWrapper>
    );
};

export default TaskSections;