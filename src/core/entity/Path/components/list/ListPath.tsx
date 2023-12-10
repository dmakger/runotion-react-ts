import React from 'react';
import { Path } from '../../model/model';
import ItemListPath from '../item/ItemListPath';

interface ListPathProps {
    list: Path[]
    className?: string
}

const ListPath = ({list, className=''}: ListPathProps) => {
    return (
        <div className={className}>
            {list.map(it => (
                <ItemListPath itemPath={it} />
            ))}
        </div>
    );
};

export default ListPath;