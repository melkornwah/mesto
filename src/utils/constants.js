export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active"
};

export const ESC_KEY = "Escape";

export const formList = Array.from(document.querySelectorAll(".popup__form"));

export const editButton = document.querySelector(".button_action_edit");
export const addButton = document.querySelector(".button_action_add");

const userName = document.querySelector(".profile__name");
const userJob = document.querySelector(".profile__desc");

export const userProfile = {
  name: userName,
  job: userJob
}

const nameInput = document.querySelector("#name-input");
const jobInput = document.querySelector("#job-input");

export const profileInputs = {
  name: nameInput,
  job: jobInput
};

export const initialCards = [
  {
      title: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
  },
  {
      title: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
  },
  {
      title: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
  },
  {
      title: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
  },
  {
      title: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
  },
  {
      title: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
  }
];
