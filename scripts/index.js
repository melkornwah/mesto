import Card from "./card.js";
import FormValidator from "./formValidator.js";
import initialCards from "./initial-cards.js";
import {validationConfig, ESC_KEY} from "./constants.js";

const formList = Array.from(document.querySelectorAll(".popup__form"));

const popup = document.querySelector(".popup");
const formProfile = popup.querySelector(`form[name="profile"]`);
const formPlace = popup.querySelector(`form[name="place"]`);

const profileInfo = document.querySelector(".profile__info");
const profileName = profileInfo.querySelector(".profile__name");
const profileJob = profileInfo.querySelector(".profile__desc");

const profileSubmitButton = formProfile.querySelector(".popup__button");
const placeSubmitButton = formPlace.querySelector(".popup__button");
const editButton = document.querySelector(".button_action_edit");
const addButton = document.querySelector(".button_action_add");

const nameInput = formProfile.querySelector("#name-input");
const jobInput = formProfile.querySelector("#job-input");
const placeInput = formPlace.querySelector("#title-input");
const linkInput = formPlace.querySelector("#link-input");

const cardList = document.querySelector(".elements__list");

const imagePopUp = document.querySelector(".popup__image");

const imagePopUpPhoto = imagePopUp.querySelector(".image-container__photo");
const imagePopUpName = imagePopUp.querySelector(".image-container__title");

const closePopUpByEsc = (evt) => {
  if (evt.key === ESC_KEY) {
    closePopUp(popup);
  }
};

const closePopUpByOverlay = (evt) => {
  if (evt.target.classList.contains("button_action_close") ||
  evt.target.classList.contains("popup__overlay")) {
    closePopUp(popup);
  }
};

const fillInputValues = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

const openPopUp = (popup) => {
  popup.classList.add("modal_is-opened");

  document.addEventListener("keydown", closePopUpByEsc);

  popup.addEventListener("click", closePopUpByOverlay);
};

const closePopUp = () => {
  const popup = document.querySelector(".modal_is-opened");

  popup.classList.remove("modal_is-opened");

  document.removeEventListener("keydown", closePopUpByEsc);

  popup.removeEventListener("click", closePopUpByOverlay);
}

const handleProfileSubmit = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopUp();
};

const handlePlaceSubmit = (evt) => {
  evt.preventDefault();

  cardList.prepend(createCard(createCardObject(placeInput.value, linkInput.value)));

  formPlace.reset();

  closePopUp();
};

const handleImagePopup = (title, image) => {
  openPopUp(imagePopUp);

  imagePopUpName.textContent = title;
  imagePopUpPhoto.alt = title;
  imagePopUpPhoto.src = image;
};

const createCardObject = (place, link) => {
  return {
    place,
    link
  };
};

const createCard = (data) => {
  const card = new Card (data, ".template_type_el", handleImagePopup);
  const cardElement = card.generateCard();

  return cardElement;
};

profileSubmitButton.addEventListener("click", handleProfileSubmit);
placeSubmitButton.addEventListener("click", handlePlaceSubmit);
addButton.addEventListener("click", function() {
  openPopUp(formPlace);
});
editButton.addEventListener("click", function() {
  openPopUp(formProfile);

  fillInputValues();
});

initialCards.forEach((item) => {
  cardList.append(createCard(createCardObject(item.place, item.link)))
});

formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);

  formValidator.enableValidation();
});
