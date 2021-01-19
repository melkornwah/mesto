import Popup from "./Popup.js";

export default class PopupCardDelete extends Popup {
  constructor({ popupSelector, handlePopupSubmit }) {
    super(popupSelector);

    this._handlePopupSubmit = handlePopupSubmit;

    this._submitPopupButton = this._popupSelector.querySelector(".popup__button");

    this._handleSubmit = () => {
      this._handlePopupSubmit();

      this.close();
    }
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitPopupButton.addEventListener("click", this._handleSubmit);
  }

  removeEventListeners() {
    super.removeEventListeners();

    this._submitPopupButton.removeEventListener("click", this._handleSubmit);
  }

  close() {
    super.close();
  }
}
