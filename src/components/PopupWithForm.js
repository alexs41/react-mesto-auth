import React, {useEffect} from 'react';

export default function PopupWithForm(props)  {
    const { title, name, isOpen, onClose, children } = props;
    
    
    useEffect(() => {
        function handleEscClose(e) {
            if (e.key === 'Escape') {
                onClose();
            }
        }
        document.addEventListener("keydown", handleEscClose);
        return () => {
          document.removeEventListener("keydown", handleEscClose);
        };
      }, [onClose]);

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