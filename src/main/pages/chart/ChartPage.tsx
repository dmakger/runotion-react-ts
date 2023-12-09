import React from 'react';
import {useActionCreators} from "core/storage/hooks";
import {ChartItemLeftMenu} from "core/entity/LeftMenu/data/data";

const ChartPage = () => {
    useActionCreators().setLeftMenu(ChartItemLeftMenu)

    return (
        <div>
            Chart Page
        </div>
    );
};

export default ChartPage;