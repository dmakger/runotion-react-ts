import React from 'react';
import {cls} from 'core/service/cls';
import cl from './_SearchInput.module.scss';

interface SearchInputProps {
    value: string
    onChange: (value: string) => void
    placeholder?: string
    className?: string
}

const SearchInput = ({value, onChange, placeholder = 'Поиск', className}: SearchInputProps) => {
    return (
        <div className={cls(cl.block, className)}>
            <span className={cl.icon}/>
            <input value={value}
                   onChange={(event) => onChange(event.target.value)}
                   placeholder={placeholder}/>
            {value &&
                <button className={cl.clear}
                        type="button"
                        aria-label="Очистить поиск"
                        onClick={() => onChange('')}>
                    x
                </button>
            }
        </div>
    );
};

export default SearchInput;
