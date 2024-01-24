import React from 'react';
import HeaderTable from "core/widget/Table/components/Header/HeaderTable";
import {ITable} from "core/widget/Table/model/model";
import ContentTable from "core/widget/Table/components/Content/ContentTable";
import cl from './_Table.module.scss'
import {cls} from "core/service/cls";
import LoadingLoop from "core/widget/Loading/ui/loop/LoadingLoop";

interface TableProps {
    table?: ITable
    className?: string
}

const Table = ({table, className}: TableProps) => {
    if (table === undefined)
        return <LoadingLoop/>
    return (
        <table className={cls(cl.table, className)}>
            <HeaderTable line={table!.header}/>
            <ContentTable content={table!.content} onClick={table!.onLineClick}/>
        </table>
    );
};

export default Table;