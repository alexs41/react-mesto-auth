import React, {useEffect} from 'react';

export default function ImagePopup(props)  {
    const { card, onClose, isOpen } = props;
    // debugger;
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

    // debugger;
    
    if (card) {
            // debugger;
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

//   constructor( popupSelector ) {
//     super(popupSelector);
//     this._figureImage = this._popup.querySelector('.figure__image');
//     this._figureCaption = this._popup.querySelector('.figure__caption');
// }
// open(name, imageUrl) {
//     this._figureCaption.textContent = name;
//     this._figureImage.src = imageUrl;
//     this._figureImage.alt = name;
//     super.open();
// }

//   export default class Popup {

//     constructor( popupSelector ) {
//         this._popup = document.querySelector(popupSelector);
//     }
//     open() {
//         this._popup.classList.add('popup_opened');
//         document.addEventListener('keydown', this._handleEscClose);
//     }
//     close() {
//         this._popup.classList.remove('popup_opened');
//         document.removeEventListener('keydown', this._handleEscClose);
//     }
//     _handleEscClose = (e) => {
//         if (e.key === 'Escape') {
//             this.close();
//         }
//     }
//     setEventListeners() {
//         this._popup.addEventListener('mousedown', (evt) => { 
//             if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close-button')) { 
//                 this.close(); 
//             }; 
//           }); // обработчик на кнопки закрытия поп-ап и темной области поп-ап
//     }
// }