import {ECurrentEntity, ECurrentStateEntity, ICurrentEntity} from "core/entity/CurrentEntity/model/model";

// NOT
export const DATA_EMPTY__CURRENT_ENTITY: ICurrentEntity = {state: ECurrentStateEntity.Not, entity: ECurrentEntity.Not}

// PROJECT
export const DATA_IN_PROJECT__CURRENT_ENTITY: ICurrentEntity = {state: ECurrentStateEntity.In, entity: ECurrentEntity.Project}