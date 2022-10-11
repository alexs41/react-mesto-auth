import React, { useEffect, useState } from 'react';
import { api } from '../utils/Api.js';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main(props) {
    const [cardsArray, setCardsArray] = useState([]);
    const currentUser = React.useContext(CurrentUserContext);
    // debugger;
    useEffect(() => {
        Promise.all([api.getInitialCards()])
            .then(([initialCards]) => {
                // и тут отрисовка карточек
                initialCards = initialCards.map((card) => ({
                    link: card.link,
                    alt: card.name,
                    name: card.name,
                    id: card._id,
                    likes: card.likes,
                    owner: {
                        _id: card.owner._id,
                    }, 
                }));
                initialCards = initialCards.reverse();
                setCardsArray(initialCards);
            })
            .catch(err => console.error('Произошла ошибка!', err));
    }, []);

    // useEffect(() => {
    //     Promise.all([api.getUser(), api.getInitialCards()])
    //         .then(([userData, initialCards]) => {
    //             // тут установка данных пользователя
    //             setUserName(userData.name);
    //             setUserDescription(userData.about);
    //             setUserAvatar(userData.avatar);
    //             // и тут отрисовка карточек
    //             initialCards = initialCards.map((card) => ({
    //                 link: card.link,
    //                 alt: card.name,
    //                 name: card.name,
    //                 id: card._id,
    //                 likes: card.likes,
    //             }));
    //             initialCards = initialCards.reverse();
    //             setCardsArray(initialCards);
    //         })
    //         .catch(err => console.error('Произошла ошибка!', err));
    // }, []);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile-info">
                    <div className="profile-info__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }} onClick={() => props.onEditAvatar()}>
                    </div>
                    <div className="profile-info-container">
                        <div className="profile-text-info">
                            <h3 className="profile-text-info__full-name">{currentUser.name}</h3>
                            <p className="profile-text-info__description">{currentUser.about}</p>
                        </div>
                        <button className="profile-info-container__edit-button" type="button" onClick={() => props.onEditProfile()}></button>
                    </div>
                </div>
                <button className="profile__add-button" type="button" onClick={() => props.onAddPlace()}></button>
            </section>

            { cardsArray ? (
                <section className="elements">
                    {cardsArray.map(card => {
                        return <Card key={card.id} cardClickCallback={props.onCardClick} card={card}/>;
                    }
                    )}
                </section>
            ) : null}
        </main>
    );
  }

