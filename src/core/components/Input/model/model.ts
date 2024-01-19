export enum ETypeInput {
    TEXT = "text",
    PASSWORD = "password",
}

export interface IInput {
    name?: string
    type?: ETypeInput
    placeholder?: string
    required?: boolean
    className?: string
}