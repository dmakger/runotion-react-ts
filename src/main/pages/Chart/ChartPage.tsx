import React, {useEffect} from 'react';
import {ChartItemLeftMenu} from "core/entity/LeftMenu/data/data";
import {useDispatch} from "react-redux";
import {LeftMenuSlice} from "core/entity/LeftMenu/slice/slice";
import {PathSlice} from "core/entity/Path/slice/slice";
import {CHART__ROOT} from "main/router/routes/chartRoot";

const ChartPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(LeftMenuSlice.actions.setLeftMenu(ChartItemLeftMenu));
        dispatch(PathSlice.actions.setPath([CHART__ROOT]));
    }, [dispatch]);


    return (
        <div>
            Chart Page
        </div>
    );
};

export default ChartPage;