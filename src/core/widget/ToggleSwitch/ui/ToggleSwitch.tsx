import React from 'react';
import ListToggleSwitch from "core/widget/ToggleSwitch/core/list/ListToggleSwitch";
import cl from './_ToggleSwitch.module.scss'
import {cls} from "core/service/cls";
import {useAppSelector} from "core/storage/hooks";

const ToggleSwitch = () => {
    const toggleSwitch = useAppSelector(state => state.toggleSwitch);

    if (toggleSwitch.length === 0)
        return null

    return (
        <div className={cls(cl.block)}>
            <ListToggleSwitch list={toggleSwitch}/>
        </div>
    );
};

export default ToggleSwitch;