import React from 'react';
import {ICellTable} from "core/widget/Table/model/model";
import {cls} from "core/service/cls";
import {getImage} from "core/service/image";
import cl from './_CellTable.module.scss'

interface CellTableProps {
    cell: ICellTable
    isHeader?: boolean
    className?: string
    style?: React.CSSProperties
}

const CellTable = ({cell, isHeader=false, className, ...resp}: CellTableProps) => {
    const content = (
        <>
            {cell.image &&
                <img src={getImage(cell.image)}
                     alt={cell.title} className={cl.image}/>
            }
            <span className={cls(cl.title, cell.isEmpty ? cl.empty : '')}>
                {cell.title}
            </span>
        </>
    )

    if (isHeader)
        return (
            <th className={cls(cl.cell, className)} {...resp}>{content}</th>
        )

    return (
        <td className={cls(cl.cell, className)} {...resp}>{content}</td>

    );
};

export default CellTable;