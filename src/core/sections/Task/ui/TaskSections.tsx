import React, {useEffect, useState} from 'react';
import {ISection, ISectionFunction} from "core/widget/Section/model/model";
import {
    createSectionProjectAPI,
    getSectionsProjectsAPI,
    taskInOtherSectionProjectsAPI,
    updateSectionProjectAPI
} from "core/entity/Project/api/SectionApi";
import Section from "core/widget/Section/ui/Section";
import LoadingWrapper from "core/widget/Loading/ui/wrapper/LoadingWrapper";
import {ITaskSection} from "core/sections/Task/model/model";
import {swapItemIntoSection} from "core/widget/Section/lib/section.lib";
import TaskDetailModal from 'core/modal/TaskDetail/ui/TaskDetailModal';
import {createTaskAPI} from "core/entity/Task/api/TaskApi";

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
    const taskToSection = (newSectionId: number, itemId: number, insertIndex = 0) => {
        const oldSections = sections ? [...sections] : []
        const newSections = swapItemIntoSection(itemId, newSectionId, sections, insertIndex)
        setSections(newSections)

        taskInOtherSectionProjectsAPI(newSectionId, itemId, insertIndex + 1).catch(e => {
            setSections(oldSections)
        })
    }

    const onTaskClick: ISectionFunction['onItemClick'] = (itemId: number) => {
        setTaskIsVisible(true)
        setTaskId(itemId)
    }

    const onAddTaskClick: ISectionFunction['onAddItemClick'] = (section: ITaskSection) => {
        if (sections === undefined) return
        const body = {
            'project_id': projectId,
            'section_id': section.id,
        }
        createTaskAPI(body).then(r => {
            setSections(prev => {
                if (prev === undefined) return prev
                return prev.map(item => {
                    if (item.id !== section.id) return item
                    return {...item, body: [...(item.body || []), r]}
                })
            })
        })
    }

    const addSection = (name: string, color: string) => {
        if (projectId === undefined || sections === undefined) return

        createSectionProjectAPI(projectId, {name, color_value: color}).then((section: ITaskSection) => {
            setSections(prev => {
                if (prev === undefined) return prev
                return [...prev, {...section, body: section.body || []}]
            })
        })
    }

    const moveSection = (sectionId: number, nextIndex: number, previousSections: ISection[]) => {
        if (projectId === undefined) return

        updateSectionProjectAPI(projectId, sectionId, {position: nextIndex + 1}).catch(() => {
            setSections(previousSections as ITaskSection[])
        })
    }

    return (
        <LoadingWrapper isLoading={sections === undefined}>
            {sections !== undefined &&
                <Section sections={sections} itemToSection={taskToSection} 
                         onItemClick={onTaskClick} onAddItemClick={onAddTaskClick}
                         onAddSection={addSection}
                         onSectionsChange={(nextSections) => setSections(nextSections as ITaskSection[])}
                         onSectionMove={moveSection}
                         className={className}/>
            }
            <TaskDetailModal isVisible={taskIsVisible} setIsVisible={setTaskIsVisible} id={taskId}/>
        </LoadingWrapper>
    );
};

export default TaskSections;
