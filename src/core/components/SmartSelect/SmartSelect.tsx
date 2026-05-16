import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {createPortal} from 'react-dom';
import {cls} from 'core/service/cls';
import EntityImage, {EEntityImageVariant} from 'core/components/EntityImage/EntityImage';
import cl from './_SmartSelect.module.scss';

export type SmartSelectValue = string | number;

export interface ISmartSelectOption {
    value: SmartSelectValue
    label: string
    subtitle?: string
    color?: string
    image?: string
    entity?: 'user' | 'project'
    disabled?: boolean
}

interface SmartSelectProps {
    label?: string
    hint?: string
    placeholder?: string
    searchPlaceholder?: string
    options: ISmartSelectOption[]
    value?: SmartSelectValue | SmartSelectValue[] | null
    multiple?: boolean
    searchable?: boolean
    disabled?: boolean
    loading?: boolean
    emptyText?: string
    dropdownFooter?: React.ReactNode
    searchValue?: string
    onSearchChange?: (value: string) => void
    withApplyButtons?: boolean
    onChange: (value: any) => void
    className?: string
}

const normalizeValue = (value?: SmartSelectProps['value']) => {
    if (value === undefined || value === null || value === '') return []
    return Array.isArray(value) ? value : [value]
}

const includesValue = (values: SmartSelectValue[], value: SmartSelectValue) => {
    return values.some(item => String(item) === String(value))
}

const getImageVariant = (option: ISmartSelectOption) => {
    return option.entity === 'project' ? EEntityImageVariant.PROJECT : EEntityImageVariant.USER
}

const OptionVisual = ({option}: { option: ISmartSelectOption }) => {
    if (option.image || option.entity) {
        return (
            <EntityImage src={option.image}
                         title={option.label}
                         variant={getImageVariant(option)}
                         className={cl.optionImage}/>
        )
    }

    if (option.color) {
        return <span className={cl.optionColor} style={{backgroundColor: option.color}}/>
    }

    return <span className={cl.optionBullet}/>
}

const PANEL_OFFSET = 7

