import React from 'react';
import ItemListToggleSwitch from "core/widget/ToggleSwitch/core/item/ItemListToggleSwitch";
import cl from './_ListToggleSwitch.module.scss'
import {cls} from "core/service/cls";
import {IToggleSwitch} from "core/widget/ToggleSwitch/model/model";

interface ListToggleSwitchProps {
    list: IToggleSwitch[]
    className?: string
}

const ListToggleSwitch = ({list, className=''}: ListToggleSwitchProps) => {

    return (
        <div className={cls(cl.list, className)}>
            {list.map((it, index) => (
                <ItemListToggleSwitch key={index} item={it} />
            ))}
        </div>
    );
};

export default ListToggleSwitch;