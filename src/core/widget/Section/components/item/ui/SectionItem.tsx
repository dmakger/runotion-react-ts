import React from 'react';
import {ETypeSection, ISection, ISectionFunction} from "core/widget/Section/model/model";
import HeaderSectionItem from "core/widget/Section/components/item/components/header/HeaderSectionItem";
import BodySectionItem from "core/widget/Section/components/item/components/body/ui/BodySectionItem";
import cl from './_SectionItem.module.scss'
import {cls} from "core/service/cls";
import {useSortable} from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { IColor } from 'core/entity/core/model/model';
import { getValueColor } from 'core/entity/core/service/service';
import {UniqueIdentifier} from "@dnd-kit/core";
import BodySectionAddItem from '../components/addItem/ui/BodySectionAddItem';

interface SectionItemProps {
    ident: UniqueIdentifier
    section: ISection
    color?: IColor
    onAddItemClick?: ISectionFunction['onAddItemClick']
    isDragTarget?: boolean
    dropIndex?: number
    activeItemId?: number
    movedItemId?: number
    className?: string
}

const SectionItem = ({ident, section, color, onAddItemClick, isDragTarget, dropIndex, activeItemId, movedItemId, className}: SectionItemProps) => {
    // console.log('SectionItem');
    
    const colorValue = getValueColor(color)

    const {attributes, setNodeRef, transform, transition} = useSortable({
        id: ident,
        data: {
            type: ETypeSection.SECTION
        }
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    return (
        <div ref={setNodeRef}
             style={{
                 ...style,
                 '--section-color': colorValue,
             } as React.CSSProperties}
             {...attributes}
             className={cls(cl.block, isDragTarget ? cl.dragTarget : '', className)}>
            <HeaderSectionItem name={section.name} color={colorValue}/>
            <BodySectionAddItem ident={`${ETypeSection.ADD_ITEM}-${section.id}`} addItem={onAddItemClick} section={section} />
            <BodySectionItem body={section.body}
                             color={colorValue}
                             isDragTarget={isDragTarget}
                             dropIndex={dropIndex}
                             activeItemId={activeItemId}
                             movedItemId={movedItemId}/>
        </div>
    );
};

export default SectionItem;
