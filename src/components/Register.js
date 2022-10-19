import React, { useState } from 'react';
import Form from './Form';
import Header from './Header';
import { Link, withRouter } from 'react-router-dom';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Register = (props) => {
    // const currentUser = React.useContext(CurrentUserContext);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const { password, email } = state;
        onRegister(password, email)
          .catch(err => {
            console.log(err);
            setState({
              ...state,
              mexzssage: 'Что-то пошло не так!'
            })
          });
      }

    return (
        <>
            <Header children={
                <div className="header__link">
                    <Link to="/sign-in" className="link" style={{ textDecoration: 'none' }}>Войти</Link>
                </div>
            } />
            <div className="login">
            {/* <CurrentUserContext.Provider value={currentUser}> */}
                <form className="form form_login" onSubmit={handleSubmit}>
                    <h3 className="form__header form__header_login">Регистрация</h3>
                    <input id='email' type="email" name='email' className="form__input form__input_login" placeholder="Email" onChange={handleChange} value={state.email} required minLength="2" maxLength="40" />
                    <span className="form__input-error"></span>
                    <input id='password' type="password" name='password' className="form__input form__input_login" placeholder="Пароль" onChange={handleChange} value={state.password} required minLength="2" maxLength="40" />
                    <span className="form__input-error"></span>
                    <button className="form__submit-button form__submit-button_login" type="submit">Зарегистрироваться</button>
                </form>
            {/* </CurrentUserContext.Provider> */}
            </div>
            <p className='form__footnote'>Уже зарегистрированы? <Link to="/sign-in">Войти</Link></p>
        </>
    );
}
export default withRouter(Register);
