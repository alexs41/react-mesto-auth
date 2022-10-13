import React from 'react';
import PopupWithForm from './PopupWithForm.js';

export default function AddPlacePopup (props) {
    const {isOpen, onClose, onAddPlace } = props;

    const cardHeaderRef = React.useRef();
    const cardLinkRef = React.useRef();
    
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: cardHeaderRef.current.value,/* Значение инпута, полученное с помощью рефа */
            link: cardLinkRef.current.value,
        });
    }

    return (
        <PopupWithForm title='Новое место' name='addPlace' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} children={
            <>
                <input ref={cardHeaderRef} id="element-name-input" type="text" name="name" className="form__input form__input_element-name" placeholder="Название" required minLength="2" maxLength="40" />
                <span className="element-name-input-error form__input-error"></span>
                <input ref={cardLinkRef} id="picture-link-input" type="url" name="link" className="form__input form__input_picture-link" placeholder="Ссылка на картинку" required />
                <span className="picture-link-input-error form__input-error"></span>
                <button className="form__submit-button form__submit-button_add-element" type="submit">Создать</button>
            </>
        } />
    )
    
}
