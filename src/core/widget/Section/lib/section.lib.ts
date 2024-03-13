import { Active, Over, UniqueIdentifier } from "@dnd-kit/core"
import { ETypeSection, ISection } from "../model/model"

export const getElementFromSection = (sections: ISection[], id: UniqueIdentifier, type: ETypeSection) => {
    if (type === ETypeSection.SECTION)
        return getSectionFromSection(sections, Number(id))
    return getItemFromSection(sections, Number(id))
}


export const getSectionFromSection = (sections: ISection[], id: number) => {
    return sections.find(section => section.id === id)
}


export const getItemFromSection = (sections: ISection[], id: number) => {
    let item: any
    sections.forEach((section) => {
        const _item = section.body?.find((item) => item.id === id)
        if (_item) item = _item
    });
    return item
}




export const getTypeSection = (element: Active | Over) => {
    if ('data' in element && element.data.current && "type" in element.data.current) {
        const type = element.data.current.type
        return Object.values(ETypeSection).find(it => it === type)
    }
}


