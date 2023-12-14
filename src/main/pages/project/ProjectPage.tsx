import React, {useEffect} from 'react';
import {ProjectItemLeftMenu} from "core/entity/LeftMenu/data/data";
import {useDispatch} from "react-redux";
import {LeftMenuSlice} from "core/entity/LeftMenu/slice/slice";
import {PathSlice} from "core/entity/Path/slice/slice";
import {PROJECT__ROOT} from "main/router/routes/projectRoot";

const ProjectPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(LeftMenuSlice.actions.setLeftMenu(ProjectItemLeftMenu));
        dispatch(PathSlice.actions.setPath([PROJECT__ROOT]));
    }, [dispatch]);

    return (
        <div>
            Project Page
        </div>
    );
};

export default ProjectPage;