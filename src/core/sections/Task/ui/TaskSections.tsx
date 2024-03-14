import React, {useEffect, useState} from 'react';
import {ISection} from "core/widget/Section/model/model";
import {getSectionsProjectsAPI, taskInOtherSectionProjectsAPI} from "core/entity/Project/api/SectionApi";
import Section from "core/widget/Section/ui/Section";
import LoadingWrapper from "core/widget/Loading/ui/wrapper/LoadingWrapper";
import {ITaskSection} from "core/sections/Task/model/model";
import {useSortable} from "@dnd-kit/sortable";
import {ITask} from "core/entity/Task/model/model";
import {swapItemIntoSection} from "core/widget/Section/lib/section.lib";

interface TaskSectionsProps {
    projectId?: string | number
    className?: string
}

const TaskSections = ({projectId, className}: TaskSectionsProps) => {
    // STATE
    const [sections, setSections] = useState<ITaskSection[]>()
    console.log(sections)

    // EFFECT
    useEffect(() => {
        if (sections !== undefined || projectId === undefined) return
        getSectionsProjectsAPI(projectId).then(r => {
            setSections(r as ISection[])
        })
    }, [projectId, sections])

    useEffect(() => {
        console.log('sections', sections)
    }, [sections])

    // ITEM to SECTION
    const taskToSection = (newSectionId: number, itemId: number) => {
        console.log('taskToSection', newSectionId, itemId)
        const oldSections = sections ? [...sections] : []
        const newSections = swapItemIntoSection(itemId, newSectionId, sections)
        console.log(newSections)
        setSections(newSections)

        taskInOtherSectionProjectsAPI(newSectionId, itemId).catch(e => {
            setSections(oldSections)
        })
    }
    
    return (
        <LoadingWrapper isLoading={sections === undefined}>
            {sections !== undefined &&
                <Section sections={sections} setSections={setSections} itemToSection={taskToSection} className={className}/>
            }
        </LoadingWrapper>
    );
};

export default TaskSections;