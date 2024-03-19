import React from 'react';
import {ETypeSection, ISection, ISectionFunction} from "core/widget/Section/model/model";
import SectionItem from "core/widget/Section/components/item/ui/SectionItem";
import cl from './_Section.module.scss'
import {cls} from "core/service/cls";
import {closestCenter, DndContext, DragEndEvent, DragStartEvent} from '@dnd-kit/core';
import {getIdFromSection, getTypeSection} from '../lib/section.lib';
import {SortableContext} from "@dnd-kit/sortable";


interface SectionProps {
    sections: ISection[]
    itemToSection?: Function
    onItemClick?: ISectionFunction['onItemClick']
    onAddItemClick?: ISectionFunction['onAddItemClick']
    className?: string
}

const Section = ({sections, itemToSection, onItemClick, onAddItemClick, className}: SectionProps) => {    
    // ======{ DND }======
    const onDragEnd = (e: DragEndEvent) => {
        const {active, over} = e
        console.log('onDragEnd', active, over);
        
        if (over === null)
            return

        const overId = Number(getIdFromSection(over))
        const activeId = Number(getIdFromSection(active))
                
        // CLICK ON ITEM ?
        if (active.id === over.id){
            if (onItemClick) 
                onItemClick(activeId)
            return
        }

        const activeType = getTypeSection(active)
        const overType = getTypeSection(over)

        if (activeType === ETypeSection.ITEM && overType === ETypeSection.SECTION) {
            if (itemToSection) itemToSection(overId, activeId)
        }
    }

    return (
        <div className={cls(cl.list, className)}>
            <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                <SortableContext items={sections}>
                    {sections.map(it => (
                        <SectionItem ident={`${ETypeSection.SECTION}-${it.id}`} section={it} color={it.color}  
                                     onAddItemClick={onAddItemClick} key={it.id} />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default Section;