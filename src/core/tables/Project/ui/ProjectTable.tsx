import React, {useCallback, useEffect, useState} from 'react';
import {ILineTable, ITable} from "core/widget/Table/model/model";
import {DATA_HEADER_PROJECT_TABLE} from "core/tables/Project/data/data";
import {DATA_PARAMS_PROJECT} from "core/entity/Project/data/data";
import Table from "core/widget/Table/ui/Table";
import {getProjectsAPI} from "core/entity/Project/api/ProjectApi";
import {projectListToTableContent} from "core/tables/Project/service/service";
import {useNavigate} from "react-router-dom";
import {PROJECT__TASK__MAIN_URL} from "main/router/urlRouter";
import {IProject} from "core/entity/Project/model/model";


interface ProjectTableProps {
    className?: string
}

const ProjectTable = ({className}: ProjectTableProps) => {
    const [projects, setProjects] = useState<IProject[]>([])
    const [tableData, setTableData] = useState<ITable>()
    const navigate = useNavigate()

    const handleOnLineClick = useCallback((line: ILineTable) => {
        if (line.id === undefined) return

        const url = PROJECT__TASK__MAIN_URL.replace(':projectId', line.id.toString());
        navigate(url)
    }, [navigate])

    useEffect(() => {
        setTableData({
            header: DATA_HEADER_PROJECT_TABLE,
            content: projectListToTableContent(projects),
            onLineClick: handleOnLineClick
        })
    }, [handleOnLineClick, projects])

    useEffect(() => {
        getProjectsAPI(DATA_PARAMS_PROJECT).then(r => {
            setProjects(r.results)
        });

        const handleProjectCreated = (event: Event) => {
            const project = (event as CustomEvent).detail?.project
            if (!project) return
            setProjects(prev => prev.some(item => item.id === project.id) ? prev : [project, ...prev])
        }
        const handleProjectUpdated = (event: Event) => {
            const project = (event as CustomEvent).detail?.project
            if (!project) return
            setProjects(prev => prev.map(item => item.id === project.id ? {...item, ...project} : item))
        }
        const handleProjectDeleted = (event: Event) => {
            const projectId = (event as CustomEvent).detail?.projectId
            if (!projectId) return
            setProjects(prev => prev.filter(item => item.id !== Number(projectId)))
        }

        window.addEventListener('runotion:project-created', handleProjectCreated)
        window.addEventListener('runotion:project-updated', handleProjectUpdated)
        window.addEventListener('runotion:project-deleted', handleProjectDeleted)
        return () => {
            window.removeEventListener('runotion:project-created', handleProjectCreated)
            window.removeEventListener('runotion:project-updated', handleProjectUpdated)
            window.removeEventListener('runotion:project-deleted', handleProjectDeleted)
        }
    }, []);

    return (
        <Table table={tableData} className={className}/>
    );
};

export default ProjectTable;
