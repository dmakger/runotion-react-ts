import React from 'react';
import {cls} from "core/service/cls";
import cl from './_HeaderSectionItem.module.scss'

interface HeaderSectionItemProps {
    name: string
    color?: string
    className?: string
}

const HeaderSectionItem = ({name, color, className}: HeaderSectionItemProps) => {
    const style = {backgroundColor: color}
    return (
        <div className={cls(cl.block, className)} style={style}>
            <span>{name}</span>
        </div>
    );
};

export default HeaderSectionItem;