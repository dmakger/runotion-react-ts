import React, {useEffect, useRef, useState} from 'react';
import cl from './_LineTable.module.scss'
import {ILineTable} from "core/widget/Table/model/model";
import {cls} from "core/service/cls";
import CellTable from "core/widget/Table/components/Cell/CellTable";

interface LineTableProps {
    line: ILineTable
    isHeader?: boolean
    className?: string
    onClick?: Function
}

const LineTable = ({line, isHeader=false, className, onClick = () => {}}: LineTableProps) => {
    const lineRef = useRef<HTMLTableRowElement>(null);
    const [widthCell, setWidthCell] = useState<number>()

    useEffect(() => {
        if (lineRef.current) {
            const blockWidth = lineRef.current.getBoundingClientRect().width;
            setWidthCell((blockWidth - (line.line.length - 1) * 10 - 40) / line.line.length)
        }
    }, [line.line.length]);


    return (
        <tr className={cls(cl.line, className)} ref={lineRef} onClick={() => onClick(line.id)}>
            {line.line.map((cell, index) => (
                <CellTable cell={cell} isHeader={isHeader} key={index} style={{
                    'width': `${widthCell}px`
                }}/>
            ))}
        </tr>
    );
};

export default LineTable;