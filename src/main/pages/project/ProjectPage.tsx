import React from 'react';
import {useActionCreators} from "core/storage/hooks";
import {ProjectItemLeftMenu} from "core/entity/LeftMenu/data/data";

const ProjectPage = () => {
    useActionCreators().setLeftMenu(ProjectItemLeftMenu)

    return (
        <div>
            Project Page
        </div>
    );
};

export default ProjectPage;