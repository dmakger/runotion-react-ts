import React from 'react';
import {Link} from "react-router-dom";
import {cls} from "core/service/cls";
import cl from 'core/entity/LeftMenu/ui/item/_ItemListLeftBarMain.module.scss'
import { HandySvg } from 'handy-svg';
import {IItemLeftMenu} from "core/entity/LeftMenu/model/model";


interface ItemListLeftBarMainProps {
    item: IItemLeftMenu
    isActive?: boolean
    className?: string
}

const ItemListLeftBarMain = ({item, isActive=false, className=''}: ItemListLeftBarMainProps) => {
    return (
        <Link to={item.to} className={cls(cl.link, isActive ? cl.active : '', className)}>
            <div className={cl.line} />
            <HandySvg src={item.image}
                      className={cl.image}/>
            <span className={cl.text}>{item.title}</span>
        </Link>
    );
};

export default ItemListLeftBarMain;