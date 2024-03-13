import React, {useEffect, useState} from 'react';
import {ISection} from "core/widget/Section/model/model";
import {getSectionsProjectsAPI, taskInOtherSectionProjectsAPI} from "core/entity/Project/api/SectionApi";
import Section from "core/widget/Section/ui/Section";
import LoadingWrapper from "core/widget/Loading/ui/wrapper/LoadingWrapper";
import {ITaskSection} from "core/sections/Task/model/model";
import {useSortable} from "@dnd-kit/sortable";
import {ITask} from "core/entity/Task/model/model";

interface TaskSectionsProps {
    projectId?: string | number
    className?: string
}

const TaskSections = ({projectId, className}: TaskSectionsProps) => {
    const [sections, setSections] = useState<ITaskSection[]>()
    console.log(sections)

    useEffect(() => {
        if (sections !== undefined || projectId === undefined) return
        getSectionsProjectsAPI(projectId).then(r => {
            setSections(r as ISection[])
        })
    }, [projectId, sections])


    const taskToSection = (section: ITaskSection, item: ITask) => {
        if (projectId === undefined) return
        taskInOtherSectionProjectsAPI(section.id, item.id).then(r => {
            setSections(prevSections => {
                let _prevSections: ITaskSection[] = []
                if (prevSections !== undefined)
                    _prevSections = [...prevSections]
                const newIndexSection = _prevSections.findIndex(_section => _section.id === section.id)
                const oldIndexSection = _prevSections.findIndex(_section => (
                    _section.body?.map(it => it.id === item.id)
                ))

                let newBody = _prevSections[newIndexSection].body
                if (newBody === undefined)
                    newBody = []
                let oldBody = _prevSections[oldIndexSection].body
                if (oldBody === undefined)
                    oldBody = []

                _prevSections[newIndexSection].body = [item, ...newBody]
                _prevSections[oldIndexSection].body = oldBody.filter(it => it.id !== item.id)
                return _prevSections
            })
        })
    }

    //project/1/task/task/section-project/40/task/19/update/
    //task/section-project/40/task/19/update/
    
    return (
        <LoadingWrapper isLoading={sections === undefined}>
            {sections !== undefined &&
                <Section sections={sections} setSections={setSections} itemToSection={taskToSection} className={className}/>
            }
        </LoadingWrapper>
    );
};

export default TaskSections;