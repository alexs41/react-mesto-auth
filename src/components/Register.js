import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

const Register = (props) => {
    const { onRegister } = props;

    const [state, setState] = useState({
        email: '',
        password: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        });
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault();
            const { password, email } = state;
            await onRegister(password, email);
        } catch (err) {
            console.log(`Ошибка! ${err}`);
             // выведем ошибку в консоль
        }
    }

    return (
        <>
            <div className="login">
                <form className="form form_login" onSubmit={handleSubmit}>
                    <h3 className="form__header form__header_login">Регистрация</h3>
                    <input id='email' type="email" name='email' className="form__input form__input_login" placeholder="Email" onChange={handleChange} value={state.email} required minLength="2" maxLength="40" />
                    <span className="form__input-error"></span>
                    <input id='password' type="password" name='password' className="form__input form__input_login" placeholder="Пароль" onChange={handleChange} value={state.password} required minLength="2" maxLength="40" />
                    <span className="form__input-error"></span>
                    <button className="form__submit-button form__submit-button_login" type="submit">Зарегистрироваться</button>
                    <p className='form__footnote'>Уже зарегистрированы? <Link className="form__link" to="/sign-in">Войти</Link></p>
                </form>
            </div>
        </>
    );
}
export default withRouter(Register);
