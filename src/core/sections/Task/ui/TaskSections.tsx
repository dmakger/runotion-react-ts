import React, {useEffect, useState} from 'react';
import {ISection} from "core/widget/Section/model/model";
import {getSectionsProjectsAPI} from "core/entity/Project/api/SectionApi";
import Section from "core/widget/Section/ui/Section";
import LoadingWrapper from "core/widget/Loading/ui/wrapper/LoadingWrapper";
import {ITaskSection} from "core/sections/Task/model/model";
import {useSortable} from "@dnd-kit/sortable";

interface TaskSectionsProps {
    projectId?: string | number
    className?: string
}

const TaskSections = ({projectId, className}: TaskSectionsProps) => {
    const [sections, setSections] = useState<ITaskSection[]>()

    useEffect(() => {
        if (sections !== undefined || projectId === undefined) return
        getSectionsProjectsAPI(projectId).then(r => {
            setSections(r as ISection[])
        })
    }, [projectId, sections])

    return (
        <LoadingWrapper isLoading={sections === undefined}>
            {sections !== undefined &&
                <Section sections={sections} setSections={setSections} className={className}/>
            }
        </LoadingWrapper>
    );
};

export default TaskSections;