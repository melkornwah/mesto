export default class Card {
  constructor(data, templateSelector, handleCardClick, handleDeleteClick) {
    this._title = data.name;
    this._image = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
  };

  _getCardElement() {
    return this._element = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".element")
      .cloneNode(true);
  };

  _handleLikeButton(evt) {
    evt.target.classList.toggle("button_action_like_active");
  };

  _setEventListeners(cardPhoto) {
    this._element.querySelector(".button_action_like").addEventListener("click", (evt) => {
      this._handleLikeButton(evt);
    });
    this._element.querySelector(".button_action_delete").addEventListener("click", () => {
      this._handleDeleteClick();
    });
    this._element.querySelector(".element__photo").addEventListener("click", () => {
      this._handleCardClick(this._image, this._title);
    });
  };

  generateCard(counter) {
    this._element = this._getCardElement();

    const cardLikes = this._element.querySelector(".element__like-counter");
    cardLikes.textContent = counter;

    const cardPhoto = this._element.querySelector(".element__photo");

    this._element.querySelector(".element__name").textContent = this._title;
    cardPhoto.src = this._image;
    cardPhoto.alt = this._title;

    this._setEventListeners(cardPhoto);

    return this._element;
  };
};
