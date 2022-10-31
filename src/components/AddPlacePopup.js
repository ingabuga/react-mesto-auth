import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm.js';
import useFormStateAndValidation from '../hooks/useFormStateAndValidation.js';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const { values, errorMessages, formIsValid, onChange, resetFormValues } = useFormStateAndValidation();

    useEffect(() => {
        resetFormValues();
    }, [isOpen])

    function handleSubmit(evt) {
        evt.preventDefault();
        
        onAddPlace({
            name: values.name,
            link: values.link,
        })
    }

    return (
        <PopupWithForm 
            name="place" 
            title="Новое место" 
            buttonText="Создать"
            isOpen={isOpen} 
            onClose={onClose} 
            onSubmit={handleSubmit} 
            isValid={formIsValid} 
        >
            <label className="popup__field">
                <input 
                    type="text" 
                    id="place-input" 
                    placeholder="Название" 
                    name="name" className="popup__text popup__text_input_name" required minLength="2" maxLength="30" 
                    onChange={onChange} 
                    value={values.name || ''}
                />
                <span id="place-input-error" 
                    className={`error ${(!formIsValid && isOpen) ? "error_active" : ""}`}>
                        {errorMessages.name}
                </span>
            </label>
            <label className="popup__field">
                <input 
                    type="url" 
                    id="link-input" 
                    placeholder="Ссылка на картинку" 
                    name="link" className="popup__text popup__text_input_job" required 
                    onChange={onChange} 
                    value={values.link || ''}
                />
                <span id="link-input-error" 
                    className={`error ${(!formIsValid && isOpen) ? "error_active" : ""}`}>
                        {errorMessages.link}
                </span>
            </label>
        </PopupWithForm>
        )


}

export default AddPlacePopup;