import {IFunctionTopLine} from "core/widget/FunctionTopLine/model/model";
import ToggleSwitch from "core/widget/ToggleSwitch/ui/ToggleSwitch";

export const TOGGLE_SWITCH__FUNCTION_TOP_LINE: IFunctionTopLine = {
    key: 'toggleSwitch',
    element: <ToggleSwitch />,
    isVisible: false
}

export const DATA_TOGGLE_SWITCH__FUNCTION_TOP_LINE: IFunctionTopLine[] = [
    TOGGLE_SWITCH__FUNCTION_TOP_LINE,
]