import React, {useEffect, useState} from 'react';
import {ETypeSection, ISection, ISectionFunction} from "core/widget/Section/model/model";
import SectionItem from "core/widget/Section/components/item/ui/SectionItem";
import cl from './_Section.module.scss'
import {cls} from "core/service/cls";
import {closestCenter, DndContext, DragEndEvent, DragOverEvent, DragStartEvent} from '@dnd-kit/core';
import {getIdFromSection, getTypeSection} from '../lib/section.lib';
import {SortableContext} from "@dnd-kit/sortable";
import AddSectionCard from "core/widget/Section/components/addSection/AddSectionCard";


interface SectionProps {
    sections: ISection[]
    itemToSection?: Function
    onItemClick?: ISectionFunction['onItemClick']
    onAddItemClick?: ISectionFunction['onAddItemClick']
    onAddSection?: (name: string, color: string) => void
    className?: string
}

const getSectionIdByItemId = (sections: ISection[], itemId: number) => {
    return sections.find(section => section.body?.some(item => item.id === itemId))?.id
}

const getItemIndex = (sections: ISection[], sectionId?: number, itemId?: number) => {
    if (sectionId === undefined || itemId === undefined) return -1
    const section = sections.find(section => section.id === sectionId)
    return section?.body?.findIndex(item => item.id === itemId) ?? -1
}

interface DropPreview {
    sectionId: number
    index: number
}

const Section = ({sections, itemToSection, onItemClick, onAddItemClick, onAddSection, className}: SectionProps) => {
    const [activeItemId, setActiveItemId] = useState<number>()
    const [dropPreview, setDropPreview] = useState<DropPreview>()
    const [movedItemId, setMovedItemId] = useState<number>()

    useEffect(() => {
        if (movedItemId === undefined) return
        const timeoutId = window.setTimeout(() => setMovedItemId(undefined), 700)
        return () => window.clearTimeout(timeoutId)
    }, [movedItemId])

    const getDropPreview = (event: DragOverEvent | DragEndEvent) => {
        const {over} = event
        if (over === null) return undefined

        const overId = Number(getIdFromSection(over))
        const overType = getTypeSection(over)

        if (overType === ETypeSection.ITEM) {
            const sectionId = getSectionIdByItemId(sections, overId)
            if (sectionId === undefined) return undefined

            const overIndex = getItemIndex(sections, sectionId, overId)
            if (overIndex < 0) return undefined

            return {sectionId, index: overIndex}
        }

        if (overType === ETypeSection.SECTION || overType === ETypeSection.ADD_ITEM) {
            const section = sections.find(section => section.id === overId)
            return {sectionId: overId, index: section?.body?.length || 0}
        }
    }

    const onDragStart = (event: DragStartEvent) => {
        if (getTypeSection(event.active) !== ETypeSection.ITEM) return
        setActiveItemId(Number(getIdFromSection(event.active)))
    }

    const onDragOver = (event: DragOverEvent) => {
        if (getTypeSection(event.active) !== ETypeSection.ITEM) return
        setDropPreview(getDropPreview(event))
    }

    // ======{ DND }======
    const onDragEnd = (e: DragEndEvent) => {
        const {active, over} = e
        setActiveItemId(undefined)
        setDropPreview(undefined)
        
        if (over === null)
            return

        const activeId = Number(getIdFromSection(active))
                
        // CLICK ON ITEM ?
        if (active.id === over.id){
            if (onItemClick) 
                onItemClick(activeId)
            return
        }

        const activeType = getTypeSection(active)

        if (activeType === ETypeSection.ITEM) {
            const preview = getDropPreview(e)
            const newSectionId = preview?.sectionId
            const oldSectionId = getSectionIdByItemId(sections, activeId)
            const oldIndex = getItemIndex(sections, oldSectionId, activeId)
            const isSamePosition = oldSectionId === newSectionId &&
                (preview?.index === oldIndex || preview?.index === oldIndex + 1)

            if (newSectionId !== undefined && preview !== undefined && !isSamePosition) {
                setMovedItemId(activeId)
                if (itemToSection) itemToSection(newSectionId, activeId, preview.index)
            }
        }
    }

    return (
        <div className={cls(cl.list, className)}>
            <DndContext collisionDetection={closestCenter}
                        onDragStart={onDragStart}
                        onDragOver={onDragOver}
                        onDragCancel={() => {
                            setActiveItemId(undefined)
                            setDropPreview(undefined)
                        }}
                        onDragEnd={onDragEnd}>
                <SortableContext items={sections}>
                    {sections.map(it => (
                        <SectionItem ident={`${ETypeSection.SECTION}-${it.id}`} section={it} color={it.color}  
                                     onAddItemClick={onAddItemClick}
                                     isDragTarget={activeItemId !== undefined && dropPreview?.sectionId === it.id}
                                     dropIndex={dropPreview?.sectionId === it.id ? dropPreview.index : undefined}
                                     activeItemId={activeItemId}
                                     movedItemId={movedItemId}
                                     key={it.id} />
                    ))}
                </SortableContext>
            </DndContext>
            {onAddSection && <AddSectionCard onAddSection={onAddSection}/>}
        </div>
    );
};

export default Section;
