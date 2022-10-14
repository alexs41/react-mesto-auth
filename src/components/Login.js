import React from 'react';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Login = () => {
    // const currentUser = React.useContext(CurrentUserContext);

    return (
        <div className="login">
            {/* <CurrentUserContext.Provider value={currentUser}> */}
            <form className="form form_login">
                    <h3 className="form__header form__header_login">Вход</h3>
                    <input id="full-name-input" type="email" name="name" className="form__input form__input_login" placeholder="Email" required minLength="2" maxLength="40" />
                    <span className="full-name-input-error form__input-error"></span>
                    <input id="description-input" type="text" name="about" className="form__input form__input_login" placeholder="Пароль" required minLength="2" maxLength="40" />
                    <span className="description-input-error form__input-error"></span>
                    <button className="form__submit-button form__submit-button_login" type="submit">Войти</button>
            </form>
            {/* </CurrentUserContext.Provider> */}
        </div>
    );
}

export default Login;
