import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  validationConfig,
  formList,
  editButton,
  addButton,
  initialCards,
  userProfile,
  profileInputs,
  cardList as elementsList
}
 from "./constants.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";

const createCard = (data) => {
  const card = new Card (data, ".template_type_el", handleCardClick);
  const cardElement = card.generateCard();

  return cardElement;
};

const handleCardClick = (image, title, evt) => {
  const modal = new PopupWithImage(".popup__image");

  modal.open(image, title);

  modal.setEventListeners(evt);
};

addButton.addEventListener("click", (evt) => {
  const placePopup = new PopupWithForm({
    popupSelector: `form[name="place"]`,
    handleFormSubmit: (formData) => {
      elementsList.prepend(createCard(formData));
    }
});

  placePopup.open();
  placePopup.setEventListeners(evt);
});
editButton.addEventListener("click", (evt) => {
  const profilePopup = new PopupWithForm({
    popupSelector: `form[name="profile"]`,
    handleFormSubmit: (formData) => {
      const userInfo = new UserInfo(formData);

      userInfo.setUserInfo(userProfile);
    }
  });

  const userData = new UserInfo(userProfile);

  userData.getUserInfo();

  profileInputs.name.value = userData._userInfo.name.textContent;
  profileInputs.job.value = userData._userInfo.job.textContent;

  profilePopup.open();
  profilePopup.setEventListeners(evt);
});

formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);

  formValidator.enableValidation();
});

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
},
".elements__list"
);

cardList.renderItems();
