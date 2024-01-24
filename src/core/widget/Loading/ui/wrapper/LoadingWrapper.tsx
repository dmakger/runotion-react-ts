import React, {ReactNode} from 'react';
import LoadingLoop from "core/widget/Loading/ui/loop/LoadingLoop";

interface LoadingWrapperProps {
    isLoading: boolean
    children?: ReactNode
    className?: string
    classNameLoop?: string
}

const LoadingWrapper = ({isLoading, children, className, classNameLoop}: LoadingWrapperProps) => {
    if (isLoading)
        return <LoadingLoop className={className} classNameLoop={classNameLoop}/>
    return <>{children}</>
};

export default LoadingWrapper;