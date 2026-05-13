import React from 'react';
import {ICellTable} from "core/widget/Table/model/model";
import {cls} from "core/service/cls";
import cl from './_CellTable.module.scss'
import EntityImage, {EEntityImageVariant} from "core/components/EntityImage/EntityImage";

interface CellTableProps {
    cell: ICellTable
    isHeader?: boolean
    className?: string
    style?: React.CSSProperties
}

const CellTable = ({cell, isHeader=false, className, ...resp}: CellTableProps) => {
    const imageVariant = cell.entity === 'project' ? EEntityImageVariant.PROJECT : EEntityImageVariant.USER
    const content = (
        <>
            {(cell.image || cell.entity) &&
                <EntityImage src={cell.image}
                             title={cell.title}
                             variant={imageVariant}
                             className={cl.image}/>
            }
            {cell.color &&
                <span className={cl.color} style={{backgroundColor: cell.color}}/>
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
