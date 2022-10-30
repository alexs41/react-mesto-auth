import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import { api } from '../utils/api';
import { Route, Switch, Redirect, useHistory, useLocation, Link } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Login from './Login';
import * as auth from '../auth.js';
import InfoTooltip from './InfoTooltip.js'
import React, { useState, useEffect } from 'react';
import Register from './Register';
import successIcon from '../images/success-icon.svg';
import failIcon from '../images/fail-icon.svg';

import bugerIcon from '../images/burger.svg';
import closeIcon from '../images/close-icon.svg'

export default function App() {
    const successText = 'Вы успешно зарегистрировались!';
    const failText = 'Что-то пошло не так! Попробуйте ещё раз.';

    const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupState] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
    const [isImagePopupOpen, setImagePopupState] = useState(false);
    const [isConfirmDeletePopupOpen, setConfirmDeletePopupOpen] = useState(false);

    const [cardForDelete, setCardForDelete] = useState({});

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
    const location = useLocation();

    useEffect(() => {
        checkToken();
      }, []);
    
    const handleLogin = async (password, email) => {
        try {
            const data = await auth.authorize(password, email);
            if (!data.token) throw new Error('Missing token');
            localStorage.setItem('token', data.token);
            setLoggedIn(true);
            setUserData({
                email: email
            });
            history.push(`/`);
        } catch (err) {
            console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
        }
    };
    
    const handleLogout = () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
        history.push('/sign-in');
    }
    
    const checkToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return;
        try {
            const { data } = await auth.getContent(token);
            setLoggedIn(true);
            setUserData({
                email: data.email
            });
            history.push('/');
        } catch (err) {
            console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
        }
    };
    //---------------------------------- ПР12 -----------------------------

    const handleEditAvatarClick = () => setEditAvatarPopupState(true);
    const handleEditProfileClick = () => setEditProfilePopupState(true);
    const handleAddPlaceClick = () => setAddPlacePopupState(true);
    const handleDeleteButtonClick = (card) => {
        setCardForDelete(card);
        setConfirmDeletePopupOpen(true);
    }

    const infoTooltipOpen = () => {
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
        setConfirmDeletePopupOpen(false);
    }
    
    const [cardsArray, setCardsArray] = useState([]);

    async function renderInitialCards() {
        try {
            let initialCards = await api.getInitialCards();
            // при объявлении initialCards как const карточки не отрисовываются
            // и выдает ошибку Ошибка! TypeError: Assignment to constant variable.
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
        if (loggedIn) {(async () => {
            try {
                await Promise.all([
                    renderInitialCards(),
                    renderInitialUserData(),
                ])
            } catch (err) {
                console.log(`Ошибка! ${err}`); // выведем ошибку в консоль
            }
        })();}
    }, [loggedIn]);

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
            closeAllPopups();
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
            const data = await auth.register(email, password);
            history.push('/sign-in');
            if (data.data._id) {
                setRegisterPopup({
                    iconPath: successIcon,
                    infoText: successText
                });
            } else {
                setRegisterPopup({
                    iconPath: failIcon,
                    infoText: failText
                });
            }
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
    const [headerLoginInfo, setHeaderLoginInfo] = useState('');
    const [preheader, setPreheader] = useState('');
    const [isPreheaderVisible, setIsPreheaderVisible] = useState(false);

    function togglePreheader() {
        setIsPreheaderVisible((state) => {
            if (state) {
                return false;
            } else {
                return true;
            }
        });
    }

    // function preheaderUpdate() {
    //     if (location.pathname === '/' || location.pathname === '') {
    //         // main
    //         setPreheader(
    //               <div className="subheader" style={{display: isPreheaderVisible  ? 'flex' : 'none'}}>
    //                 <p className="header-login-info__email subheader__email">{userData.email}</p>
    //                 <button className="header-login-info__button subheader__button" type="button" onClick={handleLogout} style={{ textDecoration: 'none' }} >Выйти</button>
    //             </div>
    //         );
    //     } else {
    //         setPreheader('');
    //     }
    // }

    function headerLoginInfoUpdate() {
        if (location.pathname === '/' || location.pathname === '') {
            // main
            setPreheader(
                <div className="subheader" style={{display: isPreheaderVisible  ? 'flex' : 'none'}}>
                  <p className="header-login-info__email subheader__email">{userData.email}</p>
                  <button className="header-login-info__button subheader__button" type="button" onClick={handleLogout} style={{ textDecoration: 'none' }} >Выйти</button>
              </div>
            );
            setHeaderLoginInfo(
                <>  
                    <div className="header-login-info">
                        <p className="header-login-info__email">{userData.email}</p>
                        <button className="header-login-info__button" type="button" onClick={handleLogout} style={{ textDecoration: 'none' }}>Выйти</button>
                    </div>
                    <button className="header__burger" type="button" onClick={togglePreheader} style={{ backgroundImage: isPreheaderVisible ? `url(${closeIcon})` : `url(${bugerIcon})` }}></button>
                </>
            );
        } else if (location.pathname === '/sign-in') {
            // login
            setPreheader('');
            setHeaderLoginInfo(
                <Link className="header__link link" to="/sign-up" style={{ textDecoration: 'none' }}>Регистрация</Link>
            );
        } else if (location.pathname === '/sign-up') {
            // register
            setPreheader('');
            setHeaderLoginInfo(
                <Link to="/sign-in" className="header__link link" style={{ textDecoration: 'none' }}>Войти</Link>
            );
        }
   }

    useEffect(() => {
        headerLoginInfoUpdate();
        // preheaderUpdate();
    }, [location.pathname, isPreheaderVisible, window.innerWidth]);

    return (
        <div className="App">
            <div className="root">
            <CurrentUserContext.Provider value={currentUser}>
                    <Header onLogout={handleLogout} children={headerLoginInfo} childrenPreheader={preheader} />
                    <Switch>
                        <Route path="/sign-in">
                            <Login onLogin={handleLogin} />
                        </Route>
                        <Route path="/sign-up">
                            <Register onRegister={handleRegister} />
                        </Route>
                        <ProtectedRoute exact path="/" loggedIn={loggedIn}>
                            <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} cardsArray={cardsArray} onCardLike={handleCardLike} onCardDelete={handleDeleteButtonClick} />
                            {/* onCardDelete={handleCardDelete} */}
                            <Footer />
                            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
                            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                            
                            <ImagePopup name='imagePopup' card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
                            <ConfirmDeletePopup card={cardForDelete} isOpen={isConfirmDeletePopupOpen} onClose={closeAllPopups} onDeleteCard={handleCardDelete} />

                            {/* <PopupWithForm title='Обновить аватар' name='editAvatar' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} children={
                                    <>
                                        <input ref={avatarLinkRef} id="avatar-link-input" type="url" name="avatar" className="form__input form__input_avatar-link" placeholder="Ссылка на новый аватар" required />
                                        <span className="avatar-link-input-error form__input-error"></span>
                                        <button className="form__submit-button form__submit-button_edit-avatar" type="submit">Сохранить</button>
                                    </>
                                } /> */}
                        </ProtectedRoute>
                        <Route>
                            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
                        </Route>
                    </Switch>
                    <InfoTooltip infoTooltipOpen={infoTooltipOpen} isOpen={isInfoTooltipOpen} onClose={closeAllPopups} iconPath={registerPopup.iconPath} infoText={registerPopup.infoText} />
            </CurrentUserContext.Provider>
            </div>
        </div>
    );
}
