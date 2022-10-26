import React from 'react';
import PopupWithForm from './PopupWithForm.js';

export default function ConfirmDeletePopup (props) {
    const { card, isOpen, onClose, onDeleteCard } = props;

    function handleSubmit(e) {
        e.preventDefault();
        onDeleteCard(card);
    }

    return (
        <PopupWithForm title='Вы уверены?' name='confirm' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} children={
            <>
                <button className="form__submit-button form__submit-button_confirm" type="submit">Да</button>
            </>
        } />
    )
}


