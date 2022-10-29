import React from 'react';
import { Link } from 'react-router-dom';
import AuthorizeForm from './AuthorizeForm.js';

function Register({ handleRegister }) {
    return(
        <section className="sign sign__content">
            <AuthorizeForm
                name='signup'
                handleSubmit={handleRegister}
            />
            <p className="sign__caption" >
                Уже зарегистрированы?&nbsp;
                <Link className="sign__link" to="/sign-in" >
                    Войти
                </Link>
            </p>
        </section>
    );
}

export default Register;