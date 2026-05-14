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
    isDragTarget?: boolean
    dropIndex?: number
    activeItemId?: number
    movedItemId?: number
    className?: string
}

const DropIndicator = () => <div className={cl.dropIndicator}/>

const BodySectionItem = ({body, color, isDragTarget, dropIndex, activeItemId, movedItemId, className}: BodySectionItemProps) => {
    const items = body || []

    return (
        <div className={cls(cl.body, isDragTarget ? cl.dragTarget : '', className)}
             style={{'--section-color': color} as React.CSSProperties}>
            <SortableContext items={items.map(it => `${ETypeSection.ITEM}-${it.id}`)}>
                {items.map((it, index) => (
                    <React.Fragment key={it.id}>
                        {dropIndex === index && activeItemId !== it.id && <DropIndicator/>}
                        <ItemBodySectionItem ident={`${ETypeSection.ITEM}-${it.id}`}
                                             sectionData={it}
                                             color={color}
                                             isRecentlyMoved={movedItemId === it.id}/>
                    </React.Fragment>
                ))}
                {dropIndex === items.length && <DropIndicator/>}
            </SortableContext>
        </div>
    );
};

export default BodySectionItem;
