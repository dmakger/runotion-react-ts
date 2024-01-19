import React, {useEffect, useState} from 'react';
import {ILineTable, ITable} from "core/widget/Table/model/model";
import {DATA_HEADER_PROJECT_TABLE} from "core/tables/Project/data/data";
import {DATA_PARAMS_PROJECT} from "core/entity/Project/data/data";
import Table from "core/widget/Table/ui/Table";
import {getProjectsAPI} from "core/entity/Project/api/ProjectApi";
import {projectListToTableContent} from "core/tables/Project/service/service";
import {useNavigate} from "react-router-dom";
import {PROJECT__TASK__MAIN_URL} from "main/router/urlRouter";


interface ProjectTableProps {
    className?: string
}

const ProjectTable = ({className}: ProjectTableProps) => {
    const [tableData, setTableData] = useState<ITable>()
    const navigate = useNavigate()

    const handleOnLineClick = (line: ILineTable) => {
        if (line.id === undefined) return

        const url = PROJECT__TASK__MAIN_URL.replace(':projectId', line.id.toString());
        navigate(url)
    }

    useEffect(() => {
        getProjectsAPI(DATA_PARAMS_PROJECT).then(r => {
            setTableData({
                header: DATA_HEADER_PROJECT_TABLE,
                content: projectListToTableContent(r.results),
                onLineClick: handleOnLineClick
            })
        });
    }, []);

    return (
        <Table table={tableData} className={className}/>
    );
};

export default ProjectTable;