import React from 'react';
import cl from 'core/entity/LeftMenu/ui/list/_ListLeftBarMain.module.scss'
import ItemListLeftBarMain from "core/entity/LeftMenu/ui/item/ItemListLeftBarMain";
import {cls} from "core/service/cls";
import {DATA_LEFT_MENU} from "core/entity/LeftMenu/data/data";
import {getCurrentIndex} from "core/entity/LeftMenu/service/service";
import {useAppSelector} from "core/storage/hooks";

interface ListLeftBarMainProps {
    className?: string
}

const ListLeftBarMain = ({className}: ListLeftBarMainProps) => {
    const currentItemLeftMenu = useAppSelector(state => state.leftMenu)
    const activeIndex = getCurrentIndex(currentItemLeftMenu)

    return (
        <div className={cls(className, cl.list)}>
            {DATA_LEFT_MENU.map((it, index) => (
                <ItemListLeftBarMain item={it}
                                     isActive={index === activeIndex}/>
            ))}
        </div>
    );
};

export default ListLeftBarMain;