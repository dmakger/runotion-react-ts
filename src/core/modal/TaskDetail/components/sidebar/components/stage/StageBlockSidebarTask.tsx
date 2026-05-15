import React, {useEffect, useMemo, useState} from 'react';
import {getSectionsProjectsAPI, taskInOtherSectionProjectsAPI} from 'core/entity/Project/api/SectionApi';
import {ITask} from 'core/entity/Task/model/model';
import {ISection} from 'core/widget/Section/model/model';
import {getValueColor} from 'core/entity/core/service/service';
import SmartSelect, {ISmartSelectOption} from 'core/components/SmartSelect/SmartSelect';
import cl from './_StageBlockSidebarTask.module.scss';

interface StageBlockSidebarTaskProps {
    task: ITask
    onTaskChange?: (task: ITask) => void
}

const StageBlockSidebarTask = ({task, onTaskChange = () => {}}: StageBlockSidebarTaskProps) => {
    const [sections, setSections] = useState<ISection[]>([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        getSectionsProjectsAPI(task.project.id).then(setSections)
    }, [task.project.id])

    const activeIndex = useMemo(() => {
        const indexByBody = sections.findIndex(section => section.body?.some(item => item.id === task.id))
        if (indexByBody >= 0) return indexByBody

        return sections.findIndex(section => section.id === task.section?.id)
    }, [sections, task.id, task.section?.id])

    const activeSection = activeIndex >= 0 ? sections[activeIndex] : undefined
    const sectionOptions: ISmartSelectOption[] = sections.map(section => ({
        value: section.id,
        label: section.name,
        subtitle: section.is_final ? 'Завершающий этап' : 'Этап проекта',
        color: getValueColor(section.color),
    }))

    const changeStage = (sectionId: string) => {
        const nextSection = sections.find(section => section.id === Number(sectionId))
        if (nextSection === undefined || nextSection.id === activeSection?.id) return

        setIsLoading(true)
        taskInOtherSectionProjectsAPI(nextSection.id, task.id).then(() => {
            const updatedTask = {
                ...task,
                section: nextSection,
                completed_at: nextSection.is_final ? new Date().toISOString() : null,
            }
            onTaskChange(updatedTask)
            window.dispatchEvent(new CustomEvent('runotion:task-updated', {
                detail: {
                    task: updatedTask,
                    projectId: task.project.id,
                }
            }))
        }).finally(() => setIsLoading(false))
    }

    return (
        <div className={cl.block}>
            <div className={cl.header}>
                <span className={cl.title}>Этап</span>
                <span className={cl.current}>{activeSection?.name || 'Не назначен'}</span>
            </div>

            {sections.length > 0 && activeIndex >= 0 &&
                <div className={cl.progress}>
                    {sections.map((section, index) => {
                        const color = getValueColor(section.color)
                        const isCompleted = index <= activeIndex

                        return (
                            <div className={cl.step} key={section.id}>
                                <span className={isCompleted ? cl.stepLineCompleted : cl.stepLine}
                                      style={isCompleted ? {backgroundColor: color} : undefined}/>
                                <span className={isCompleted ? cl.stepDotCompleted : cl.stepDot}
                                      style={isCompleted ? {backgroundColor: color, boxShadow: `0 0 14px ${color}55`} : undefined}/>
                            </div>
                        )
                    })}
                </div>
            }

            <div className={cl.meta}>
                {activeIndex >= 0 ? `${activeIndex + 1} из ${sections.length}` : 'Этап еще не выбран'}
            </div>

            <SmartSelect value={activeSection?.id || ''}
                         options={sectionOptions}
                         onChange={(value) => changeStage(String(value))}
                         placeholder={'Выбрать этап'}
                         searchPlaceholder={'Найти этап'}
                         emptyText={'Этапов пока нет'}
                         disabled={isLoading || sections.length === 0}
                         className={cl.select}/>
        </div>
    );
};

export default StageBlockSidebarTask;
