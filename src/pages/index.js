import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  validationConfig,
  formList,
  editButton,
  addButton,
  userProfile,
  profileInputs,
  creator
}
 from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupCardDelete from "../components/PopupCardDelete.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const api = new Api({
  baseURL: "https://mesto.nomoreparties.co/v1/cohort-19",
  headers: {
    authorization: "f14a0855-c596-42e6-9cca-cb9c4d82767b",
    "Content-Type": "application/json"
  }
})

const createCard = (data, counter, creator) => {
  const card = new Card (data, ".template_type_el", handleCardClick, deleteCardPopup, api, creator);
  const cardElement = card.generateCard(counter, creator);

  return cardElement;
};

const deleteCardPopup = new PopupCardDelete({popupSelector: ".popup__delete"})

const cardList = new Section(".elements__list");



api.loadInitialCards(cardList, createCard, creator);
api.getUserInfo(userProfile);

const userInfo = new UserInfo(userProfile);

const modal = new PopupWithImage(".popup__image");

const placePopup = new PopupWithForm({
  popupSelector: `form[name="place"]`,
  handleFormSubmit: (formData) => {
    cardList.addItem(createCard(formData, 0, true));
    api.postCard(formData);
  }
});

const profilePopup = new PopupWithForm({
  popupSelector: `form[name="profile"]`,
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
    api.updateUserInfo(formData);
  }
});

const handleCardClick = (image, title) => {
  modal.open(image, title);
};

addButton.addEventListener("click", () => {
  placePopup.open();
});
editButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();

  profileInputs.name.value = userData.name;
  profileInputs.job.value = userData.job;

  profilePopup.open();
});

formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);

  formValidator.enableValidation();
});


