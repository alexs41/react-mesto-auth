import React, {useEffect} from 'react';

export default function PopupWithForm(props)  {
    const { title, name, isOpen, onClose, onEscClose, children } = props;
    
    
    useEffect(() => {
        if (isOpen === true) {
            document.addEventListener("keydown", onEscClose);
            return () => document.removeEventListener("keydown", onEscClose);
        };
      }, [isOpen, onEscClose]);

    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`} onClick={
            (evt) => { 
                if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) { 
                    onClose(); 
                };
              }
        }>
            <div className="popup__container">
                <form className="form" name={name}>
                    <h3 className="form__header">{title}</h3>
                    {children}
                    <button className="popup__close-button" type="button" onClick={onClose}></button>
                </form>
            </div>
        </div>
    );
}