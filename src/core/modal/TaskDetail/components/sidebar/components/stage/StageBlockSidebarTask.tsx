import React, {useEffect, useMemo, useState} from 'react';
import {getSectionsProjectsAPI} from 'core/entity/Project/api/SectionApi';
import {ITask} from 'core/entity/Task/model/model';
import {ISection} from 'core/widget/Section/model/model';
import {getValueColor} from 'core/entity/core/service/service';
import cl from './_StageBlockSidebarTask.module.scss';

interface StageBlockSidebarTaskProps {
    task: ITask
}

const StageBlockSidebarTask = ({task}: StageBlockSidebarTaskProps) => {
    const [sections, setSections] = useState<ISection[]>([])

    useEffect(() => {
        getSectionsProjectsAPI(task.project.id).then(setSections)
    }, [task.project.id])

    const activeIndex = useMemo(() => {
        const indexByBody = sections.findIndex(section => section.body?.some(item => item.id === task.id))
        if (indexByBody >= 0) return indexByBody

        return sections.findIndex(section => section.id === task.section?.id)
    }, [sections, task.id, task.section?.id])

    if (sections.length === 0 || activeIndex < 0) {
        return (
            <div className={cl.block}>
                <div className={cl.header}>
                    <span className={cl.title}>Этап</span>
                    <span className={cl.current}>Не назначен</span>
                </div>
            </div>
        )
    }

    const activeSection = sections[activeIndex]

    return (
        <div className={cl.block}>
            <div className={cl.header}>
                <span className={cl.title}>Этап</span>
                <span className={cl.current}>{activeSection.name}</span>
            </div>

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

            <div className={cl.meta}>
                {activeIndex + 1} из {sections.length}
            </div>
        </div>
    );
};

export default StageBlockSidebarTask;
