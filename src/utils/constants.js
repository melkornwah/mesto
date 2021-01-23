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
export const patchButton = document.querySelector(".button_action_edit-photo");

const userName = document.querySelector(".profile__name");
const userJob = document.querySelector(".profile__desc");
const userAvatar = document.querySelector(".profile__photo");

export const userProfile = {
  name: userName,
  about: userJob,
  avatar: userAvatar
}

const nameInput = document.querySelector("#name-input");
const jobInput = document.querySelector("#job-input");

export const profileInputs = {
  name: nameInput,
  job: jobInput
};

export const creator = "d2711de969f33ad37a14fb98";
