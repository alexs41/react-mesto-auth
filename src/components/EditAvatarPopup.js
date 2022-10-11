import React, { useState, useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditAvatarPopup (props) {
    const {isOpen, onClose, onEscClose, onUpdateAvatar } = props;

    const avatarLinkRef = React.useRef();
    
    function handleSubmit(e) {
        e.preventDefault();
        debugger;
        onUpdateAvatar({
          avatar: avatarLinkRef.current.value, /* Значение инпута, полученное с помощью рефа */
        });
      }

    return (
        <PopupWithForm title='Обновить аватар' name='editAvatar' isOpen={isOpen} onClose={onClose} onEscClose={onEscClose} onSubmit={handleSubmit} children={
            <>
                <input ref={avatarLinkRef} id="avatar-link-input" type="url" name="avatar" className="form__input form__input_avatar-link" placeholder="Ссылка на новый аватар" required />
                <span className="avatar-link-input-error form__input-error"></span>
                <button className="form__submit-button form__submit-button_edit-avatar" type="submit">Сохранить</button>
            </>
        } />
    )
    
}