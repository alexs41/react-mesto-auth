import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [state, setState] = useState({
        email: '',
        password: '',
        message: ''
      });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setState({
          ...state,
          [name]: value 
        });
      };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { password, email } = state;

        if (!email || !password) return;

        onLogin(password, email)
            .catch(err => {
            console.log(err);
            setState({
                ...state,
                message: 'Что-то пошло не так!'
            })
            });
    };

    return (
        <>
            <div className="login">
                <form className="form form_login" onSubmit={handleSubmit}>
                    <h3 className="form__header form__header_login">Вход</h3>
                    <input id='email' type="email" name='email' className="form__input form__input_login" placeholder="Email" onChange={handleChange} value={state.email} required minLength="2" maxLength="40" />
                    <span className="form__input-error"></span>
                    <input id='password' type="password" name='password' className="form__input form__input_login" placeholder="Пароль" onChange={handleChange} value={state.password} required minLength="2" maxLength="40" />
                    <span className="form__input-error"></span>
                    <button className="form__submit-button form__submit-button_login" type="submit">Войти</button>
                    <p className='form__footnote'></p>
                </form>
            </div>
        </>
    );
}

export default withRouter(Login); 
