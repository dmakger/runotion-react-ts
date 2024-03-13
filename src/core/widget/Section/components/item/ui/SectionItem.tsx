import React from 'react';
import {ISection} from "core/widget/Section/model/model";
import HeaderSectionItem from "core/widget/Section/components/item/components/header/HeaderSectionItem";
import BodySectionItem from "core/widget/Section/components/item/components/body/ui/BodySectionItem";
import cl from './_SectionItem.module.scss'
import {cls} from "core/service/cls";
import {useSortable} from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';

interface SectionItemProps {
    section: ISection
    color?: string
    className?: string
}

const SectionItem = ({section, color, className}: SectionItemProps) => {
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
        id: section.id
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={cls(cl.block, className)}>
            <HeaderSectionItem name={section.name} color={color}/>
            <BodySectionItem body={section.body} color={color}/>
        </div>
    );
};

export default SectionItem;