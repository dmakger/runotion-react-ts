import React from 'react';
import cl from './_ItemListPath.module.scss'
import { cls } from 'core/service/cls';
import { Link } from 'react-router-dom';
import {TRoute} from "core/entity/Route/model/model";
import {getLinkPath} from "core/entity/Path/service/service";

interface ItemListPathProps {
    itemPath: TRoute
    className?: string
}

const ItemListPath = ({itemPath, className=''}: ItemListPathProps) => {
    return (
        <Link to={getLinkPath(itemPath)} className={cls(cl.path, className)}>
            {itemPath.title}
        </Link>
    );
};

export default ItemListPath;