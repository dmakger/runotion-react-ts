import React from 'react';
import cl from './_ItemListPath.module.scss'
import { Path } from '../../model/model';
import { cls } from 'core/service/cls';
import { Link } from 'react-router-dom';

interface ItemListPathProps {
    itemPath: Path
    className?: string
}

const ItemListPath = ({itemPath, className=''}: ItemListPathProps) => {
    return (
        <Link to={itemPath.to} className={cls(cl.path, className)}>
            {itemPath.title}
        </Link>
    );
};

export default ItemListPath;