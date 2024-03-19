import React from 'react';
import {cls} from "core/service/cls";
import cl from './_ItemBodySectionItem.module.scss'
import TaskCode from "core/entity/Task/ui/code/TaskCode";
import {useSortable} from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
import { ETypeSection, ISectionFunction } from 'core/widget/Section/model/model';
import {UniqueIdentifier} from "@dnd-kit/core";

interface ItemBodySectionItemProps {
    ident: UniqueIdentifier
    sectionData: any
    color?: string
    className?: string
}

const ItemBodySectionItem = ({ident, sectionData, color, className}: ItemBodySectionItemProps) => {    
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
        id: ident,
        data: {
            type: ETypeSection.ITEM
        }
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
        borderLeft: `3px solid ${color}`,
    }


    return (
        <button ref={setNodeRef} style={style} {...attributes} {...listeners} className={cls(cl.block, className)}>
            <span className={cl.name}>{sectionData.name}</span>
            <TaskCode code={sectionData.code} className={cl.code} classNameImage={cl.codeImage} classNameCode={cl.codeText}/>
        </button>
    );
};

export default ItemBodySectionItem;