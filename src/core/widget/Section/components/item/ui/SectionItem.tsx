import React from 'react';
import {ETypeSection, ISection} from "core/widget/Section/model/model";
import HeaderSectionItem from "core/widget/Section/components/item/components/header/HeaderSectionItem";
import BodySectionItem from "core/widget/Section/components/item/components/body/ui/BodySectionItem";
import cl from './_SectionItem.module.scss'
import {cls} from "core/service/cls";
import {SortableContext, useSortable} from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { IColor } from 'core/entity/core/model/model';
import { getValueColor } from 'core/entity/core/service/service';
import {UniqueIdentifier} from "@dnd-kit/core";

interface SectionItemProps {
    ident: UniqueIdentifier
    section: ISection
    color?: IColor
    className?: string
}

const SectionItem = ({ident, section, color, className}: SectionItemProps) => {
    const colorValue = getValueColor(color)

    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
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
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={cls(cl.block, className)}>
            <HeaderSectionItem name={section.name} color={colorValue}/>
            <BodySectionItem body={section.body} color={colorValue}/>
        </div>
    );
};

export default SectionItem;