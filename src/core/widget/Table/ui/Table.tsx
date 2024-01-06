import React from 'react';
import HeaderTable from "core/widget/Table/components/Header/HeaderTable";
import {ITable} from "core/widget/Table/model/model";
import ContentTable from "core/widget/Table/components/Content/ContentTable";
import cl from './_Table.module.scss'
import {cls} from "core/service/cls";
import LoadingWrapper from "core/widget/Loading/ui/wrapper/LoadingWrapper";

interface TableProps {
    table?: ITable
    className?: string
}

const Table = ({table, className}: TableProps) => {
    return (
        <table className={cls(cl.table, className)}>
            <LoadingWrapper isLoading={table === undefined}>
                {table &&
                    <>
                        <HeaderTable line={table!.header}/>
                        <ContentTable content={table!.content} onClick={table!.onLineClick}/>
                    </>
                }
            </LoadingWrapper>
        </table>
    );
};

export default Table;