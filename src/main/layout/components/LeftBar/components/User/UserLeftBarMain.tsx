import React from 'react';
import cl from './_UserLeftBarMain.module.scss'
import {useAppSelector} from "core/storage/hooks";
import {cls} from "core/service/cls";
import LoadingWrapper from "core/widget/Loading/ui/wrapper/LoadingWrapper";
import User from "core/entity/User/ui/user/User";

interface UserLeftBarMainProps {
    className?: string
}

const UserLeftBarMain = ({className}: UserLeftBarMainProps) => {
    const user = useAppSelector(state => state.user)
    return (
        <div className={cls(cl.block, className)}>
            <LoadingWrapper isLoading={user.id === -1}>
                <User user={user}
                      subtitle={user.department?.name}
                      size={'lg'}
                      variant={'compact'}/>
            </LoadingWrapper>
        </div>
    );
};

export default UserLeftBarMain;
