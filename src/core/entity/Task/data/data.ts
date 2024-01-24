import {EVariantKeyParam, IParams} from "core/api/model/model";

export const LIMIT_START_PARAMS_TASK = "30"

// PARAMS
export const DATA_PARAMS_TASK: IParams = {
    [EVariantKeyParam.LIMIT]: LIMIT_START_PARAMS_TASK,
    [EVariantKeyParam.ORDERING]: "-id",
}

