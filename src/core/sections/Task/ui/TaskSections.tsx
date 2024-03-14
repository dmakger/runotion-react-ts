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


    const swapItemIntoSection = (itemId: number, newSectionId: number, oldSectionId?: number) => {
        let _oldSectionId = oldSectionId !== undefined ? oldSectionId : sections?.find(_section => _section.body?.find(it => it.id === itemId))?.id
        console.log(_oldSectionId);
        
        if (_oldSectionId === undefined) return 
        setSections(prevSections => {
            let _prevSections: ITaskSection[] = []
            if (prevSections !== undefined)
                _prevSections = [...prevSections]

            const newIndex = _prevSections.findIndex(it => it.id === newSectionId)
            const oldIndex = _prevSections.findIndex(it => it.id === _oldSectionId)

            let newBody = _prevSections[newIndex].body
            if (newBody === undefined)
                newBody = []
            let oldBody = _prevSections[oldIndex].body
            if (oldBody === undefined)
                oldBody = []

            const item = oldBody.find(it => it.id === itemId)
            if (item === undefined) return prevSections

            _prevSections[newIndex].body = [item, ...newBody]
            _prevSections[oldIndex].body = oldBody.filter(it => it.id !== itemId)
            return _prevSections
        })
    }


    const taskToSection = (newSectionId: number, itemId: number) => {
        const oldSections = sections ? [...sections] : []
        swapItemIntoSection(itemId, newSectionId)

        taskInOtherSectionProjectsAPI(newSectionId, itemId).catch(e => {
            setSections(oldSections)
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