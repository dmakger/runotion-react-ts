import React from 'react';
import {cls} from "core/service/cls";
import cl from './_ItemBodySectionItem.module.scss'
import TaskCode from "core/entity/Task/ui/code/TaskCode";

interface ItemBodySectionItemProps {
    sectionData: any
    color?: string
    className?: string
}

const ItemBodySectionItem = ({sectionData, color, className}: ItemBodySectionItemProps) => {

    const style = {
        borderLeft: `3px solid ${color}`,
    }


    return (
        <div className={cls(cl.block, className)} style={style}>
            <span className={cl.name}>{sectionData.name}</span>
            <TaskCode code={sectionData.code} className={cl.code} classNameImage={cl.codeImage} classNameCode={cl.codeText}/>
        </div>
    );
};

export default ItemBodySectionItem;