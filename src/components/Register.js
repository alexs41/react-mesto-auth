import React, { useState } from 'react';
import Form from './Form';
import Header from './Header';
import { Link } from 'react-router-dom'
// import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Register = (props) => {
    // const currentUser = React.useContext(CurrentUserContext);
    // const { onRegister1 } = props;
    const onRegister2 = (password, email) => {
        // await auth.register(email, password);
        // history.push('/sign-in');
        console.log('onRegister2', password, email);
    };

    return (
        <>
            <Header linkName="Войти" linkPath="/sign-in" />
            <Form formClassName='form_login' formHeader='Регистрация' sumbitButtonText='Зарегистрироваться' onRegister1={onRegister2} />
            <p className='form__footnote'>Уже зарегистрированы? <Link to="/sign-in">Войти</Link></p>
        </>
    );
}

export default Register;
