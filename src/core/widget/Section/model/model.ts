import Section from "../ui/Section"

export interface ISection {
    id: number
    name: string
    position: number
    body?: any[]
}

export enum ETypeSection {
    SECTION = 'section',
    ITEM = 'item',
}