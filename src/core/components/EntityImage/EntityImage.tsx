import React, {useEffect, useMemo, useState} from 'react';
import {cls} from 'core/service/cls';
import {getImageSources} from 'core/service/image';
import cl from './_EntityImage.module.scss';

export enum EEntityImageVariant {
    USER = 'user',
    PROJECT = 'project',
}

interface EntityImageProps {
    src?: string | null
    title?: string
    variant?: EEntityImageVariant
    className?: string
}

const EntityImage = ({src, title = '', variant = EEntityImageVariant.USER, className}: EntityImageProps) => {
    const sources = useMemo(() => getImageSources(src), [src])
    const [sourceIndex, setSourceIndex] = useState(0)
    const fallbackVariant = Math.abs(title.split('').reduce((sum, it) => sum + it.charCodeAt(0), 0)) % 5
    const initials = title.trim().slice(0, 2).toUpperCase() || (variant === EEntityImageVariant.USER ? 'U' : 'P')
    const source = sources[sourceIndex]

    useEffect(() => {
        setSourceIndex(0)
    }, [src])

    if (source && sourceIndex < sources.length) {
        return (
            <img src={source}
                 alt={title}
                 onError={() => setSourceIndex(prev => prev + 1)}
                 className={cls(cl.image, cl[variant], className)}/>
        )
    }

    return (
        <div className={cls(cl.image, cl[variant], cl.fallback, cl[`fallback${fallbackVariant}`], className)}>
            {initials}
        </div>
    )
}

export default EntityImage;
