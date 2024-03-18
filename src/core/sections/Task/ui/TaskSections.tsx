import React, {useEffect, useState} from 'react';
import {ISection, ISectionFunction} from "core/widget/Section/model/model";
import {getSectionsProjectsAPI, taskInOtherSectionProjectsAPI} from "core/entity/Project/api/SectionApi";
import Section from "core/widget/Section/ui/Section";
import LoadingWrapper from "core/widget/Loading/ui/wrapper/LoadingWrapper";
import {ITaskSection} from "core/sections/Task/model/model";
import {useSortable} from "@dnd-kit/sortable";
import {ITask} from "core/entity/Task/model/model";
import {swapItemIntoSection} from "core/widget/Section/lib/section.lib";
import TaskDetailModal from 'core/modal/TaskDetail/ui/TaskDetailModal';

interface TaskSectionsProps {
    projectId?: string | number
    className?: string
}

const TaskSections = ({projectId, className}: TaskSectionsProps) => {    
    // STATE
    const [sections, setSections] = useState<ITaskSection[]>()
    const [taskIsVisible, setTaskIsVisible] = useState(false)
    const [taskId, setTaskId] = useState<number>()

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

    // const onTaskClick: ISectionFunction['onItemClick'] = (item: ITask) => {
    const onTaskClick: ISectionFunction['onItemClick'] = (itemId: number) => {
        console.log('onTaskClick');
        
        setTaskIsVisible(true)
        setTaskId(itemId)
    }

    const onAddTaskClick: ISectionFunction['onAddItemClick'] = (section: ITaskSection) => {
        console.log('onAddTaskClick', section);
    }
    
    return (
        <LoadingWrapper isLoading={sections === undefined}>
            {sections !== undefined &&
                <Section sections={sections} itemToSection={taskToSection} 
                         onItemClick={onTaskClick} onAddItemClick={onAddTaskClick}
                         className={className}/>
            }
            <TaskDetailModal isVisible={taskIsVisible} setIsVisible={setTaskIsVisible} id={taskId}/>
        </LoadingWrapper>
    );
};

export default TaskSections;