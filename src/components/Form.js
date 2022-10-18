import React from 'react';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Form = (props) => {
    // const currentUser = React.useContext(CurrentUserContext);
    const { formClassName,  formHeader, sumbitButtonText } = props;
    // form_login
    // Вход
    // Войти
    return (
        <div className="login">
            {/* <CurrentUserContext.Provider value={currentUser}> */}
            <form className={`form ${formClassName}`}>
                <h3 className="form__header form__header_login">{formHeader}</h3>
                <input id='' type="email" className="form__input form__input_login" placeholder="Email" required minLength="2" maxLength="40" />
                <span className="form__input-error"></span>
                <input id='' type="text" className="form__input form__input_login" placeholder="Пароль" required minLength="2" maxLength="40" />
                <span className="form__input-error"></span>
                <button className="form__submit-button form__submit-button_login" type="submit">{sumbitButtonText}</button>
            </form>
            {/* </CurrentUserContext.Provider> */}
        </div>
    );
}

export default Form;