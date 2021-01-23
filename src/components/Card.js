export default class Card {
  constructor(data, templateSelector, handleCardClick, deleteCardPopup, apiRequests, userInfo) {
    this._data = data
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._deleteCardPopup = deleteCardPopup;
    this._apiRequests = apiRequests;
    this._userInfo = userInfo;
  };

  _getCardElement() {
    return this._element = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".element")
      .cloneNode(true);
  };

  _getCardLikesElement() {
    return this._element.querySelector(".element__like-counter");
  }

  _refreshLikes(card) {
    let likeNumber = Number(this._getCardLikesElement().textContent);

    likeNumber = card.likes.length;

    this._getCardLikesElement().textContent = likeNumber;
  }

  _handleLikeButton(evt, counter) {
    evt.target.classList.toggle("button_action_like_active");

    if (evt.target.classList.contains("button_action_like_active")) {
      this._apiRequests.likeCard(this._data)
        .then((card) => {
          this._refreshLikes(card);
        })
        .catch((err) => {
          console.log(err);
        })
    } else {
      this._apiRequests.dislikeCard(this._data)
        .then((card) => {
          this._refreshLikes(card);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  _deleteCardElement() {
    this._element.remove();
    this._element = null;

    this._deleteCardPopup.close();
  }

  _setEventListeners(cardPhoto, likeCardButton, counter, deleteCardButton) {
    likeCardButton.addEventListener("click", (evt) => {
      this._handleLikeButton(evt, counter);
    });
    deleteCardButton.addEventListener("click", () => {
      this.handleDeleteClick();
    });
    cardPhoto.addEventListener("click", () => {
      this._handleCardClick(this._data.link, this._data.name);
    });
  };

  handleDeleteClick () {
    this._deleteCardPopup.handleSubmit = () => {
      this._apiRequests.deleteCard(this._data, this._creator)
        .then(() => {
          this._deleteCardElement();
        })
        .catch((err) => {
          console.log(err);
        })
    };

    this._deleteCardPopup.open();
  }

  generateCard() {
    this._element = this._getCardElement();

    let cardLikes = this._getCardLikesElement();

    const counter = this._data.likes.length;
    cardLikes.textContent = this._data.likes.length;

    const deleteCardButton = this._element.querySelector(".button_action_delete");

    const likeCardButton = this._element.querySelector(".button_action_like");

    const cardPhoto = this._element.querySelector(".element__photo");

    this._element.querySelector(".element__name").textContent = this._data.name;
    cardPhoto.src = this._data.link;
    cardPhoto.alt = this._data.name;

    this._setEventListeners(cardPhoto, likeCardButton, counter, deleteCardButton);

    const userId = this._userInfo.getUserId();

    this._data.likes.forEach(like => {
      if (like._id === userId) {
        likeCardButton.classList.add("button_action_like_active");
      }
    });
    if (!(this._data.owner._id === userId)) {
      this._element.querySelector(".button_action_delete").remove();
    }

    return this._element;
  };
};


