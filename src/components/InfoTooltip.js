import React from 'react';
import Popup from './Popup';
import successIcon from '../images/success-icon.svg';
import failIcon from '../images/fail-icon.svg'

export default function InfoTooltip (props) {
    // const currentUser = React.useContext(CurrentUserContext);
    const { isOpen, onClose, iconPath, infoText } = props;
    // form_login
    // Вход
    // Войти
    return (
        <>
            {/* <CurrentUserContext.Provider value={currentUser}> */}
            <Popup name="info-tool-tip" isOpen={isOpen} onClose={onClose} children={
                <>
                    <form className="form info-tool-tip">
                        <img className="info-tool-tip__icon"
                            src={successIcon}
                            alt="test"></img>
                        <h3 className="info-tool-tip__message">Вы успешно зарегистрировались!</h3>
                    </form>
                    
                </>
            } />
            {/* </CurrentUserContext.Provider> */}
        </>
            
        
    );
}