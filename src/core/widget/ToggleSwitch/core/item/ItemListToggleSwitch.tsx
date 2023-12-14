import React, {useEffect} from 'react';
import {cls} from "core/service/cls";
import cl from './_ItemListToggleSwitchProps.module.scss'
import {IToggleSwitch} from "core/widget/ToggleSwitch/model/model";
import {Link} from "react-router-dom";
import {isCurrentURL} from "core/entity/Path/service/service";
import {useDispatch} from "react-redux";
import {ToggleSwitchSlice} from "core/widget/ToggleSwitch/slice/slice";

interface ItemListToggleSwitchProps {
    item: IToggleSwitch
    className?: string
}

const ItemListToggleSwitch = ({item, className}: ItemListToggleSwitchProps) => {
    const dispatch = useDispatch()
    useEffect(() => {
        if (isCurrentURL(item.to)) {
            dispatch(ToggleSwitchSlice.actions.setActive(item.to))
        }
    }, [dispatch, item.to])
    const handleOnClick = () => {
        dispatch(ToggleSwitchSlice.actions.setActive(item.to))
    }
    return (
        <Link to={item.to} className={cls(cl.item, item.isActive ? cl.active : '', className)} onClick={handleOnClick}>
            {item.title}
        </Link>
    );
};

export default ItemListToggleSwitch;