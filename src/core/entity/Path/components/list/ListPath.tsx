import React from 'react';
import ItemListPath from '../item/ItemListPath';
import {TRoute} from "core/entity/Route/model/model";
import cl from './_ListPath.module.scss'
import {cls} from "core/service/cls";

interface ListPathProps {
    list: TRoute[]
    className?: string
}

const ListPath = ({list, className=''}: ListPathProps) => {
    return (
        <div className={cls(cl.block, className)}>
            {list.map((it, index) => (
                <React.Fragment key={index}>
                    <ItemListPath itemPath={it} />
                    {index < list.length - 1 && <span className={cl.sep}>/</span>}
                </React.Fragment>
                ))}
        </div>
    );
};

export default ListPath;