import React, {useEffect} from 'react';

export default function PopupWithForm(props)  {
    
    function _handleEscClose(e) {
        if (e.key === 'Escape') {
            props.onClose();
        }
    }
    useEffect(() => {
        document.addEventListener("keydown", _handleEscClose);
        return () => {
          document.removeEventListener("keydown", _handleEscClose);
        };
      });

    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} onClick={
            (evt) => { 
                if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) { 
                    props.onClose(); 
                };
              }
        }>
            <div className="popup__container">
                <form className="form" name={props.name}>
                    <h3 className="form__header">{props.title}</h3>
                    {props.children}
                    <button className="popup__close-button" type="button" onClick={props.onClose}></button>
                </form>
            </div>
        </div>
    );
}