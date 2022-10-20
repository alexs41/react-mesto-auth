import React from 'react';
import { withRouter } from 'react-router-dom';
import Form from './Form'

const Login = ({ onLogin }) => {
    return (
        <>
            <Form formHeader="Вход" sumbitButtonText="Войти" callBackFunction={onLogin} children={
                <p className='form__footnote'></p>
            } />
        </>
    );
}

export default withRouter(Login); 
