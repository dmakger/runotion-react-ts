import React from 'react';
import cl from './_UserLeftBarMain.module.scss'
import {useAppSelector} from "core/storage/hooks";
import {cls} from "core/service/cls";
import LoadingWrapper from "core/widget/Loading/ui/wrapper/LoadingWrapper";
import User from "core/entity/User/ui/user/User";
import {getUserDepartmentName} from "core/entity/User/service/service";
import {Link} from "react-router-dom";

interface UserLeftBarMainProps {
    className?: string
}

const UserLeftBarMain = ({className}: UserLeftBarMainProps) => {
    const user = useAppSelector(state => state.user)
    return (
        <Link to={user.id > 0 ? `/user/${user.id}` : '#'} className={cls(cl.block, className)}>
            <LoadingWrapper isLoading={user.id === -1}>
                <User user={user}
                      subtitle={getUserDepartmentName(user)}
                      size={'lg'}
                      variant={'compact'}/>
            </LoadingWrapper>
        </Link>
    );
};

export default UserLeftBarMain;
