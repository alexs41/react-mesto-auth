import React from 'react';
import Popup from './Popup';

export default function ImagePopup(props)  {
    const { card, onClose, isOpen } = props;

    return (
        <Popup isOpen={isOpen} onClose={onClose} children={
            <figure className="figure">
                <img className="figure__image" src={card ? card.link : null} alt={card ? card.name : null}/>
                <figcaption className="figure__caption">{card ? card.name : ''}</figcaption>
                <button className="popup__close-button" type="button" onClick={onClose}></button>
            </figure>
        } />
    )
}