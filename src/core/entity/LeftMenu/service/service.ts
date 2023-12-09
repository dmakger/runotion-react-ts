import {DATA_LEFT_MENU} from "core/entity/LeftMenu/data/data";
import {IItemLeftMenu} from "core/entity/LeftMenu/model/model";

export const getCurrentIndex = (state: IItemLeftMenu) => {
    return DATA_LEFT_MENU.findIndex((item) => item.to === state.to);
}