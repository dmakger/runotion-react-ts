import { ProjectItemLeftMenu } from 'core/entity/LeftMenu/data/data';
import { LeftMenuSlice } from 'core/entity/LeftMenu/slice/slice';
import { PathSlice } from 'core/entity/Path/slice/slice';
import { useActionCreators } from 'core/storage/hooks';
import { DATA_PROJECT__FUNCTION_TOP_LINE } from 'core/widget/FunctionTopLine/data/data';
import { FunctionTopLineSlice } from 'core/widget/FunctionTopLine/slice/slice';
import { PROJECT__ROOT } from 'main/router/routes/projectRoot';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';

interface ProjectLayoutProps {
    children?: ReactNode
}

const ProjectLayout = ({children}: ProjectLayoutProps) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(LeftMenuSlice.actions.setLeftMenu(ProjectItemLeftMenu), {refetchOnMountOrArgChange: true});
        dispatch(PathSlice.actions.setPath([PROJECT__ROOT]), {refetchOnMountOrArgChange: true});

        dispatch(FunctionTopLineSlice.actions.setFunctionTopLine(DATA_PROJECT__FUNCTION_TOP_LINE), {refetchOnMountOrArgChange: true});
        // dispatch(FunctionTopLineSlice.actions.swapVisibleByKey(DATA_PROJECT), {refetchOnMountOrArgChange: true});

    }, [dispatch]);

    useActionCreators().setToggleList([])

    return (
        <div>
            {children}
        </div>
    );
};

export default ProjectLayout;