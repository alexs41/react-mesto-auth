import React, { useState } from 'react';
import Form from './Form';
import Header from './Header';
import { Link, withRouter } from 'react-router-dom';
import InfoTooltip from './InfoTooltip.js'
// import { CurrentUserContext } from '../contexts/CurrentUserContext';
// import successIcon from '../images/success-icon.svg';
// import failIcon from '../images/fail-icon.svg'

const Register = (props) => {
    // const currentUser = React.useContext(CurrentUserContext);
    const { onRegister } = props;

    // const successText = 'Вы успешно зарегистрировались!';
    // const failText = 'Что-то пошло не так! Попробуйте ещё раз.';
    
    // const [registerPopup, setRegisterPopup] = useState({
    //     iconPath: '',
    //     infoText: ''
    // });

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
            // debugger;
            // if (!data) {
            //     setRegisterPopup({
            //         iconPath: successIcon,
            //         infoText: successText
            //     });
            // } else {
            //     setRegisterPopup({
            //         iconPath: failIcon,
            //         infoText: failText
            //     });
            // }

        } catch (err) {
            // setRegisterPopup({
            //     iconPath: failIcon,
            //     infoText: failText
            // });
            console.log(`Ошибка! ${err}`);
             // выведем ошибку в консоль
        }
    }

    return (
        <>
            <Header children={
                // <div className="header__link">
                    <Link to="/sign-in" className="header__link link" style={{ textDecoration: 'none' }}>Войти</Link>
                /* </div> */
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
                    <p className='form__footnote'>Уже зарегистрированы? <Link className="form__link" to="/sign-in">Войти</Link></p>
                </form>
            {/* </CurrentUserContext.Provider> */}
            </div>
            {/* <InfoTooltip isOpen={isInfoTooltipOpen} onClose={onClose} iconPath={registerPopup.iconPath} infoText={registerPopup.infoText} /> */}
        </>
    );
}
export default withRouter(Register);
