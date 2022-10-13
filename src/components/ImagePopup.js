import React, {useEffect} from 'react';

export default function ImagePopup(props)  {
    const { card, onClose, isOpen, onEscClose } = props;
   
    useEffect(() => {
        if (isOpen) {
            document.addEventListener("keydown", onEscClose);
            return () => document.removeEventListener("keydown", onEscClose);
        }
      }, [isOpen, onEscClose]);
    
    return (
    <div className={`popup popup_element-image ${isOpen ? 'popup_opened' : ''}`} onClick={
        (evt) => { 
            if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) { 
                onClose(); 
            };
            }
    }>
        <div className="popup__container">
            <figure className="figure">
                <img className="figure__image" src={card ? card.link : null} alt={card ? card.name : null}/>
                <figcaption className="figure__caption">{card ? card.name : ''}</figcaption>
                <button className="popup__close-button" type="button" onClick={onClose}></button>
            </figure>
        </div>
    </div>)
}