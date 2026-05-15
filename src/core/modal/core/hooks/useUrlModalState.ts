import React, {useCallback, useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';

const MODAL_PARAM = 'modal'

export const useUrlModalState = (modalKey: string) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [isVisible, setIsVisible] = useState(searchParams.get(MODAL_PARAM) === modalKey)

    useEffect(() => {
        setIsVisible(searchParams.get(MODAL_PARAM) === modalKey)
    }, [modalKey, searchParams])

    const setUrlModalVisible = useCallback((nextVisible: React.SetStateAction<boolean>) => {
        setIsVisible(prev => {
            const resolvedVisible = typeof nextVisible === 'function' ? nextVisible(prev) : nextVisible
            const nextParams = new URLSearchParams(searchParams)

            if (resolvedVisible) {
                nextParams.set(MODAL_PARAM, modalKey)
            } else if (nextParams.get(MODAL_PARAM) === modalKey) {
                nextParams.delete(MODAL_PARAM)
            }

            setSearchParams(nextParams)
            return resolvedVisible
        })
    }, [modalKey, searchParams, setSearchParams])

    return [isVisible, setUrlModalVisible] as const
}

export const useSetUrlModal = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    return useCallback((modalKey?: string) => {
        const nextParams = new URLSearchParams(searchParams)
        if (modalKey) nextParams.set(MODAL_PARAM, modalKey)
        else nextParams.delete(MODAL_PARAM)
        setSearchParams(nextParams)
    }, [searchParams, setSearchParams])
}
