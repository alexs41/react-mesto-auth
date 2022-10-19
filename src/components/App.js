import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { api } from '../utils/api';
import { BrowserRouter as Router, Route, Switch, Link, Redirect, useHistory } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Login from './Login';
import * as auth from '../auth.js';
import InfoTooltip from './InfoTooltip.js'

import React, { useState, useEffect } from 'react';
import Register from './Register';
// import InfoTooltip from './InfoTooltip'
import successIcon from '../images/success-icon.svg';
import failIcon from '../images/fail-icon.svg'


export default function App() {
    const successText = 'Вы успешно зарегистрировались!';
    const failText = 'Что-то пошло не так! Попробуйте ещё раз.';

    const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
    const [isImagePopupOpen, setImagePopupState] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    //---------------------------------- ПР12 -----------------------------
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState({
        password: '',
        email: ''
    });

    const [registerPopup, setRegisterPopup] = useState({
        iconPath: '',
        infoText: ''
    });

    const history = useHistory();

    useEffect(() => {
        tokenCheck();
      }, []);
    
    const handleLogin = (password, email) => {
        return auth.authorize(password, email)
                .then((data) => {
                if (!data.token) throw new Error('Missing token');
                localStorage.setItem('token', data.token);
                debugger;
                setLoggedIn(true);
                setUserData({
                    email: email
                })
                history.push(`/`);
            });
    };
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        history.push('/sign-in');
    }
    
    const tokenCheck = () => {
        const token = localStorage.getItem('token');
    
        if (!token) return;
    
        auth.getContent(token).then(({ data }) => {
          setLoggedIn(true);
          setUserData({
            email: data.email
          })
          history.push('/');
        });
    };
    //---------------------------------- ПР12 -----------------------------

    const handleEditAvatarClick = () => setEditAvatarPopupState(true);
    const handleEditProfileClick = () => setEditProfilePopupState(true);
    const handleAddPlaceClick = () => setAddPlacePopupState(true);
    const infoTooltipOpen = () => {
        debugger;
        setIsInfoTooltipOpen(true);
    }

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

        setIsInfoTooltipOpen(false);
    }
    
    const [cardsArray, setCardsArray] = useState([]);

    async function renderInitialCards() {
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
    }

    async function renderInitialUserData() {
        try {
            const userData = await api.getUser();
            setCurrentUser(userData);
        } catch (err) {
            console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
        }
    }
    useEffect(() => {
        (async () => {
            try {
                await Promise.all([
                    renderInitialCards(),
                    renderInitialUserData(),
                ])
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

    async function handleUpdateUser(user) {
        try {
            const newUser = await api.editUser(user);
            setCurrentUser(newUser);
            closeAllPopups();
        } catch (err) {
            console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
        }
    }

    async function handleUpdateAvatar(user) {
        try { 
            const newUser = await api.editAvatar(user);
            setCurrentUser(newUser);
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
    async function handleRegister (email, password) {
        try { 
            debugger;
            const data = await auth.register(email, password);
            history.push('/sign-in');
            debugger;
            if (data.data._id) {
                debugger;
                setRegisterPopup({
                    iconPath: successIcon,
                    infoText: successText
                });
            } else {
                debugger;
                setRegisterPopup({
                    iconPath: failIcon,
                    infoText: failText
                });
            }
            console.log(password, email);
        } catch (err) {
            setRegisterPopup({
                iconPath: failIcon,
                infoText: failText
            });
            console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
            return err;
        } finally {
            infoTooltipOpen();
        }
    };

    return (
        <div className="App">
            <div className="root">
            <CurrentUserContext.Provider value={currentUser}>
                {/* <div className="root"> */}
                {/* <Router> */}
                    <Switch>
                        <Route path="/sign-in">
                            <Login onLogin={handleLogin} />
                        </Route>
                        <Route path="/sign-up">
                            <Register onRegister={handleRegister} />
                        </Route>
                        <ProtectedRoute exact path="/" loggedIn={loggedIn}>
                            <Header onLogout={handleLogout} children={
                                <div className="header-login-info">
                                    <p className="header-login-info__email">{userData.email}</p>
                                    <button className="header-login-info__button" type="button" onClick={handleLogout} style={{ textDecoration: 'none' }}>Выйти</button>
                                </div>
                            }/>
                            <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} cardsArray={cardsArray} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
                            <Footer />
                            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                            
                            <PopupWithForm title='Вы уверены?' name='confirm' /*isOpen={}*/ onClose={closeAllPopups} children={ <>
                                    <button className="form__submit-button form__submit-button_confirm" type="submit">Да</button>
                                </>} />
                            <ImagePopup name='imagePopup' card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
                        </ProtectedRoute>
                        <Route>
                            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                        </Route>
                        
                        {/* isOpen={isInfoTooltipOpen}  */}
                    </Switch>
                    <InfoTooltip infoTooltipOpen={infoTooltipOpen} isOpen={isInfoTooltipOpen} onClose={closeAllPopups} iconPath={registerPopup.iconPath} infoText={registerPopup.infoText} />
                {/* </Router> */}
                {/* </div> */}
            </CurrentUserContext.Provider>
            </div>
            
        </div>
    );
}
