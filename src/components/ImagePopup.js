import React, {useEffect} from 'react';

export default function ImagePopup(props)  {
    const { card, onClose, isOpen } = props;
    function _handleEscClose(e) {
        if (e.key === 'Escape') {
            onClose();
        }
    }
    useEffect(() => {
        document.addEventListener("keydown", _handleEscClose);
        return () => {
          document.removeEventListener("keydown", _handleEscClose);
        };
      });
      
    if (card) {
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
                        <img className="figure__image" src={card.link} alt={card.name}/>
                        <figcaption className="figure__caption">{card.name}</figcaption>
                        <button className="popup__close-button" type="button" onClick={onClose}></button>
                    </figure>
                </div>
            </div>)
        }
}