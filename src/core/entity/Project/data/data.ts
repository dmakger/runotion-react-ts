import {EVariantKeyParam, IParams} from "core/api/model/model";

export const LIMIT_START_PARAMS_PROJECT = "20"

// PARAMS
export const DATA_PARAMS_PROJECT: IParams = {
    [EVariantKeyParam.LIMIT]: LIMIT_START_PARAMS_PROJECT,
    [EVariantKeyParam.ORDERING]: "-created_at",
}