import { useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import useFormStateAndValidation from '../hooks/useFormStateAndValidation.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);

    const { values, errorMessages, formIsValid, onChange, resetFormValues } = useFormStateAndValidation();

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateUser({
            name: values.name,
            about: values.about,
        });
    }

    useEffect(() => {
        const data = {
            name: currentUser.data.name,
            about: currentUser.data.about,
        }

        resetFormValues(data, {}, true);
    },
    [currentUser, isOpen])

    return(
        <PopupWithForm 
            name="profile" 
            title="Редактировать профиль"
            buttonText="Сохранить" 
            isOpen={isOpen} 
            onClose={onClose} 
            onSubmit={handleSubmit}
            isValid={formIsValid}
        >
        <label className="popup__field">
            <input 
                type="text" 
                id="name-input" 
                placeholder="Имя" 
                name="name" 
                className="popup__text popup__text_input_name" required minLength="2" maxLength="40" 
                onChange={onChange} 
                value={values.name || ''}
            />
            <span 
                id="name-input-error" 
                className={`error ${(!formIsValid && isOpen) ? "error_active" : ""}`}  
            >
                {errorMessages.name}
            </span>     
        </label>
        <label className="popup__field">
        <input 
            type="text" 
            id="job-input" 
            placeholder="Профессия" 
            name="about" 
            className="popup__text popup__text_input_job" required minLength="2" maxLength="200" 
            onChange={onChange} 
            value={values.about || ''}
        />
        <span id="job-input-error" 
        className={`error ${(!formIsValid && isOpen) ? "error_active" : ""}`} 
        >
            {errorMessages.about}
        </span>
        </label>
        </ PopupWithForm>
    )
}

export default EditProfilePopup;