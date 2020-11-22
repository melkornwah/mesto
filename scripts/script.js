const popup = document.querySelector(".popup");
const formProfile = popup.querySelector(`form[name="profile"]`)
const formPlace = popup.querySelector(`form[name="place"]`)
const imagePopUp = popup.querySelector(".popup__image");

const profileInfo = document.querySelector(".profile__info");
const profileName = profileInfo.querySelector(".profile__name");
const profileJob = profileInfo.querySelector(".profile__desc");

const profileSubmitButton = formProfile.querySelector(".popup__button");
const placeSubmitButton = formPlace.querySelector(".popup__button");
const closeImageButton = imagePopUp.querySelector(".button_action_close");
const editButton = document.querySelector(".button_action_edit");
const addButton = document.querySelector(".button_action_add");

const nameInput = formProfile.querySelector("#name-input");
const jobInput = formProfile.querySelector("#job-input");
const placeInput = formPlace.querySelector("#title-input");
const linkInput = formPlace.querySelector("#link-input");

const imagePopUpPhoto = imagePopUp.querySelector(".image-container__photo");
const imagePopUpName = imagePopUp.querySelector(".image-container__title");

const cardList = document.querySelector(".elements__list");

const cardTemplate = document.querySelector(".template_type_el").content;

const loadInitialCards = (card) => {
  addCard(createCard(card.place, card.link));
};

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

const setCardEventListeners = (evt) => {
  if (evt.target.classList.contains("button_action_like")) {
    evt.target.classList.toggle("button_action_like_active");
  }
  else if (evt.target.classList.contains("button_action_delete")) {
    evt.target.parentElement.remove();
  }
  else if (evt.target.classList.contains("element__photo")) {
    openPopUp(imagePopUp);
    imagePopUpName.textContent = evt.target.alt;
    imagePopUpPhoto.alt = evt.target.alt;
    imagePopUpPhoto.src = evt.target.src;
  }
};

const createCard = (place, link) => {
  const cardElement = cardTemplate.cloneNode(true);
  const element = cardElement.querySelector(".element");

  const cardName = element.querySelector(".element__name");
  const cardLink = element.querySelector(".element__photo");

  cardName.textContent = place;
  cardLink.src = link;
  cardLink.alt = place;

  element.addEventListener("click", setCardEventListeners);

  return element;
};

const addCard = (element) => {
  cardList.prepend(element);
};

const handleProfileSubmit = (evt) => {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  formProfile.reset();

  closePopUp(formProfile);
};

const handlePlaceSubmit = (evt) => {
  evt.preventDefault();

  addCard(createCard(placeInput.value, linkInput.value));

  formPlace.reset();

  closePopUp(formPlace);
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

initialCards.forEach(loadInitialCards);
