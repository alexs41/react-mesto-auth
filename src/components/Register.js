import React from 'react';
import Form from './Form';
import Header from './Header';
import { Link } from 'react-router-dom'
// import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Register = () => {
    // const currentUser = React.useContext(CurrentUserContext);

    return (
        <>
            <Header linkName="Войти" linkPath="/sign-in" />
            <Form formClassName='form_login' formHeader='Регистрация' sumbitButtonText='Зарегистрироваться' />
            <p className='form__footnote'>Уже зарегистрированы? <Link to="/sign-in">Войти</Link></p>
        </>
    );
}

export default Register;
