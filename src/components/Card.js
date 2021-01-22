export default class Card {
  constructor(data, templateSelector, handleCardClick, deleteCardPopup, apiRequests, creator) {
    this._data = data
    this._title = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._deleteCardPopup = deleteCardPopup;
    this._apiRequests = apiRequests;
    this._creator = creator;
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

  _addLike(counter) {
    let likeNumber = Number(this._getCardLikesElement().textContent);

    likeNumber = counter + 1;

    this._getCardLikesElement().textContent = likeNumber;
  }

  _dislikeCard(counter) {
    let likeNumber = Number(this._getCardLikesElement().textContent);

    likeNumber = counter;

    this._getCardLikesElement().textContent = likeNumber;
  }

  _handleLikeButton(evt, counter) {
    evt.target.classList.toggle("button_action_like_active");

    if (evt.target.classList.contains("button_action_like_active")) {
      this._apiRequests.likeCard(this._data);
      this._addLike(counter);
    } else {
      this._apiRequests.dislikeCard(this._data);
      this._dislikeCard(counter);
    }
  }

  _deleteCardElement() {
    this._element.remove();
    this._element = null;

    this._deleteCardPopup.close();
    this._deleteCardPopup.removeEventListeners();
  }

  _setEventListeners(cardPhoto, counter) {
    this._element.querySelector(".button_action_like").addEventListener("click", (evt) => {
      this._handleLikeButton(evt, counter);
    });
    this._element.querySelector(".button_action_delete").addEventListener("click", () => {
      this.handleDeleteClick();
    });
    this._element.querySelector(".element__photo").addEventListener("click", () => {
      this._handleCardClick(this._image, this._title);
    });
  };

  handleDeleteClick () {
    this._deleteCardPopup.handleSubmit = () => {
      this._apiRequests.deleteCard(this._data, this._creator);

      this._deleteCardElement();
    };

    this._deleteCardPopup.open();

    this._deleteCardPopup.setEventListeners();
  }

  generateCard(counter, creator) {
    this._element = this._getCardElement();

    let cardLikes = this._getCardLikesElement();
    cardLikes.textContent = counter;

    const cardPhoto = this._element.querySelector(".element__photo");

    this._element.querySelector(".element__name").textContent = this._title;
    cardPhoto.src = this._image;
    cardPhoto.alt = this._title;

    this._setEventListeners(cardPhoto, counter);

    if (!creator) {
      this._element.querySelector(".button_action_delete").remove();
    }

    return this._element;
  };
};


