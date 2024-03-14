import { IColor } from "../model/model";

export const getValueColor = (color?: IColor) => {
    if (!color) return '#27272A'
    return color.value
}