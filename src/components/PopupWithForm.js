import React, {useEffect} from 'react';

export default function PopupWithForm(props)  {
    const { title, name, isOpen, onClose, children, onSubmit } = props;
    
    function handleEscClose(e) {
        if (e.key === 'Escape') {
            onClose();
        }
    }

    function handleBlackAreaClosePopup(e) {
        if (e.target === e.currentTarget) { 
            onClose(); 
        };
    }

    useEffect(() => {
        if (isOpen === true) {
            document.addEventListener("keydown", handleEscClose);
            return () => document.removeEventListener("keydown", handleEscClose);
        };
    }, [isOpen, handleEscClose]);

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={handleBlackAreaClosePopup}>
            <div className="popup__container">
                <form className="form" name={name} onSubmit={onSubmit}>
                    <h3 className="form__header">{title}</h3>
                    {children}
                    <button className="popup__close-button" type="button" onClick={onClose}></button>
                </form>
            </div>
        </div>
    );
}