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
import SearchInput from "core/components/SearchInput/SearchInput";
import cl from './_ProjectTable.module.scss';


interface ProjectTableProps {
    className?: string
}

const ProjectTable = ({className}: ProjectTableProps) => {
    const [projects, setProjects] = useState<IProject[]>([])
    const [tableData, setTableData] = useState<ITable>()
    const [search, setSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(Number(DATA_PARAMS_PROJECT.limit || 20))
    const [pagination, setPagination] = useState({count: 0, pages: 0, currentPage: 1})
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
            onLineClick: handleOnLineClick,
            emptyText: 'Проектов пока нет',
            pagination: {
                count: pagination.count,
                pages: pagination.pages,
                currentPage: pagination.currentPage,
                limit,
                limits: [10, 20, 30, 50],
                onPageChange: setPage,
                onLimitChange: (nextLimit) => {
                    setLimit(nextLimit)
                    setPage(1)
                },
            },
        })
    }, [handleOnLineClick, limit, pagination, projects])

    useEffect(() => {
        getProjectsAPI({...DATA_PARAMS_PROJECT, page: String(page), limit: String(limit), search: debouncedSearch || undefined}).then(r => {
            setProjects(r.results)
            setPagination({
                count: r.count || 0,
                pages: r.pages || 0,
                currentPage: r.current_page || page,
            })
        });
    }, [debouncedSearch, limit, page])

    useEffect(() => {
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

    useEffect(() => {
        const timeout = window.setTimeout(() => setDebouncedSearch(search.trim()), 300)
        return () => window.clearTimeout(timeout)
    }, [search])

    useEffect(() => {
        setPage(1)
    }, [debouncedSearch])

    return (
        <>
            <SearchInput value={search}
                         onChange={setSearch}
                         placeholder={'Поиск по проектам, участникам, ролям и коду'}
                         className={cl.search}/>
            <Table table={tableData} className={className}/>
        </>
    );
};

export default ProjectTable;
