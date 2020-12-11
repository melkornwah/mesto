import Card from "./card.js";
import FormValidator from "./formValidator.js";
import initialCards from "./initial-cards.js";
import validationConfig from "./constants.js";

const formList = Array.from(document.querySelectorAll(".popup__form"));

const popup = document.querySelector(".popup");
const formProfile = popup.querySelector(`form[name="profile"]`)
const formPlace = popup.querySelector(`form[name="place"]`)

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

const createCard = (place, link) => {
  const card = new Card (place, link, ".template_type_el")
  const cardElement = card.generateCard();

  cardList.prepend(cardElement);
}

const closePopUpByEsc = (evt, popup) => {
  if (evt.key === "Escape") {
    closePopUp(popup);
  }
};

const setPopUpEventListeners = (evt, popup) => {
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

  document.addEventListener("keydown", function(evt) {
    closePopUpByEsc(evt, popup);
  });

  popup.addEventListener("click", function(evt) {
    setPopUpEventListeners(evt, popup);
  })

  if (popup === formProfile) {
    popup.reset();
  };
};

const closePopUp = (popup) => {
  popup.classList.remove("modal_is-opened");

  document.removeEventListener("keydown", function(evt) {
    closePopUpByEsc(evt, popup);
  });

  popup.removeEventListener("click", function(evt) {
    setPopUpEventListeners(evt, popup);
  })
};

const handleProfileSubmit = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopUp(formProfile);
};

const handlePlaceSubmit = (evt) => {
  evt.preventDefault();

  createCard(placeInput.value, linkInput.value);

  formPlace.reset();

  closePopUp(formPlace);
};

const handleImagePopup = (evt) => {

  const imagePopUp = document.querySelector(".popup__image");

  const imagePopUpPhoto = imagePopUp.querySelector(".image-container__photo");
  const imagePopUpName = imagePopUp.querySelector(".image-container__title");

  openPopUp(imagePopUp);

  imagePopUpName.textContent = evt.target.alt;
  imagePopUpPhoto.alt = evt.target.alt;
  imagePopUpPhoto.src = evt.target.src;
};

cardList.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("element__photo")) {
    handleImagePopup(evt);
  }
});
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
    createCard(item.place, item.link);
})

formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);

  formValidator.enableValidation();
});
