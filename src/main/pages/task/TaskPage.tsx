import React from 'react';
import {useActionCreators} from "core/storage/hooks";
import {TaskItemLeftMenu} from "core/entity/LeftMenu/data/data";

const TaskPage = () => {
    useActionCreators().setLeftMenu(TaskItemLeftMenu)

    return (
        <div>
            <p>TaskPage</p>
        </div>
    );
};

export default TaskPage;