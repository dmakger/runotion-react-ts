import React from 'react';
import {useParams} from "react-router-dom";
import TaskSections from "core/sections/Task/ui/TaskSections";

const KanbanProjectTaskPage = () => {
    let { projectId } = useParams();
    return (
        <TaskSections projectId={projectId} />
    );
};

export default KanbanProjectTaskPage;