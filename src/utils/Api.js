class Api {
    constructor(config){
        this._url = config.url;
        this._headers = config.headers;
    }
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    getUser = () => {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
        .then(this._checkResponse);
    }
    editUser = (user) => {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: user.name,
                about: user.about,
            })
        })
        .then(this._checkResponse);
    }
    getInitialCards = () => {
        return fetch(`${this._url}/cards`, {
                headers: this._headers
            })
            .then(this._checkResponse);
    }
    addCard = (card) => {
        return fetch(`${this._url}/cards`, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                  name: card.name,
                  link: card.link
                })
            })
            .then(this._checkResponse);
    }
    deleteCard = (card) => {
        return fetch(`${this._url}/cards/${card._id}`, {
                method: 'DELETE',
                headers: this._headers,
            })
            .then(this._checkResponse);
    }
    likeCard = (card) => {
        return fetch(`${this._url}/cards/${card._id}/likes`, {
                method: 'PUT',
                headers: this._headers,
                })
                .then(this._checkResponse);
    }
    disLikeCard = (card) => {
        return fetch(`${this._url}/cards/${card._id}/likes`, {
                method: 'DELETE',
                headers: this._headers,
            })
            .then(this._checkResponse);
    }
    changeLikeCardStatus = (card, isLiked) => {
        return (isLiked ? this.disLikeCard(card) : this.likeCard(card));
    }

    editAvatar = (user) => {
        return fetch(`${this._url}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: user.avatar,
                })
            })
            .then(this._checkResponse);
    }
}
const apiConfig = {
    url: "https://mesto.nomoreparties.co/v1/cohort-48",
    headers: {
      "content-type": "application/json",
      authorization: "6ecd8953-f40f-4499-9406-375b67b7dc1f"
    }
  }

export const api = new Api(apiConfig);