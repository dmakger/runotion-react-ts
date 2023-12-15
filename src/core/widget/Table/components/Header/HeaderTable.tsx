import React from 'react';
import {ITable} from "core/widget/Table/model/model";
import cl from './_HeaderTable.module.scss'
import LineTable from "core/widget/Table/components/Line/LineTable";

interface HeaderTableProps {
    line: ITable["header"]
    className?: string
}

const HeaderTable = ({line, className}: HeaderTableProps) => {
    return (
        <thead className={className}>
            <LineTable line={line} isHeader={true} className={cl.line} />
        </thead>
    );
};

export default HeaderTable;