import { ETypeHintModal, IHintModal } from "core/modal/core/modal/modal"

// ВОЗВРАЩАЕТ ПОДСКАЗКУ МОДАЛКИ С ТИПОМ ERROR
export const getErrorHintModal = (message: string) => {
    return {type: ETypeHintModal.ERROR, message: message} as IHintModal
}


// ВОЗВРАЩАЕТ ПОДСКАЗКУ МОДАЛКИ С ТИПОМ SUCCESS
export const getSuccessHintModal = (message: string) => {
    return {type: ETypeHintModal.SUCCESS, message: message} as IHintModal
}