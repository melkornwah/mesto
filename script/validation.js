const getErrorElement = (formElement, inputElement) => {
  return errorElement = formElement.querySelector(`#${inputElement.id}-error`);
};

const showInputError = (object, formElement, inputElement, errorMessage) => {
  getErrorElement(formElement, inputElement);

  inputElement.classList.add(object.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(object.errorClass);
};

const hideInputError = (object, formElement, inputElement) => {
  getErrorElement(formElement, inputElement);

  inputElement.classList.remove(object.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(object.errorClass);
};

const checkInputValidity = (object, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(object, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(object, formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (object, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(object.inactiveButtonClass);
  }
  else {
    buttonElement.classList.remove(object.inactiveButtonClass);
  }
};

const setInitialButtonState = (object, popup, buttonElement) => {
  if (popup === formProfile) {
    buttonElement.classList.remove(object.inactiveButtonClass);
  }
};

const setInitialValidity = (object, popup, inputElement) => {
  if (popup === formProfile) {
    hideInputError(object, popup, inputElement);
  }
};

const setEventListeners = (object, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(object.inputSelector));
  const buttonElement = formElement.querySelector(object.submitButtonSelector);

  toggleButtonState(object, inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(object, formElement, inputElement);
      toggleButtonState(object, inputList, buttonElement);
    });
    editButton.addEventListener("click", function () {
      setInitialValidity(object, formElement, inputElement);
      setInitialButtonState(object, formElement, buttonElement);
    });
  });
};

const enableValidation = (object) => {
  const formList = Array.from(document.querySelectorAll(object.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function(evt) {
      evt.preventDefault();
    })

  setEventListeners(object, formElement);
  });
};

enableValidation({
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active"
});