import React from 'react';
import {IUser} from "core/entity/User/model/model";
import cl from 'core/entity/User/ui/user/_User.module.scss'
import {cls} from "core/service/cls";
import EntityImage from "core/components/EntityImage/EntityImage";
import {getUserDisplayName} from "core/entity/User/service/service";
import {Link} from "react-router-dom";

interface UserProps {
    user: IUser
    subtitle?: string
    size?: 'sm' | 'md' | 'lg'
    variant?: 'inline' | 'compact'
    clickable?: boolean
    className?: string
}

const User = ({ user, subtitle, size = 'md', variant = 'inline', clickable = true, className }: UserProps) => {
    const title = getUserDisplayName(user)
    const content = (
        <>
            <EntityImage src={user.image} title={title} className={cl.image}/>
            <div className={cl.text}>
                <span className={cl.name}>{title}</span>
                {subtitle && <span className={cl.subtitle}>{subtitle}</span>}
            </div>
        </>
    )

    if (clickable && user.id > 0) {
        return (
            <Link to={`/user/${user.id}`} className={cls(cl.user, cl.link, cl[size], cl[variant], className)}>
                {content}
            </Link>
        )
    }

    return (
        <div className={cls(cl.user, cl[size], cl[variant], className)}>
            {content}
        </div>
    );
};

export default User;
