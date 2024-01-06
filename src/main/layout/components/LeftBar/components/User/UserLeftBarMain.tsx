import React from 'react';
import cl from './_UserLeftBarMain.module.scss'
import {useAppSelector} from "core/storage/hooks";
import {getImage} from "core/service/image";
import {cls} from "core/service/cls";
import LoadingWrapper from "core/widget/Loading/ui/wrapper/LoadingWrapper";

interface UserLeftBarMainProps {
    className?: string
}

const UserLeftBarMain = ({className}: UserLeftBarMainProps) => {
    const user = useAppSelector(state => state.user)
    return (
        <div className={cls(cl.block, className)}>
            <LoadingWrapper isLoading={user.id === -1}>
                <img className={cl.image}
                     src={getImage(user.image)}
                     alt={'Avatar'}/>
                <div className={cl.text}>
                    <span className={cl.name}>{user.name}</span>
                    {user.department &&
                        <span className={cl.department}>{user.department?.name}</span>
                    }
                </div>
            </LoadingWrapper>
        </div>
    );
};

export default UserLeftBarMain;