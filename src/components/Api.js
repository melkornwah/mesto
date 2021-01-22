export default class Api {
  constructor({ baseURL, headers }) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  _getRequestResult(url, options) {
    return fetch(url, options)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      })
  }

  loadInitialCards() {
    return this._getRequestResult(`${this._baseURL}/cards`, {
      headers: this._headers
    });
  }

  getUserInfo() {
    return this._getRequestResult(`${this._baseURL}/users/me`, {
      headers: this._headers
    });
  }

  updateUserInfo(formData) {
    return this._getRequestResult(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: formData.name,
        about: formData.job
      })
    });
  }

  postCard(formData) {
    return this._getRequestResult(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: formData.name,
        link: formData.link
      })
    });
  }

  deleteCard(card) {
    return this._getRequestResult(`${this._baseURL}/cards/${card._id}`, {
      method: "DELETE",
      headers: this._headers
    });
  }

  likeCard(card) {
    return this._getRequestResult(`${this._baseURL}/cards/likes/${card._id}`, {
      method: "PUT",
      headers: this._headers
    });
  }

  dislikeCard(card) {
    return this._getRequestResult(`${this._baseURL}/cards/likes/${card._id}`, {
      method: "DELETE",
      headers: this._headers
    });
  }

  patchAvatar(image) {
    this._getRequestResult(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: image.link
      })
    });
  }
}
