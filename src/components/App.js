import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import ImagePopup from './ImagePopup.js';

import React, { useState } from 'react';

function App() {
    const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);

    const handleEditAvatarClick = () => {
        setEditAvatarPopupState(true);
        // const popupEditAvatar = document.querySelector('.popup_edit-avatar');
        // popupEditAvatar.classList.add('popup_opened');
    };
    const classNamePopupEditAvatar = `popup popup_edit-avatar ${isEditAvatarPopupOpen ? 'popup_opened' : ''}`;
    const classNamePopupEditProfile = `popup popup_edit-profile ${isEditProfilePopupOpen ? 'popup_opened' : ''}`;
    const classNamePopupAddPlace = `popup popup_add-element ${isAddPlacePopupOpen ? 'popup_opened' : ''}`;


    const handleEditProfileClick = () => {
        setEditProfilePopupState(true);
        // const popupEditProfile = document.querySelector('.popup_edit-profile');
        // popupEditProfile.classList.add('popup_opened');
    };

    const handleAddPlaceClick = () => {
        setAddPlacePopupState(true);
        // const popupAddPlace = document.querySelector('.popup_add-element');
        // popupAddPlace.classList.add('popup_opened');
    }
    

    return (
        <div className="App">
            <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Mesto</title>
            </head>
            <body>
                <div className="root">
                    <Header />
                    <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} />
                    <Footer />
                    {/* <ImagePopup /> */}
                    <div className={classNamePopupEditProfile}>
                        <div className="popup__container">
                            <form className="form form_edit-profile" novalidate>
                                <h3 className="form__header">Редактировать профиль</h3>
                                <input id="full-name-input" type="text" name="name" className="form__input form__input_full-name" placeholder="Имя" required minlength="2" maxlength="40" />
                                <span className="full-name-input-error form__input-error"></span>

                                <input id="description-input" type="text" name="about" className="form__input form__input_description" placeholder="Профессия" required minlength="2" maxlength="200" />
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
                                <input id="element-name-input" type="text" name="name" className="form__input form__input_element-name" placeholder="Название" required minlength="2" maxlength="40" />
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
                    </div>

                    <template className="element_template" id="element_template">
                        <div className="element">
                            <img src="src/images/dombai.jpg" alt="Домбай" className="element__image" />
                            <h4 className="element__header"></h4>
                            <div className="like-container">
                                <button className="like-container__like-button" type="button"></button> 
                                <p className="like-container__like-count"></p>
                            </div>
                            <button className="element__trash-button" type="button"></button>
                        </div>
                    </template>
                </div>
            </body>
        </div>
    );
}

export default App;
