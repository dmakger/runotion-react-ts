import {useSortable} from "@dnd-kit/sortable";

import { cls } from "core/service/cls";
import cl from './_BodySectionAddItem.module.scss'
import { ETypeSection, ISection, ISectionFunction } from "core/widget/Section/model/model";
import { UniqueIdentifier } from "@dnd-kit/core";


interface BodySectionAddItemProps {
    ident: UniqueIdentifier
    addItem?: ISectionFunction['onAddItemClick']
    section?: ISection
    className?: string
}

const BodySectionAddItem = ({ident, addItem, section, className}: BodySectionAddItemProps) => {
    const {attributes, setNodeRef} = useSortable({
        id: ident,
        data: {
            type: ETypeSection.ADD_ITEM
        }
    })
    
    const handleOnClick = () => {
        if (addItem && section)
            addItem(section)
    }

    return (
        <button ref={setNodeRef}{...attributes} onClick={handleOnClick} className={cls(cl.button, className)}>
            +
        </button>
    )
};

export default BodySectionAddItem;
