import React, {useCallback, useEffect, useState} from 'react';
import {createTaskCategoryAPI, getTaskCategoriesAPI, updateTaskAPI} from "core/entity/Task/api/TaskApi";
import {ITask, ITaskCategory} from "core/entity/Task/model/model";
import {cls} from "core/service/cls";
import SmartSelect, {ISmartSelectOption} from "core/components/SmartSelect/SmartSelect";
import cl from './_CategoryBlockSidebarTask.module.scss';

interface CategoryBlockSidebarTaskProps {
    task: ITask
    onTaskChange?: (task: ITask) => void
    className?: string
}

const DEFAULT_COLORS = ['#6D5DFB', '#20B486', '#F59E0B', '#EF4444', '#0EA5E9', '#EC4899'];

const CategoryBlockSidebarTask = ({task, onTaskChange = () => {}, className}: CategoryBlockSidebarTaskProps) => {
    const [categories, setCategories] = useState<ITaskCategory[]>([])
    const [name, setName] = useState('')
    const [color, setColor] = useState(DEFAULT_COLORS[0])
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
            setColor(DEFAULT_COLORS[(DEFAULT_COLORS.indexOf(color) + 1) % DEFAULT_COLORS.length])
            return updateTaskAPI({id: task.id, category_id: category.id}).then((response: ITask) => {
                const updatedTask = {...task, category: response.category}
                onTaskChange(updatedTask)
                window.dispatchEvent(new CustomEvent('runotion:task-updated', {detail: {task: updatedTask}}))
            })
        }).finally(() => setIsLoading(false))
    }

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
                         disabled={isLoading}
                         className={cl.select}/>

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
                <button className={cl.button} onClick={createCategory} disabled={isLoading || !name.trim()}>
                    Добавить
                </button>
            </div>
        </div>
    );
};

export default CategoryBlockSidebarTask;
