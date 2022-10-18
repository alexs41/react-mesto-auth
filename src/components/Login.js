import React from 'react';
import Form from './Form';
import Header from './Header';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Login = () => {
    // const currentUser = React.useContext(CurrentUserContext);

    return (
        <>
            <Header linkName="Регистрация" linkPath="/sign-up" />
            <Form formClassName='form_login' formHeader='Вход' sumbitButtonText='Войти' />
        </>
    );
}

export default Login;
