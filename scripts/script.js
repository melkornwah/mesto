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

class Card {
  constructor(place, link, templateSelector) {
    this._title = place;
    this._image = link;
    this._templateSelector = templateSelector;
  };

  _getCardElement() {
    this._element = document
      .querySelector(this._templateSelector)
      .content
      .cloneNode(true);

    return this._element;
  };

  _handleLikeButton(evt) {
    evt.target.classList.toggle("button_action_like_active");
  };

  _handleDeleteButton(evt) {
    evt.target.parentElement.remove();
  };

  _handleImagePopup(evt) {

    const imagePopUp = document.querySelector(".popup__image");

    const imagePopUpPhoto = imagePopUp.querySelector(".image-container__photo");
    const imagePopUpName = imagePopUp.querySelector(".image-container__title");

    openPopUp(imagePopUp);

    imagePopUpName.textContent = evt.target.alt;
    imagePopUpPhoto.alt = evt.target.alt;
    imagePopUpPhoto.src = evt.target.src;
  };

  _setEventListeners(cardPhoto) {
    this._element.querySelector(".button_action_like").addEventListener("click", (evt) => {
      this._handleLikeButton(evt);
    });
    this._element.querySelector(".button_action_delete").addEventListener("click", (evt) => {
      this._handleDeleteButton(evt);
    });
    cardPhoto.addEventListener("click", (evt) => {
      this._handleImagePopup(evt);
    });
  };

  generateCard() {
    this._getCardElement();

    const cardPhoto = this._element.querySelector(".element__photo");

    this._element.querySelector(".element__name").textContent = this._title;
    cardPhoto.src = this._image;
    cardPhoto.alt = this._title;

    this._setEventListeners(cardPhoto);

    return this._element;
  };
};

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

  formProfile.reset();

  closePopUp(formProfile);
};

const handlePlaceSubmit = (evt) => {
  evt.preventDefault();

  createCard(placeInput.value, linkInput.value);

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

initialCards.forEach((item) => {
    createCard(item.place, item.link);
})
