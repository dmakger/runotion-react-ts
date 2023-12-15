import React from "react";

export const getFormData = (e: React.FormEvent<Element>, _ref: React.MutableRefObject<null>) => {
    e.preventDefault();
    if (!_ref.current) return

    const formData = new FormData(_ref.current)
    const tempDataStorage: Record<string, any> = {}
    formData.forEach((value, key) => {
        tempDataStorage[key] = value
    })
    return tempDataStorage
}
