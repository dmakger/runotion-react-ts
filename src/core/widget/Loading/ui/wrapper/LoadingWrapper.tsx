import React, {ReactNode} from 'react';
import LoadingLoop from "core/widget/Loading/ui/loop/LoadingLoop";

interface LoadingWrapperProps {
    isLoading: boolean
    children?: ReactNode
    className?: string
    classNameLoop?: string
}

const LoadingWrapper = ({isLoading, children, className, classNameLoop}: LoadingWrapperProps) => {
    return (
        <>
            {isLoading ? (
                <LoadingLoop className={className} classNameLoop={classNameLoop}/>
            ) : ( <> {children} </> )}
        </>
    );
};

export default LoadingWrapper;