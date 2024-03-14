import React from 'react';
import {ETypeSection, ISection} from "core/widget/Section/model/model";
import SectionItem from "core/widget/Section/components/item/ui/SectionItem";
import cl from './_Section.module.scss'
import {cls} from "core/service/cls";
import {closestCenter, DndContext, DragEndEvent} from '@dnd-kit/core';
import {ITaskSection} from "core/sections/Task/model/model";
import {getIdFromSection, getTypeSection} from '../lib/section.lib';
import {SortableContext} from "@dnd-kit/sortable";


interface SectionProps {
    sections: ISection[]
    setSections:  React.Dispatch<React.SetStateAction<ITaskSection[] | undefined>>
    itemToSection?: Function
    className?: string
}

const Section = ({sections, setSections, itemToSection, className}: SectionProps) => {

    console.log(sections)
    // DND DRAG END
    const onDragEnd = (e: DragEndEvent) => {
        const {active, over} = e
        if (over === null || active.id === over?.id)
            return
        console.log(active, over)

        const activeType = getTypeSection(active)
        const overType = getTypeSection(over)

        if (activeType === ETypeSection.ITEM && overType === ETypeSection.SECTION) {
            console.log('YES')
            const overId = Number(getIdFromSection(over))
            const activeId = Number(getIdFromSection(active))
            if (itemToSection) itemToSection(overId, activeId)
        }
    }

    return (
        <div className={cls(cl.list, className)}>
            <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                <SortableContext items={sections}>
                    {sections.map(it => (
                        <SectionItem ident={`${ETypeSection.SECTION}-${it.id}`} section={it} color={it.color} key={it.id} />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
};

export default Section;