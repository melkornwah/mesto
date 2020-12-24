export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._title = data.title;
    this._image = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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

  _handleDeleteButton(evt) {
    this._element.remove();
    this._element = null;
  };

  _setEventListeners(cardPhoto) {
    this._element.querySelector(".button_action_like").addEventListener("click", (evt) => {
      this._handleLikeButton(evt);
    });
    this._element.querySelector(".button_action_delete").addEventListener("click", (evt) => {
      this._handleDeleteButton(evt);
    });
    this._element.querySelector(".element__photo").addEventListener("click", () => {
      this._handleCardClick(this._image, this._title);
    });
  };

  generateCard() {
    this._element = this._getCardElement();

    const cardPhoto = this._element.querySelector(".element__photo");

    this._element.querySelector(".element__name").textContent = this._title;
    cardPhoto.src = this._image;
    cardPhoto.alt = this._title;

    this._setEventListeners(cardPhoto);

    return this._element;
  };
};
