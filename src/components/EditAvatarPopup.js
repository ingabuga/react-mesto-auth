import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import useFormStateAndValidation from '../hooks/useFormStateAndValidation.js';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const { values, errorMessages, formIsValid, onChange, resetFormValues } = useFormStateAndValidation();

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateAvatar({
            avatar: values.avatar
        });
    }

    useEffect(() =>{
        resetFormValues();
    }, [isOpen])

    return(
        <PopupWithForm  
            name="avatar"  
            title="Обновить аватар" 
            buttonText="Сохранить" 
            isOpen={isOpen}  
            onClose={onClose}  
            onSubmit={handleSubmit} 
            isValid={formIsValid} 
        > 
        <div className="popup__field"> 
            <input type="url" 
            id="avatar-input" 
            placeholder="Ссылка на аватар" 
            name="avatar" 
            className="popup__text popup__text_input_job" onChange={onChange} 
            value={values.avatar || ''}
        /> 
        <span id="avatar-input-error"   
            className={`error ${(!formIsValid && isOpen) ? "error_active" : ""}`} 
        > 
            {errorMessages.avatar}
        </span> 
        </div> 

    </PopupWithForm> 
    )
}

export default EditAvatarPopup;