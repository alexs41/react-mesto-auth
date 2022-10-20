import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

export default function EditAvatarPopup (props) {
    const {isOpen, onClose, onUpdateAvatar } = props;

    const avatarLinkRef = React.useRef();
    
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
          avatar: avatarLinkRef.current.value, /* Значение инпута, полученное с помощью рефа */
        });
    }

    useEffect(() => {
        if (isOpen) avatarLinkRef.current.value = '';
      }, [isOpen]);

    return (
        <PopupWithForm title='Обновить аватар' name='editAvatar' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} children={
            <>
                <input ref={avatarLinkRef} id="avatar-link-input" type="url" name="avatar" className="form__input form__input_avatar-link" placeholder="Ссылка на новый аватар" required />
                <span className="avatar-link-input-error form__input-error"></span>
                <button className="form__submit-button form__submit-button_edit-avatar" type="submit">Сохранить</button>
            </>
        } />
    )
    
}
