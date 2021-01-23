import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);

    this._handleFormSubmit = handleFormSubmit;

    this._submitFormButton = this._popupSelector.querySelector(".popup__button");

    this._handleSubmit = () => {
      const newPromise = new Promise(resolve => {
        this._handleFormSubmit(this._getInputValues());

        resolve();
      })

      newPromise
        .then(() => {
          this.close();
        })
    }
  }

  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll(".popup__input");

    this._formValues = {};

    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });

    return this._formValues;
  }

  getPopupButton() {
    return this._popupSelector.querySelector(".popup__button");
  }

  setEventListeners() {
    super.setEventListeners();

    this._submitFormButton.addEventListener("click", this._handleSubmit);
  }

  removeEventListeners() {
    super.removeEventListeners();

    this._submitFormButton.removeEventListener("click", this._handleSubmit);
  }


  close() {
    super.close();

    this._popupSelector.reset();
  }
}
