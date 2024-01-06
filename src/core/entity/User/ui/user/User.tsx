import React from 'react';
import {IUser} from "core/entity/User/model/model";
import cl from 'core/entity/User/ui/user/_User.module.scss'
import {cls} from "core/service/cls";
import {getUserImage} from "core/entity/User/service/service";

interface UserProps {
    user: IUser
    className?: string
}

const User = ({ user, className }: UserProps) => {
    return (
        <div className={cls(cl.user, className)}>
            <img src={getUserImage(user?.image)} alt="Аватар" className={cl.image} />
            <span className={cl.name}>{user.name}</span>
        </div>
    );
};

export default User;