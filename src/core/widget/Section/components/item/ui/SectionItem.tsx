import React from 'react';
import {ISection} from "core/widget/Section/model/model";
import HeaderSectionItem from "core/widget/Section/components/item/components/header/HeaderSectionItem";
import BodySectionItem from "core/widget/Section/components/item/components/body/ui/BodySectionItem";
import cl from './_SectionItem.module.scss'
import {cls} from "core/service/cls";

interface SectionItemProps {
    section: ISection
    color?: string
    className?: string
}

const SectionItem = ({section, color, className}: SectionItemProps) => {
    return (
        <div className={cls(cl.block, className)}>
            <HeaderSectionItem name={section.name} color={color}/>
            <BodySectionItem body={section.body} color={color} />
        </div>
    );
};

export default SectionItem;