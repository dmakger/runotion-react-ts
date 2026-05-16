import React, {useCallback, useEffect, useState} from 'react';
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
import {useSearchParams} from "react-router-dom";

interface TaskSectionsProps {
    projectId?: string | number
    className?: string
}

const TaskSections = ({projectId, className}: TaskSectionsProps) => {    
    // STATE
    const [sections, setSections] = useState<ITaskSection[]>()
    const [taskIsVisible, setTaskIsVisible] = useState(false)
    const [taskId, setTaskId] = useState<number>()
    const [searchParams, setSearchParams] = useSearchParams()

    const loadSections = useCallback(() => {
        if (projectId === undefined) return Promise.resolve()
        return getSectionsProjectsAPI(projectId).then(r => {
            setSections(r as ISection[])
        })
    }, [projectId])

    // EFFECT
    useEffect(() => {
        if (sections !== undefined || projectId === undefined) return
        loadSections()
    }, [loadSections, projectId, sections])

    useEffect(() => {
        const nextTaskId = Number(searchParams.get('task'))
        if (!nextTaskId || nextTaskId === taskId) return

        setTaskId(nextTaskId)
        setTaskIsVisible(true)
    }, [searchParams, taskId])

    useEffect(() => {
        const handleTaskChanged = (event: Event) => {
            const detail = (event as CustomEvent).detail
            const changedProjectId = detail?.projectId || detail?.task?.project?.id
            if (projectId !== undefined && Number(changedProjectId) !== Number(projectId)) return
            loadSections()
        }

        window.addEventListener('runotion:task-created', handleTaskChanged)
        window.addEventListener('runotion:task-updated', handleTaskChanged)
        return () => {
            window.removeEventListener('runotion:task-created', handleTaskChanged)
            window.removeEventListener('runotion:task-updated', handleTaskChanged)
        }
    }, [loadSections, projectId])

    // ITEM to SECTION
    const taskToSection = (newSectionId: number, itemId: number, insertIndex = 0) => {
        const oldSections = sections ? [...sections] : []
        const targetSection = sections?.find(section => section.id === newSectionId)
        const nextCompletedAt = targetSection?.is_final ? new Date().toISOString() : null
        const newSections = swapItemIntoSection(itemId, newSectionId, sections, insertIndex)?.map(section => ({
            ...section,
            body: section.body?.map(task => task.id === itemId ? {...task, completed_at: nextCompletedAt} : task),
        }))
        setSections(newSections)

        taskInOtherSectionProjectsAPI(newSectionId, itemId, insertIndex + 1).catch(e => {
            setSections(oldSections)
        })
    }

    const onTaskClick: ISectionFunction['onItemClick'] = (itemId: number) => {
        setTaskIsVisible(true)
        setTaskId(itemId)
        const nextParams = new URLSearchParams(searchParams)
        nextParams.set('task', String(itemId))
        nextParams.delete('modal')
        setSearchParams(nextParams)
    }

    const setTaskModalVisible = (nextVisible: React.SetStateAction<boolean>) => {
        setTaskIsVisible(prev => {
            const resolvedVisible = typeof nextVisible === 'function' ? nextVisible(prev) : nextVisible
            if (resolvedVisible) return resolvedVisible

            const nextParams = new URLSearchParams(searchParams)
            nextParams.delete('task')
            setSearchParams(nextParams)
            return resolvedVisible
        })
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
            window.dispatchEvent(new CustomEvent('runotion:task-created', {
                detail: {
                    task: r,
                    projectId,
                }
            }))
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

    const toggleSectionFinal = (section: ISection, isFinal: boolean) => {
        if (projectId === undefined || sections === undefined) return

        const previousSections = [...sections]
        setSections(prev => prev?.map(item => item.id === section.id ? {...item, is_final: isFinal} : item))

        updateSectionProjectAPI(projectId, section.id, {is_final: isFinal}).catch(() => {
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
                         onSectionFinalToggle={toggleSectionFinal}
                         className={className}/>
            }
            <TaskDetailModal isVisible={taskIsVisible} setIsVisible={setTaskModalVisible} id={taskId}/>
        </LoadingWrapper>
    );
};

export default TaskSections;
