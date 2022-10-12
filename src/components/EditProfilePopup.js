import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function EditProfilePopup (props) {
    const {isOpen, onClose, onEscClose, onUpdateUser } = props;

    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]); 

    // Обработчик изменения инпута обновляет стейт
    function handleChangeName(e) {
        setName(e.target.value);
        // console.log(`name: ${name}`);
    }
    function handleChangeDescription(e) {
        setDescription(e.target.value);
        // console.log(`description: ${description}`);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
          name,
          about: description,
        });
      }

    return (
        <PopupWithForm title='Редактировать профиль' name='editProfile' isOpen={isOpen} onClose={onClose} onEscClose={onEscClose} onSubmit={handleSubmit} children={
            <>
                <input id="full-name-input" type="text" name="name" className="form__input form__input_full-name" placeholder="Имя" required minLength="2" maxLength="40" value={name} onChange={handleChangeName} />
                <span className="full-name-input-error form__input-error"></span>
                <input id="description-input" type="text" name="about" className="form__input form__input_description" placeholder="Профессия" required minLength="2" maxLength="200" value={description} onChange={handleChangeDescription} />
                <span className="description-input-error form__input-error"></span>
                <button className="form__submit-button form__submit-button_edit-profile" type="submit">Сохранить</button>
            </>
        } />
    )
}