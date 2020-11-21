const formProfile = document.forms.profile;
const formPlace = document.forms.place;
const imagePopUp = document.querySelector(".image-popup");

const profileInfo = document.querySelector(".profile__info");
const profileName = profileInfo.querySelector(".profile__name");
const profileJob = profileInfo.querySelector(".profile__desc");

const profileSubmitButton = formProfile.elements.submit;
const placeSubmitButton = formPlace.elements.submit;
const closeImageButton = imagePopUp.querySelector(".button_action_close");
const editButton = document.querySelector(".button_action_edit");
const addButton = document.querySelector(".button_action_add");

const nameInput = formProfile.elements.name;
const jobInput = formProfile.elements.job;
const placeInput = formPlace.elements.title;
const linkInput = formPlace.elements.link;

const imagePopUpPhoto = imagePopUp.querySelector(".image-container__photo");
const imagePopUpName = imagePopUp.querySelector(".image-container__title");

const cardList = document.querySelector(".elements__list");

const cardTemplate = document.querySelector(".template_type_el").content;

const initialCards = [
  {
      place: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
  },
  {
      place: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
  },
  {
      place: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
  },
  {
      place: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
  },
  {
      place: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
  },
  {
      place: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
  }
];

const loadInitialCards = (card) => {
  addCard(cardList, createCard(card.place, card.link));
};

const closePopUpKey = (evt, popup) => {
  if (evt.key === "Escape") {
    closePopUp(popup);
  }
};

const fillInputValues = () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

const openPopUp = (popup) => {
  popup.classList.add("popup_is-opened");

  document.addEventListener("keydown", function(evt) {
    closePopUpKey(evt, popup);
  });

  if (popup === formProfile) {
    popup.reset();
  }
};

const closePopUp = (popup) => {
  popup.classList.remove("popup_is-opened");

  document.removeEventListener("keydown", function(evt) {
    closePopUpKey(evt, popup);
  });
};

const createCard = (place, link) => {
  const cardElement = cardTemplate.cloneNode(true);
  const element = cardElement.querySelector(".element");

  const cardName = element.querySelector(".element__name");
  const cardLink = element.querySelector(".element__photo");

  cardName.textContent = place;
  cardLink.src = link;
  cardLink.alt = place;

  return element;
};

const addCard = (container, element) => {
  container.prepend(element);
};

const handleProfileSubmit = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopUp(formProfile);
};

const handlePlaceSubmit = (evt) => {
  evt.preventDefault();

  addCard(cardList, createCard(placeInput.value, linkInput.value));

  formPlace.reset();

  closePopUp(formPlace);
};

const likeCardButton = (evt) => {
  if (evt.target.classList.contains("button_action_like")) {
    evt.target.classList.toggle("button_action_like_active");
  }
};

const deleteCardButton = (evt) => {
  if (evt.target.classList.contains("button_action_delete")) {
    evt.target.parentElement.remove();
  }
};

const openImagePopUp = (evt) => {
  if (evt.target.classList.contains("element__photo")) {
    openPopUp(imagePopUp);
    imagePopUpName.textContent = evt.target.alt;
    imagePopUpPhoto.alt = evt.target.alt;
    imagePopUpPhoto.src = evt.target.src;
  }
};

cardList.addEventListener("click", function(evt) {
  likeCardButton(evt);
  deleteCardButton(evt);
  openImagePopUp(evt);
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
formProfile.addEventListener("click", function(evt) {
  if (evt.target.classList.contains("popup__overlay") ||
  evt.target.classList.contains("button_action_close")) {
    closePopUp(formProfile);
  }
});
formPlace.addEventListener("click", function(evt) {
  if (evt.target.classList.contains("popup__overlay") ||
  evt.target.classList.contains("button_action_close")) {
    closePopUp(formPlace);
  }
})
imagePopUp.addEventListener("click", function(evt) {
  if (evt.target.classList.contains("popup__overlay") ||
  evt.target.classList.contains("button_action_close")) {
    closePopUp(imagePopUp);
  }
});

initialCards.forEach(loadInitialCards);
