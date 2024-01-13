import React from 'react';
import TaskTable from "core/tables/Task/ui/TaskTable";
import {useParams} from "react-router-dom";

const ProjectTaskPage = () => {
    let { projectId } = useParams();
    return (
        <TaskTable projectId={projectId ? parseInt(projectId) : undefined} />
    );
};

export default ProjectTaskPage;