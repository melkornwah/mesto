class FormValidator {
  constructor(object, formElement) {
    this._formElement = formElement;
    this._inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._buttonElement = formElement.querySelector(object.submitButtonSelector);
    this._inputErrorClass = object.inputErrorClass;
    this._errorClass = object.errorClass;
  };

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  };

  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    }
    else {
      this._showInputError(inputElement);
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
    }
    else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  _setInitialButtonState() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
  };

  _setInitialValidity(inputElement) {
    this._hideInputError(inputElement);
  };

  _setInitialStates(inputElement) {
    this._setInitialButtonState();
    this._setInitialValidity(inputElement);
  };

  _setEventListeners() {
    this._toggleButtonState();


    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
      this._formElement.addEventListener("reset", () => {
        this._setInitialStates(inputElement);
      });
    });
  };

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    })

    this._setEventListeners();
  };
};

export default FormValidator;
