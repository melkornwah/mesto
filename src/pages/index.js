import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  validationConfig,
  formList,
  editButton,
  addButton,
  initialCards,
  userProfile,
  profileInputs
}
 from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

const createCard = (data) => {
  const card = new Card (data, ".template_type_el", handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
};

const userInfo = new UserInfo(userProfile);

const modal = new PopupWithImage(".popup__image");

const placePopup = new PopupWithForm({
  popupSelector: `form[name="place"]`,
  handleFormSubmit: (formData) => {
    cardList.addItem(createCard(formData));
  }
});

const profilePopup = new PopupWithForm({
  popupSelector: `form[name="profile"]`,
  handleFormSubmit: (formData) => {
    userInfo.setUserInfo(formData);
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

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.loadInitial(createCard(item));
  }
},
".elements__list"
);

cardList.renderItems();
