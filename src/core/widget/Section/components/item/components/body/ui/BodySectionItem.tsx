import React from 'react';
import cl from './_BodySectionItem.module.scss'
import {cls} from "core/service/cls";
import ItemBodySectionItem
    from "core/widget/Section/components/item/components/body/components/item/ItemBodySectionItem";

interface BodySectionItemProps {
    body?: any[]
    color?: string
    className?: string
}

const BodySectionItem = ({body, color, className}: BodySectionItemProps) => {
    return (
        <div className={cls(cl.body, className)}>
            {body?.map((it, index) => (
                <ItemBodySectionItem sectionData={it} color={color} key={index} />
            ))}
        </div>
    );
};

export default BodySectionItem;