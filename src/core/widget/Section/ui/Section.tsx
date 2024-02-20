import React from 'react';
import {ISection} from "core/widget/Section/model/model";
import SectionItem from "core/widget/Section/components/item/ui/SectionItem";
import cl from './_Section.module.scss'
import {EColors2} from "core/data/data";
import {cls} from "core/service/cls";

interface SectionProps {
    sections: ISection[]
    className?: string
}

const Section = ({sections, className}: SectionProps) => {
    const colors = Object.values(EColors2)
    return (
        <div className={cls(cl.list, className)}>
            {sections.map((it, index) => (
                <SectionItem section={it} color={colors[index % colors.length]} key={it.id} />
            ))}
        </div>
    );
};

export default Section;