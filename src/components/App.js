import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import PopupWithForm from './PopupWithForm.js';

import React, { useState } from 'react';

export default function App() {
    const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
    const [isImagePopupOpen, setImagePopupState] = useState(false);

    const [selectedCard, setSelectedCard] = useState(null);

    const handleEditAvatarClick = () => setEditAvatarPopupState(true);
    const handleEditProfileClick = () => setEditProfilePopupState(true);
    const handleAddPlaceClick = () => setAddPlacePopupState(true);

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setImagePopupState(true);
    };
   
    const closeAllPopups = () => {
        setEditAvatarPopupState(false);
        setEditProfilePopupState(false);
        setAddPlacePopupState(false);

        setImagePopupState(false);
        setSelectedCard(null);
    }

    return (
        <div className="App">
            <div className="root">
                <Header />
                <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} />
                <Footer />
                <PopupWithForm title='Обновить аватар' name='editAvatar' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} children={
                    <>
                        <input id="avatar-link-input" type="url" name="avatar" className="form__input form__input_avatar-link" placeholder="Ссылка на новый аватар" required />
                        <span className="avatar-link-input-error form__input-error"></span>
                        <button className="form__submit-button form__submit-button_edit-avatar" type="submit">Сохранить</button>
                    </>
                } />
                <PopupWithForm title='Редактировать профиль' name='editProfile' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} children={
                    <>
                        <input id="full-name-input" type="text" name="name" className="form__input form__input_full-name" placeholder="Имя" required minLength="2" maxLength="40" />
                        <span className="full-name-input-error form__input-error"></span>
                        <input id="description-input" type="text" name="about" className="form__input form__input_description" placeholder="Профессия" required minLength="2" maxLength="200" />
                        <span className="description-input-error form__input-error"></span>
                        <button className="form__submit-button form__submit-button_edit-profile" type="submit">Сохранить</button>
                    </>
                } />
                <PopupWithForm title='Новое место' name='addPlace' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} children={
                    <>
                        <input id="element-name-input" type="text" name="name" className="form__input form__input_element-name" placeholder="Название" required minLength="2" maxLength="40" />
                        <span className="element-name-input-error form__input-error"></span>
                        <input id="picture-link-input" type="url" name="link" className="form__input form__input_picture-link" placeholder="Ссылка на картинку" required />
                        <span className="picture-link-input-error form__input-error"></span>
                        <button className="form__submit-button form__submit-button_add-element" type="submit">Создать</button>
                    </>
                } />
                <PopupWithForm title='Вы уверены?' name='confirm' /*isOpen={}*/ onClose={closeAllPopups} children={
                    <>
                        <button className="form__submit-button form__submit-button_confirm" type="submit">Да</button>
                    </>
                } />
                <ImagePopup name='imagePopup' card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen}/>
            </div>
        </div>
    );
}