const SmartSelect = ({
    label,
    hint,
    placeholder = 'Выберите значение',
    searchPlaceholder = 'Введите что-нибудь...',
    options,
    value,
    multiple = false,
    searchable = true,
    disabled = false,
    loading = false,
    emptyText = 'Ничего не найдено',
    dropdownFooter,
    searchValue,
    onSearchChange,
    withApplyButtons,
    onChange,
    className,
}: SmartSelectProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [localSearch, setLocalSearch] = useState('')
    const [draftValues, setDraftValues] = useState<SmartSelectValue[]>([])
    const [panelPosition, setPanelPosition] = useState({top: 0, left: 0, width: 0})
    const rootRef = useRef<HTMLDivElement>(null)
    const panelRef = useRef<HTMLDivElement>(null)
    const selectedValues = useMemo(() => normalizeValue(value), [value])
    const hasApplyButtons = withApplyButtons ?? multiple
    const activeValues = hasApplyButtons ? draftValues : selectedValues
    const currentSearch = searchValue ?? localSearch

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node
            if (rootRef.current?.contains(target) || panelRef.current?.contains(target)) return
            setIsOpen(false)
            setDraftValues(selectedValues)
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [selectedValues])

    useEffect(() => {
        if (!isOpen) setDraftValues(selectedValues)
    }, [isOpen, selectedValues])

    useLayoutEffect(() => {
        if (!isOpen) return

        const updatePanelPosition = () => {
            const trigger = rootRef.current?.querySelector(`.${cl.trigger}`)
            if (!(trigger instanceof HTMLElement)) return

            const rect = trigger.getBoundingClientRect()
            setPanelPosition({
                top: rect.bottom + PANEL_OFFSET,
                left: rect.left,
                width: rect.width,
            })
        }

        updatePanelPosition()
        window.addEventListener('resize', updatePanelPosition)
        window.addEventListener('scroll', updatePanelPosition, true)

        return () => {
            window.removeEventListener('resize', updatePanelPosition)
            window.removeEventListener('scroll', updatePanelPosition, true)
        }
    }, [isOpen])

    const selectedOptions = useMemo(() => {
        return options.filter(option => includesValue(selectedValues, option.value))
    }, [options, selectedValues])

    const filteredOptions = useMemo(() => {
        const query = currentSearch.trim().toLowerCase()
        if (!query || onSearchChange) return options
        return options.filter(option => {
            const content = `${option.label} ${option.subtitle || ''}`.toLowerCase()
            return content.includes(query)
        })
    }, [currentSearch, onSearchChange, options])

    const handleSearch = (nextValue: string) => {
        if (searchValue === undefined) setLocalSearch(nextValue)
        onSearchChange?.(nextValue)
    }

    const handleOptionClick = (option: ISmartSelectOption) => {
        if (option.disabled) return

        if (multiple) {
            const sourceValues = hasApplyButtons ? draftValues : selectedValues
            const exists = includesValue(sourceValues, option.value)
            const nextValue = exists
                ? sourceValues.filter(item => String(item) !== String(option.value))
                : [...sourceValues, option.value]

            if (hasApplyButtons) {
                setDraftValues(nextValue)
                return
            }

            onChange(nextValue)
            return
        }

        onChange(option.value)
        setIsOpen(false)
    }

    const clearValue = (event: React.MouseEvent<HTMLSpanElement>) => {
        event.stopPropagation()
        onChange(multiple ? [] : '')
        setDraftValues([])
    }

    const clearDraft = () => {
        setDraftValues([])
        onChange([])
        setIsOpen(false)
    }

    const applyDraft = () => {
        onChange(draftValues)
        setIsOpen(false)
    }

    const stopPortalEvent = (event: React.SyntheticEvent) => {
        event.stopPropagation()
    }

    const selectOption = (event: React.PointerEvent<HTMLButtonElement>, option: ISmartSelectOption) => {
        event.preventDefault()
        event.stopPropagation()
        handleOptionClick(option)
    }

    const clickOption = (event: React.MouseEvent<HTMLButtonElement>, option: ISmartSelectOption) => {
        event.preventDefault()
        event.stopPropagation()
        handleOptionClick(option)
    }

    const renderTriggerContent = () => {
        if (loading) return <span className={cls(cl.triggerText, cl.placeholder)}>Загрузка...</span>
        if (selectedOptions.length === 0) {
            return <span className={cls(cl.triggerText, cl.placeholder)}>{placeholder}</span>
        }

        const firstOption = selectedOptions[0]
        return (
            <span className={cl.triggerOption}>
                <OptionVisual option={firstOption}/>
                <span className={cl.optionContent}>
                    <span className={cl.optionLabel}>{firstOption.label}</span>
                    {firstOption.subtitle && <span className={cl.optionSubtitle}>{firstOption.subtitle}</span>}
                </span>
                {multiple && selectedOptions.length > 1 &&
                    <span className={cl.count}>+{selectedOptions.length - 1}</span>
                }
            </span>
        )
    }

    const dropdown = isOpen ? createPortal(
        <div className={cl.panel}
             ref={panelRef}
             onPointerDown={stopPortalEvent}
             onMouseDown={stopPortalEvent}
             onClick={stopPortalEvent}
             style={{
                 top: panelPosition.top,
                 left: panelPosition.left,
                 width: panelPosition.width,
             }}>
            {searchable &&
                <input className={cl.search}
                       value={currentSearch}
                       onChange={event => handleSearch(event.target.value)}
                       placeholder={searchPlaceholder}
                       autoFocus/>
            }

            <div className={cl.recommendation}>Рекомендации</div>

            <div className={cl.options}>
                {filteredOptions.map(option => {
                    const isSelected = includesValue(activeValues, option.value)

                    return (
                        <button className={cls(cl.option, isSelected ? cl.optionSelected : '', option.disabled ? cl.optionDisabled : '')}
                                type="button"
                                key={option.value}
                                onPointerDown={(event) => selectOption(event, option)}
                                onMouseDown={(event) => event.stopPropagation()}
                                onClick={(event) => clickOption(event, option)}>
                            <OptionVisual option={option}/>
                            <span className={cl.optionContent}>
                                <span className={cl.optionLabel}>{option.label}</span>
                                {option.subtitle && <span className={cl.optionSubtitle}>{option.subtitle}</span>}
                            </span>
                            {isSelected && <span className={cl.check}>✓</span>}
                        </button>
                    )
                })}

                {!loading && filteredOptions.length === 0 && <div className={cl.empty}>{emptyText}</div>}
                {loading && <div className={cl.empty}>Загрузка...</div>}
            </div>

            {dropdownFooter && <div className={cl.footer}>{dropdownFooter}</div>}

            {hasApplyButtons &&
                <div className={cl.actions}>
                    <button className={cl.secondaryAction} type="button" onClick={clearDraft}>
                        Очистить
                    </button>
                    <button className={cl.primaryAction} type="button" onClick={applyDraft}>
                        Применить
                    </button>
                </div>
            }
        </div>,
        document.body,
    ) : null

    return (
        <div className={cls(cl.root, isOpen ? cl.open : '', disabled ? cl.disabled : '', className)} ref={rootRef}>
            {(label || hint) &&
                <div className={cl.caption}>
                    {label && <span className={cl.label}>{label}</span>}
                    {hint && <span className={cl.hint}>{hint}</span>}
                </div>
            }

            <button className={cl.trigger}
                    type="button"
                    disabled={disabled}
                    onClick={() => setIsOpen(prev => !prev)}>
                {renderTriggerContent()}
                {selectedOptions.length > 0 &&
                    <span className={cl.clear} onClick={clearValue}>x</span>
                }
                <span className={cl.chevron}/>
            </button>

            {dropdown}

        </div>
    );
};

export default SmartSelect;
