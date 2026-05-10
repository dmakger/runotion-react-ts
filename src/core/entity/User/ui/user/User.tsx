import React from 'react';
import {IUser} from "core/entity/User/model/model";
import cl from 'core/entity/User/ui/user/_User.module.scss'
import {cls} from "core/service/cls";
import EntityImage from "core/components/EntityImage/EntityImage";

interface UserProps {
    user: IUser
    subtitle?: string
    size?: 'sm' | 'md' | 'lg'
    variant?: 'inline' | 'compact'
    className?: string
}

const User = ({ user, subtitle, size = 'md', variant = 'inline', className }: UserProps) => {
    const title = user.name || user.username || `ID ${user.id}`

    return (
        <div className={cls(cl.user, cl[size], cl[variant], className)}>
            <EntityImage src={user.image} title={title} className={cl.image}/>
            <div className={cl.text}>
                <span className={cl.name}>{title}</span>
                {subtitle && <span className={cl.subtitle}>{subtitle}</span>}
            </div>
        </div>
    );
};

export default User;
