import React, {useState} from 'react';
import {cls} from 'core/service/cls';
import cl from './_AddSectionCard.module.scss';

export const SECTION_PALETTE = [
    '#00F2A6',
    '#7C5CFF',
    '#26C6DA',
    '#FFB020',
    '#FF6B8A',
    '#65D46E',
    '#B78CFF',
    '#FF7A45',
];

interface AddSectionCardProps {
    onAddSection?: (name: string, color: string) => void
    className?: string
}

const AddSectionCard = ({onAddSection, className}: AddSectionCardProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState('')
    const [color, setColor] = useState(SECTION_PALETTE[0])

    const createSection = () => {
        const trimmedName = name.trim()
        if (!trimmedName || !onAddSection) return

        onAddSection(trimmedName, color)
        setName('')
        setColor(SECTION_PALETTE[(SECTION_PALETTE.indexOf(color) + 1) % SECTION_PALETTE.length])
        setIsOpen(false)
    }

    if (!isOpen) {
        return (
            <button className={cls(cl.compact, className)} type="button" onClick={() => setIsOpen(true)}>
                <span className={cl.plus}>+</span>
                <span>Новая колонка</span>
            </button>
        )
    }

    return (
        <div className={cls(cl.card, className)}>
            <div className={cl.header}>
                <span>Новая колонка</span>
                <button className={cl.close} type="button" onClick={() => setIsOpen(false)}>x</button>
            </div>

            <input className={cl.input}
                   value={name}
                   onChange={(event) => setName(event.target.value)}
                   onKeyDown={(event) => {
                       if (event.key === 'Enter') createSection()
                   }}
                   placeholder="Название колонки"
                   autoFocus/>

            <div className={cl.palette}>
                {SECTION_PALETTE.map(paletteColor => (
                    <button className={cls(cl.swatch, paletteColor === color ? cl.activeSwatch : '')}
                            type="button"
                            key={paletteColor}
                            style={{backgroundColor: paletteColor}}
                            aria-label={`Выбрать цвет ${paletteColor}`}
                            onClick={() => setColor(paletteColor)}/>
                ))}
            </div>

            <label className={cl.customColor}>
                <span>Свой цвет</span>
                <input type="color"
                       value={color}
                       onChange={(event) => setColor(event.target.value)}/>
            </label>

            <button className={cl.submit}
                    type="button"
                    onClick={createSection}
                    disabled={!name.trim()}>
                Добавить колонку
            </button>
        </div>
    );
};

export default AddSectionCard;
