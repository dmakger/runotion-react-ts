import React, {useState} from 'react';
import {cls} from "core/service/cls";
import cl from './_ItemBodySectionItem.module.scss'
import TaskCode from "core/entity/Task/ui/code/TaskCode";

interface ItemBodySectionItemProps {
    sectionData: any
    color?: string
    className?: string
}

const ItemBodySectionItem = ({sectionData, color, className}: ItemBodySectionItemProps) => {
    console.log(sectionData)
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - offset.x,
                y: e.clientY - offset.y
            });
        }
    };

    const style = {
        borderLeft: `3px solid ${color}`,
        // position: 'absolute',
        // top: position.y,
        // left: position.x,
        // width: '200px',
        // height: '200px',
        // backgroundColor: '#f0f0f0',
        // borderRadius: '10px',
        // padding: '20px',
        // cursor: isDragging ? 'grabbing' : 'grab'
    }


    return (
        <div className={cls(cl.block, className)} style={style} onMouseDown={handleMouseDown}
             onMouseUp={handleMouseUp}
             onMouseMove={handleMouseMove}>
            <span className={cl.name}>{sectionData.name}</span>
            <TaskCode code={sectionData.code} className={cl.code} classNameImage={cl.codeImage} classNameCode={cl.codeText}/>
        </div>
    );
};

export default ItemBodySectionItem;