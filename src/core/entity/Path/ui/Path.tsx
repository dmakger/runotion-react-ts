import { useAppSelector } from 'core/storage/hooks';
import React from 'react';
import ListPath from '../components/list/ListPath';


interface PathProps {
    className?: string
}

const Path = ({className=''}: PathProps) => {
    const path = useAppSelector(state => state.path)
    
    return (
        <ListPath list={path}  className={className}/>
    );
};

export default Path;