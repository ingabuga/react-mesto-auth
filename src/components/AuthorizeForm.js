import { useEffect } from "react";
import useFormStateAndValidation from '../hooks/useFormStateAndValidation';

function AuthorizeForm({ name, handleSubmit }) {
    const { values, errorMessages, formIsValid, onChange, resetFormValues } = useFormStateAndValidation();

    useEffect(() => {
        resetFormValues();
    },
    [])

    function onSubmit(evt) {
        evt.preventDefault();

        handleSubmit(values.password, values.email);
    }

    return(
        <form 
            name={name} 
            className="sign__form" 
            onSubmit={onSubmit} 
            noValidate
        >
        <fieldset className="sign__fieldset">
            <legend className="sign__title">
                {name === "signin" && "Вход"}
                {name === "signup" && "Регистрация"}
            </legend>
            <input 
                type="email"
                name="email" 
                id="email-input" 
                className="sign__input" 
                placeholder="Email"
                onChange={onChange}
                value={values.email || ''}
                required
            />
            <span className="sign__error" >
                {errorMessages.email}
            </span>
            <input 
                type="text" 
                name="password" 
                id="password-input" 
                className="sign__input" 
                minLength="5" 
                maxLength="16" 
                placeholder="Пароль"
                onChange={onChange}
                value={values.password || ''}
                required
            />
            <span className="sign__error" >
                {errorMessages.password}
            </span>
            <button 
                type="submit" 
                className={
                    `sign__submit-button 
                    ${!formIsValid && "sign__submit-button_inactive"}`
                } 
                disabled={!formIsValid}
            >
                {name === "signin" && "Войти"}
                {name === "signup" && "Зарегистрироваться"}
            </button>
        </fieldset>
    </form>
    )
}

export default AuthorizeForm;