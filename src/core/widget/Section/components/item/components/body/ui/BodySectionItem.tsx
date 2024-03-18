import React from 'react';
import cl from './_BodySectionItem.module.scss'
import {cls} from "core/service/cls";
import ItemBodySectionItem
    from "core/widget/Section/components/item/components/body/components/item/ItemBodySectionItem";
import {SortableContext} from '@dnd-kit/sortable';
import {ETypeSection} from "core/widget/Section/model/model";

interface BodySectionItemProps {
    body?: any[]
    color?: string
    className?: string
}

const BodySectionItem = ({body, color, className}: BodySectionItemProps) => {
    return (
        <div className={cls(cl.body, className)}>
            <SortableContext items={body ? body : []}>
                {body?.map((it, index) => (
                    <ItemBodySectionItem ident={`${ETypeSection.ITEM}-${it.id}`} 
                                         sectionData={it} color={color} key={index} />
                ))}
            </SortableContext>
        </div>
    );
};

export default BodySectionItem;