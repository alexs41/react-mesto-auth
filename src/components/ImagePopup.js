import React, {useEffect} from 'react';

export default function ImagePopup(props)  {
    const { card, onClose, isOpen } = props;
   
    useEffect(() => {
        if (isOpen) {
            document.addEventListener("keydown", handleEscClose);
            return () => document.removeEventListener("keydown", handleEscClose);
        }
    }, [isOpen, handleEscClose]);

    function handleBlackAreaClosePopup(e) {
        if (e.target === e.currentTarget) { 
            onClose(); 
        };
    }

    function handleEscClose(e) {
        if (e.key === 'Escape') {
            onClose();
        }
    }

    return (
        <div className={`popup popup_element-image ${isOpen ? 'popup_opened' : ''}`} onClick={handleBlackAreaClosePopup}>
            <div className="popup__container">
                <figure className="figure">
                    <img className="figure__image" src={card ? card.link : null} alt={card ? card.name : null}/>
                    <figcaption className="figure__caption">{card ? card.name : ''}</figcaption>
                    <button className="popup__close-button" type="button" onClick={onClose}></button>
                </figure>
            </div>
        </div>
    )
}