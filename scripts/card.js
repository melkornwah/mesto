class Card {
  constructor(place, link, templateSelector) {
    this._title = place;
    this._image = link;
    this._templateSelector = templateSelector;
  };

  _getCardElement() {
    this._element = document
      .querySelector(this._templateSelector)
      .content
      .cloneNode(true);

    return this._element;
  };

  _handleLikeButton(evt) {
    evt.target.classList.toggle("button_action_like_active");
  };

  _handleDeleteButton(evt) {
    evt.target.parentElement.remove();
  };

  _setEventListeners(cardPhoto) {
    this._element.querySelector(".button_action_like").addEventListener("click", (evt) => {
      this._handleLikeButton(evt);
    });
    this._element.querySelector(".button_action_delete").addEventListener("click", (evt) => {
      this._handleDeleteButton(evt);
    });
  };

  generateCard() {
    this._getCardElement();

    const cardPhoto = this._element.querySelector(".element__photo");

    this._element.querySelector(".element__name").textContent = this._title;
    cardPhoto.src = this._image;
    cardPhoto.alt = this._title;

    this._setEventListeners(cardPhoto);

    return this._element;
  };
};

export default Card;
