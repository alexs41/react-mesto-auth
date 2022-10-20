import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Form from './Form';

const Register = ({ onRegister }) => {
    return (
        <>
            <Form formHeader="Регистрация" sumbitButtonText="Зарегистрироваться" callBackFunction={onRegister} children={
                <p className='form__footnote'>Уже зарегистрированы? <Link className="form__link" to="/sign-in">Войти</Link></p>
            } />
        </>
    );
}
export default withRouter(Register);
