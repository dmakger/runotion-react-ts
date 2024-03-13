import React from 'react';
import {ETypeSection, ISection} from "core/widget/Section/model/model";
import SectionItem from "core/widget/Section/components/item/ui/SectionItem";
import cl from './_Section.module.scss'
import {EColors2} from "core/data/data";
import {cls} from "core/service/cls";
import {closestCenter, DndContext, DragEndEvent} from '@dnd-kit/core';
import {arrayMove, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {ITaskSection} from "core/sections/Task/model/model";
import { getElementFromSection, getTypeSection } from '../lib/section.lib';

interface SectionProps {
    sections: ISection[]
    setSections:  React.Dispatch<React.SetStateAction<ITaskSection[] | undefined>>
    className?: string
}

const Section = ({sections, setSections, className}: SectionProps) => {
    const colors = Object.values(EColors2)

    const onDragEnd = (e: DragEndEvent) => {
        const {active, over} = e
        console.log(active, over);
        if (over === null || active.id === over?.id)
            return

        const activeType = getTypeSection(active)
        const overType = getTypeSection(over)

        console.log(activeType, overType);
        
        
        if (activeType === ETypeSection.ITEM && overType === ETypeSection.SECTION) {
            const activeEl = getElementFromSection(sections, active.id, ETypeSection.ITEM)
            const sectionEl = getElementFromSection(sections, over.id, ETypeSection.SECTION)
            console.log(activeEl, sectionEl);
            
        }
        
        
        // const oldIndex = sections.findIndex(section => section.id === active.id)
        // const newIndex = sections.findIndex(section => section.id === over.id)
        
        // setSections(prevState => {
        //     const oldIndex = sections.findIndex(section => section.id === active.id)
        //     const newIndex = sections.findIndex(section => section.id === over.id)
        //     return arrayMove(prevState ? prevState : [], oldIndex, newIndex)
        // })
    }

    return (
        <div className={cls(cl.list, className)}>
            <DndContext collisionDetection={closestCenter} onDragEnd={onDragEnd}>
                {/* <SortableContext items={sections} strategy={verticalListSortingStrategy}> */}
                <SortableContext items={sections}>
                    {sections.map((it, index) => (
                        <SectionItem section={it} color={colors[index % colors.length]} key={it.id} />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
    // return (
    //     <div className={cls(cl.list, className)}>
    //         {sections.map((it, index) => (
    //             <SectionItem section={it} color={colors[index % colors.length]} key={it.id} />
    //         ))}
    //     </div>
    // );
};

export default Section;