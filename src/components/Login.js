import React from 'react';
import AuthorizeForm from './AuthorizeForm.js';

function Login({ handleLogin }) {
    return(
        <section className="sign content__sign">
            <AuthorizeForm
                name='signin'
                handleSubmit={handleLogin}
            />
        </section>
    );
}

export default Login;