import Popup from "./Popup.js";

export default class PopupCardDelete extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);

    this._submitPopupButton = this._popupSelector.querySelector(".popup__button");
  }

  handleSubmit() {

  }

  setEventListeners() {
    super.setEventListeners();

    this._submitPopupButton.addEventListener("click", this.handleSubmit);
  }

  removeEventListeners() {
    super.removeEventListeners();

    this._submitPopupButton.removeEventListener("click", this.handleSubmit);
  }

  close() {
    super.close();
  }
}
