import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main(props) {
    const { cardsArray, onCardLike, onCardDelete } = props;
    const currentUser = React.useContext(CurrentUserContext);

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
                        return <Card key={card._id} cardClickCallback={props.onCardClick} card={card} onCardLike={onCardLike} onCardDelete={onCardDelete} />;
                    }
                    )}
                </section>
            ) : null}
        </main>
    );
}

