import creator from "../utils/constants.js"

export default class Api {
  constructor({ baseURL, headers }) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  loadInitialCards(cardList, createCard, creator) {
    fetch(`${this._baseURL}/cards`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
            .then((cards) => {
              cards.forEach(card => {
                cardList.loadInitial(createCard(card, card.likes.length, (card.owner._id === creator)));
              })
          })
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })

  }

  getUserInfo(userProfile) {
    fetch(`${this._baseURL}/users/me`, {
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json()
          .then((user) => {
            userProfile.name.textContent = user.name;
            userProfile.job.textContent = user.about;
            userProfile.avatar.src = user.avatar;
            console.log(user);
          });
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
  }

  updateUserInfo(formData) {
    fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: formData.name,
        about: formData.job
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
  }

  postCard(formData) {
    fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: formData.name,
        link: formData.link
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
  }

  deleteCard(card) {
    const data = card;

    fetch(`${this._baseURL}/cards/${data._id}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
  }

  likeCard(card) {
    fetch(`${this._baseURL}/cards/likes/${card._id}`, {
      method: "PUT",
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
  }

  dislikeCard(card) {
    fetch(`${this._baseURL}/cards/likes/${card._id}`, {
      method: "DELETE",
      headers: this._headers
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
  }

  patchAvatar(image) {
    fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: image
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
  }
}
