import {Active, Over, UniqueIdentifier} from "@dnd-kit/core"
import {ETypeSection, ISection} from "../model/model"
import {ITaskSection} from "core/sections/Task/model/model";

// ======{ ELEMENTS }======
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



// ======{ TYPES }======
export const getTypeSection = (element: Active | Over) => {
    if ('data' in element && element.data.current && "type" in element.data.current) {
        const type = element.data.current.type
        return Object.values(ETypeSection).find(it => it === type)
    }
}

// ======{ IDs }======
export const getIdFromSection = (element: Active | Over) => {
    const textId = element.id.toString()
    // const woSection = textId.split(`${ETypeSection.SECTION}-`).join("");
    // return woSection.split(`${ETypeSection.ITEM}-`).join("")
    const parts = textId.split('-');
    return parts[parts.length - 1];
}

// ======{ ELEMENTS }======
export const swapItemIntoSection = (itemId: number, newSectionId: number, sections?: ISection[], insertIndex = 0) => {
    const oldSectionId = sections?.find(section => section.body?.find(item => item.id === itemId))?.id
    if (oldSectionId === undefined || sections === undefined) return sections

    const nextSections: ITaskSection[] = sections.map(section => ({
        ...section,
        body: section.body ? [...section.body] : [],
    }))
    const newIndex = nextSections.findIndex(section => section.id === newSectionId)
    const oldIndex = nextSections.findIndex(section => section.id === oldSectionId)

    if (newIndex < 0 || oldIndex < 0) return sections

    const oldBody = nextSections[oldIndex].body || []
    const oldItemIndex = oldBody.findIndex(item => item.id === itemId)
    if (oldItemIndex < 0) return sections

    const [item] = oldBody.splice(oldItemIndex, 1)
    let nextInsertIndex = Math.max(0, insertIndex)

    if (oldSectionId === newSectionId && oldItemIndex < nextInsertIndex) {
        nextInsertIndex -= 1
    }

    const newBody = nextSections[newIndex].body || []
    nextInsertIndex = Math.min(nextInsertIndex, newBody.length)
    newBody.splice(nextInsertIndex, 0, item)

    nextSections[oldIndex].body = oldBody
    nextSections[newIndex].body = newBody
    return nextSections
}

