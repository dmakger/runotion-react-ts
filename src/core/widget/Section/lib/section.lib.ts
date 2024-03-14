import {Active, Over, UniqueIdentifier} from "@dnd-kit/core"
import {ETypeSection, ISection} from "../model/model"
import React from "react";
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
export const swapItemIntoSection = (itemId: number, newSectionId: number, sections?: ISection[]) => {
    let _oldSectionId = sections?.find(_section => _section.body?.find(it => it.id === itemId))?.id

    if (_oldSectionId === undefined) return
    let _prevSections: ITaskSection[] = []
    if (sections !== undefined)
        _prevSections = [...sections]

    const newIndex = _prevSections.findIndex(it => it.id === newSectionId)
    const oldIndex = _prevSections.findIndex(it => it.id === _oldSectionId)

    let newBody = _prevSections[newIndex].body
    if (newBody === undefined)
        newBody = []
    let oldBody = _prevSections[oldIndex].body
    if (oldBody === undefined)
        oldBody = []

    const item = oldBody.find(it => it.id === itemId)
    if (item === undefined) return sections

    _prevSections[newIndex].body = [item, ...newBody]
    _prevSections[oldIndex].body = oldBody.filter(it => it.id !== itemId)
    return _prevSections
}

