export enum ECurrentStateEntity {
    Not,
    In, Out,
}

export enum ECurrentEntity {
    Not,
    Task, Project,
}

export type ICurrentEntity = {
    state: ECurrentStateEntity
    entity: ECurrentEntity
    data?: any
}

// export type ICurrentEntityRedux = ICurrentEntity