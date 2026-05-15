import React, {useCallback, useEffect, useState} from 'react';
import {createTaskCategoryAPI, getTaskCategoriesAPI, updateTaskAPI} from "core/entity/Task/api/TaskApi";
import {ITask, ITaskCategory} from "core/entity/Task/model/model";
import {cls} from "core/service/cls";
import SmartSelect, {ISmartSelectOption} from "core/components/SmartSelect/SmartSelect";
import {SECTION_PALETTE} from "core/widget/Section/components/addSection/AddSectionCard";
import cl from './_CategoryBlockSidebarTask.module.scss';

interface CategoryBlockSidebarTaskProps {
    task: ITask
    onTaskChange?: (task: ITask) => void
    className?: string
}

const CategoryBlockSidebarTask = ({task, onTaskChange = () => {}, className}: CategoryBlockSidebarTaskProps) => {
    const [categories, setCategories] = useState<ITaskCategory[]>([])
    const [name, setName] = useState('')
    const [color, setColor] = useState(SECTION_PALETTE[0])
    const [isLoading, setIsLoading] = useState(false)
    const categoryOptions: ISmartSelectOption[] = categories.map(category => ({
        value: category.id,
        label: category.name,
        subtitle: 'Категория задачи',
        color: category.color,
    }))

    const loadCategories = useCallback(() => {
        return getTaskCategoriesAPI(task.project.id).then(setCategories)
    }, [task.project.id])

    useEffect(() => {
        loadCategories()
    }, [loadCategories]);

    const changeTaskCategory = (categoryId: string) => {
        const nextCategoryId = categoryId ? Number(categoryId) : null
        setIsLoading(true)
        updateTaskAPI({id: task.id, category_id: nextCategoryId}).then((response: ITask) => {
            const updatedTask = {...task, category: response.category}
            onTaskChange(updatedTask)
            window.dispatchEvent(new CustomEvent('runotion:task-updated', {detail: {task: updatedTask}}))
        }).finally(() => setIsLoading(false))
    }

    const createCategory = () => {
        const trimmedName = name.trim()
        if (!trimmedName) return

        setIsLoading(true)
        createTaskCategoryAPI(task.project.id, {name: trimmedName, color}).then((category: ITaskCategory) => {
            setCategories(prev => [...prev, category].sort((a, b) => a.name.localeCompare(b.name)))
            setName('')
            setColor(SECTION_PALETTE[(SECTION_PALETTE.indexOf(color) + 1) % SECTION_PALETTE.length])
            return updateTaskAPI({id: task.id, category_id: category.id}).then((response: ITask) => {
                const updatedTask = {...task, category: response.category}
                onTaskChange(updatedTask)
                window.dispatchEvent(new CustomEvent('runotion:task-updated', {detail: {task: updatedTask}}))
            })
        }).finally(() => setIsLoading(false))
    }

    const createCategoryControl = (
        <div className={cl.create}>
            <input className={cl.input}
                   value={name}
                   onChange={(event) => setName(event.target.value)}
                   placeholder="Новая категория"
                   disabled={isLoading}/>
            <input className={cl.colorInput}
                   type="color"
                   value={color}
                   onChange={(event) => setColor(event.target.value)}
                   disabled={isLoading}/>
            <div className={cl.palette}>
                {SECTION_PALETTE.map(paletteColor => (
                    <button className={cls(cl.swatch, paletteColor === color ? cl.activeSwatch : '')}
                            type="button"
                            key={paletteColor}
                            style={{backgroundColor: paletteColor}}
                            aria-label={`Выбрать цвет ${paletteColor}`}
                            onClick={() => setColor(paletteColor)}
                            disabled={isLoading}/>
                ))}
            </div>
            <button className={cl.button}
                    type="button"
                    onClick={createCategory}
                    disabled={isLoading || !name.trim()}>
                Добавить
            </button>
        </div>
    )

    return (
        <div className={cls(cl.block, className)}>
            <div className={cl.header}>
                <span className={cl.title}>Категория</span>
                {task.category &&
                    <span className={cl.badge}>
                        <span className={cl.dot} style={{backgroundColor: task.category.color}}/>
                        {task.category.name}
                    </span>
                }
            </div>

            <SmartSelect value={task.category?.id || ''}
                         options={categoryOptions}
                         onChange={(value) => changeTaskCategory(String(value))}
                         placeholder={'Без категории'}
                         searchPlaceholder={'Найти категорию'}
                         emptyText={'Категорий пока нет'}
                         dropdownFooter={createCategoryControl}
                         disabled={isLoading}
                         className={cl.select}/>

        </div>
    );
};

export default CategoryBlockSidebarTask;
