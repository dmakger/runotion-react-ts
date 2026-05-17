import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Modal from 'core/modal/core/ui/ui/Modal';
import {IHintModal, IModal} from 'core/modal/core/modal/modal';
import {getErrorHintModal, getSuccessHintModal} from 'core/modal/core/ui/components/hint/service/service';
import {deleteProjectAPI, updateProjectAPI, updateProjectFormAPI} from 'core/entity/Project/api/ProjectApi';
import {IProject} from 'core/entity/Project/model/model';
import {PROJECT_ALL__MAIN_URL} from 'main/router/urlRouter';
import {useSetUrlModal} from 'core/modal/core/hooks/useUrlModalState';
import cl from './_ProjectSettingsModal.module.scss';

interface ProjectSettingsModalProps extends IModal {
    project: IProject
    onProjectChange?: (project: IProject) => void
}

const ProjectSettingsModal = ({
    project,
    isVisible = false,
    setIsVisible,
    onProjectChange = () => {},
}: ProjectSettingsModalProps) => {
    const [name, setName] = useState(project.name)
    const [image, setImage] = useState<File | null>(null)
    const [hint, setHint] = useState<IHintModal>()
    const [isSaving, setIsSaving] = useState(false)
    const navigate = useNavigate()
    const setUrlModal = useSetUrlModal()

    useEffect(() => {
        if (isVisible) setName(project.name)
    }, [isVisible, project.name])

    const saveProject = () => {
        const trimmedName = name.trim()
        if (!trimmedName) {
            setHint(getErrorHintModal('Введите название проекта'))
            return
        }

        const request = image
            ? (() => {
                const formData = new FormData()
                formData.append('name', trimmedName)
                formData.append('image', image)
                return updateProjectFormAPI(project.id, formData)
            })()
            : updateProjectAPI(project.id, {name: trimmedName})

        setIsSaving(true)
        request.then((response: Partial<IProject>) => {
            const updatedProject = {
                ...project,
                name: response.name || trimmedName,
                image: response.image || project.image,
            }
            setImage(null)
            onProjectChange(updatedProject)
            setHint(getSuccessHintModal('Проект обновлен'))
            window.dispatchEvent(new CustomEvent('runotion:project-updated', {
                detail: {
                    project: updatedProject,
                }
            }))
        }).catch(() => {
            setHint(getErrorHintModal('Не удалось обновить проект'))
        }).finally(() => setIsSaving(false))
    }

    const deleteProject = () => {
        if (!window.confirm('Удалить проект и все связанные данные?')) return

        setIsSaving(true)
        deleteProjectAPI(project.id).then(() => {
            window.dispatchEvent(new CustomEvent('runotion:project-deleted', {
                detail: {
                    projectId: project.id,
                }
            }))
            setIsVisible(false)
            navigate(PROJECT_ALL__MAIN_URL)
        }).catch(() => {
            setHint(getErrorHintModal('Не удалось удалить проект'))
        }).finally(() => setIsSaving(false))
    }

    return (
        <Modal title={'Настройки проекта'} hint={hint}
               isVisible={isVisible} setIsVisible={setIsVisible}
               className={cl.block}>
            <div className={cl.form}>
                <label className={cl.field}>
                    <span>Название</span>
                    <input value={name}
                           onChange={(event) => setName(event.target.value)}
                           disabled={isSaving}/>
                </label>

                <label className={cl.fileField}>
                    <span>Картинка проекта</span>
                    <input type="file"
                           accept="image/*"
                           onChange={(event) => setImage(event.target.files?.[0] || null)}
                           disabled={isSaving}/>
                    <small>{image ? image.name : 'Можно выбрать логотип или обложку проекта'}</small>
                </label>

                <div className={cl.actions}>
                    <button className={cl.primary}
                            type="button"
                            onClick={saveProject}
                            disabled={isSaving || !name.trim()}>
                        Сохранить
                    </button>
                    <button className={cl.secondary}
                            type="button"
                            onClick={() => setUrlModal('project-users')}
                            disabled={isSaving}>
                        Участники и роли
                    </button>
                </div>

                <div className={cl.danger}>
                    <div>
                        <h3>Удаление проекта</h3>
                        <p>Проект будет удален вместе с задачами, колонками и настройками доступа.</p>
                    </div>
                    <button className={cl.delete}
                            type="button"
                            onClick={deleteProject}
                            disabled={isSaving}>
                        Удалить
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ProjectSettingsModal;
