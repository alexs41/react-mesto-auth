import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { api } from '../utils/api';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

import React, { useState, useEffect } from 'react';

export default function App() {
    const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
    const [isImagePopupOpen, setImagePopupState] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});

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
    
    const [cardsArray, setCardsArray] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                let initialCards = await api.getInitialCards();
                initialCards = initialCards.map((card) => ({
                link: card.link,
                alt: card.name,
                name: card.name,
                _id: card._id,
                likes: card.likes,
                owner: {
                    _id: card.owner._id,
                }, 
            }));
            setCardsArray(initialCards);
            } catch (err) {
                console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
            }
        })();
    }, []);

    async function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        // Отправляем запрос в API и получаем обновлённые данные карточки
        try {
            const newCard = await api.changeLikeCardStatus(card, isLiked);
            setCardsArray((state) => state.map((c) => c._id === card._id ? newCard : c));
        } catch (err) {
            console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
        }
    }

    async function handleCardDelete (card) {
        try {
            await api.deleteCard(card);
            setCardsArray(cardsArray.filter(item => item._id !==card._id));
        } catch (err) {
            console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
        }
    }
    
    function handleEscClose(e) {
        if (e.key === 'Escape') {
            closeAllPopups();
        }
    }

    async function handleUpdateUser(user) {
        try {
            await api.editUser(user);
            setCurrentUser(user);
            closeAllPopups();
        } catch (err) {
            console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
        }
    }

    async function handleUpdateAvatar(user) {
        try { 
            await api.editAvatar(user);
            setCurrentUser(user);
            closeAllPopups();
        } catch (err) {
            console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
        }
    }

    async function handleAddPlaceSubmit(card) {
        try {
            const newCard = await api.addCard(card);
            setCardsArray([newCard, ...cardsArray]);
            closeAllPopups();
        } catch (err) {
            console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
        } 
    }

    useEffect(() => {
        (async () => {
            try {
                const userData = await api.getUser();
                setCurrentUser(userData);
            } catch (err) {
                console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
            }
        })();
    }, [currentUser.name, currentUser.about, currentUser.avatar]);
    
    return (
        <div className="App">
            <CurrentUserContext.Provider value={currentUser}>
                <div className="root">
                    <Header />
                    <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} cardsArray={cardsArray} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
                    <Footer />

                    <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onEscClose={handleEscClose} onUpdateAvatar={handleUpdateAvatar} />
                    <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onEscClose={handleEscClose} onUpdateUser={handleUpdateUser} />
                    <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onEscClose={handleEscClose} onAddPlace={handleAddPlaceSubmit} />
                    
                    <PopupWithForm title='Вы уверены?' name='confirm' /*isOpen={}*/ onClose={closeAllPopups} onEscClose={handleEscClose} children={
                        <>
                            <button className="form__submit-button form__submit-button_confirm" type="submit">Да</button>
                        </>
                    } />
                    <ImagePopup name='imagePopup' card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} onEscClose={handleEscClose}/>
                </div>
            </CurrentUserContext.Provider>
        </div>
    );
}
