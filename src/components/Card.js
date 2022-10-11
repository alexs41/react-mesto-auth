import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card(props) {
    const { card,  cardClickCallback } = props;
    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;
    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = (
        `element__trash-button ${isOwn ? 'element__trash-button_visible' : 'element__trash-button_hidden'}`
    );

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `like-container__like-button ${isLiked ? 'like-container__like-button_active' : ''}`
    );

    function handleClick() {
        cardClickCallback(card);
      }

    return (
        <div className="element" id={card.id}>
            
            <img src={card.link} alt={card.name} className="element__image" onClick={() => handleClick()}/>
            <h4 className="element__header">{card.name}</h4>
            <div className="like-container">
                <button className={cardLikeButtonClassName} type="button"></button> 
                <p className="like-container__like-count">{card.likes.length}</p>
            </div>
            {/* <button className="element__trash-button" type="button"></button> */}
            <button className={cardDeleteButtonClassName} type="button"></button>
        </div>
    );
  }
    