import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';
import PopupWithForm from './PopupWithForm.js';

import React, { useState } from 'react';

function App() {
    const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
    const [isImagePopupOpen, setImagePopupState] = useState(false);

    const [selectedCard, setSelectedCard] = useState(null);

    const handleEditAvatarClick = () => setEditAvatarPopupState(true);
    const handleEditProfileClick = () => setEditProfilePopupState(true);
    const handleAddPlaceClick = () => setAddPlacePopupState(true);

    const handleCardClick = (card) => {
        // debugger;
        setSelectedCard(card);
        // setSelectedCard(true);
        // debugger;
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

                <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen}/>
                {/* <div className={classNamePopupEditProfile}>
                    <div className="popup__container">
                        <form className="form form_edit-profile" novalidate>
                            <h3 className="form__header">Редактировать профиль</h3>
                            <input id="full-name-input" type="text" name="name" className="form__input form__input_full-name" placeholder="Имя" required minLength="2" maxLength="40" />
                            <span className="full-name-input-error form__input-error"></span>

                            <input id="description-input" type="text" name="about" className="form__input form__input_description" placeholder="Профессия" required minLength="2" maxLength="200" />
                            <span className="description-input-error form__input-error"></span>
                            <button className="form__submit-button form__submit-button_edit-profile" type="submit">Сохранить</button>
                            <button className="popup__close-button" type="button"></button>
                        </form>
                    </div>
                </div>
                <div className={classNamePopupAddPlace}>
                    <div className="popup__container">
                        <form className="form form_add-element">
                            <h3 className="form__header">Новое место</h3>
                            <input id="element-name-input" type="text" name="name" className="form__input form__input_element-name" placeholder="Название" required minLength="2" maxLength="40" />
                            <span className="element-name-input-error form__input-error"></span>

                            <input id="picture-link-input" type="url" name="link" className="form__input form__input_picture-link" placeholder="Ссылка на картинку" required />
                            <span className="picture-link-input-error form__input-error"></span>

                            <button className="form__submit-button form__submit-button_add-element" type="submit">Создать</button>
                            <button className="popup__close-button" type="button"></button>
                        </form>
                    </div>
                </div>
                <div className="popup popup_element-image">
                    <div className="popup__container">
                        <figure className="figure">
                            <img className="figure__image" />
                            <figcaption className="figure__caption">Подпись к фото</figcaption>
                            <button className="popup__close-button" type="button"></button>
                        </figure>
                    </div>
                </div>
                <div className="popup popup_confirm">
                    <div className="popup__container">
                        <form className="form form_confirm-delete">
                            <h3 className="form__header">Вы уверены?</h3>
                            <button className="form__submit-button form__submit-button_confirm" type="submit">Да</button>
                            <button className="popup__close-button" type="button"></button>
                        </form>
                    </div>
                </div>

                <div className={classNamePopupEditAvatar}>
                    <div className="popup__container">
                        <form className="form form_edit-avatar" novalidate>
                            <h3 className="form__header">Обновить аватар</h3>

                            <input id="avatar-link-input" type="url" name="avatar" className="form__input form__input_avatar-link" placeholder="Ссылка на новый аватар" required />
                            <span className="avatar-link-input-error form__input-error"></span>

                            <button className="form__submit-button form__submit-button_edit-avatar" type="submit">Сохранить</button>
                            <button className="popup__close-button" type="button"></button>
                        </form>
                    </div>
                </div> */}

                {/* <template className="element_template" id="element_template">
                    <div className="element">
                        <img src="src/images/dombai.jpg" alt="Домбай" className="element__image" />
                        <h4 className="element__header"></h4>
                        <div className="like-container">
                            <button className="like-container__like-button" type="button"></button> 
                            <p className="like-container__like-count"></p>
                        </div>
                        <button className="element__trash-button" type="button"></button>
                    </div>
                </template> */}
            </div>
        </div>
    );
}

export default App;
