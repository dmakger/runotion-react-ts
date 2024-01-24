import React from 'react';
import {ITable} from "core/widget/Table/model/model";
import cl from './_ContentTable.module.scss'
import {cls} from "core/service/cls";
import LineTable from "core/widget/Table/components/Line/LineTable";

interface ContentTableProps {
    content?: ITable["content"]
    onClick?: Function
    className?: string
}

const ContentTable = ({content, onClick = () => {}, className}: ContentTableProps) => {
    if (content === undefined || content.length === 0)
        return <></>
    

    return (
        <tbody className={cls(cl.content, className)}>
            {content.map((line, index) => (
                <React.Fragment key={index}>
                    <LineTable line={line} className={cl.line} onClick={() => onClick(line)}/>
                    {index < content.length - 1 && (
                        <tr className={cl.bottomLine}>
                            <td colSpan={line.line.length} />
                        </tr>
                    )}
                </React.Fragment>
            ))}
        </tbody>
    );
};

export default ContentTable;