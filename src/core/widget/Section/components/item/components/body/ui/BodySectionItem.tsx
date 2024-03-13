import React from 'react';
import cl from './_BodySectionItem.module.scss'
import {cls} from "core/service/cls";
import ItemBodySectionItem
    from "core/widget/Section/components/item/components/body/components/item/ItemBodySectionItem";
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

interface BodySectionItemProps {
    body?: any[]
    color?: string
    className?: string
}

const BodySectionItem = ({body, color, className}: BodySectionItemProps) => {
    return (
        <div className={cls(cl.body, className)}>
            <SortableContext items={body ? body : []} strategy={verticalListSortingStrategy}>
                {body?.map((it, index) => (
                    <ItemBodySectionItem sectionData={it} color={color} key={index} />
                ))}
            </SortableContext>
        </div>
    );
};

export default BodySectionItem;