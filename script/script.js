const formProfile = document.querySelector(".form-profile");
const formPlace = document.querySelector(".form-place");

const profileInfo = document.querySelector(".profile__info");
const profileName = profileInfo.querySelector(".profile__name");
const profileJob = profileInfo.querySelector(".profile__desc");

const closeButton = document.querySelectorAll(".button_action_close");
const editButton = document.querySelector(".button_action_edit");
const addButton = document.querySelector(".button_action_add");
const profileSubmitButton = formProfile.querySelector(".form__button");
const placeSubmitButton = formPlace.querySelector(".form__button");

const nameInput = document.querySelector(".form__item_el_name");
const jobInput = document.querySelector(".form__item_el_job");
const placeInput = document.querySelector(".form__item_el_place");
const linkInput = document.querySelector(".form__item_el_link");

const cardList = document.querySelector(".elements__list");

const imagePopUp = document.querySelector(".image-popup");
const imagePopUpPhoto = imagePopUp.querySelector(".image-container__photo");
const imagePopUpName = imagePopUp.querySelector(".image-container__title");

const cardTemplate = document.querySelector(".template_type_el").content;

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

function createCard(name, link) {
  const cardElement = cardTemplate.cloneNode(true);
  const element = cardElement.querySelector(".element");

  const cardName = element.querySelector(".element__name");
  const cardLink = element.querySelector(".element__photo");

  const deleteButton = element.querySelector(".button_action_delete");
  const likeButton = element.querySelector(".button_action_like");

  cardName.textContent = name;
  cardLink.src = link;
  cardLink.alt = name;
  deleteButton.addEventListener("click", function() {
    element.remove();
  })
  likeButton.addEventListener("click", function(evt) {
    evt.target.classList.toggle("button_action_like_active");
  })

  return element;
}

function addCard(container, element) {
  container.prepend(element);
}

function imagePopUpFiller(el) {
  imagePopUpPhoto.alt = el.alt;
  imagePopUpPhoto.src = el.src;
  imagePopUpName.textContent = el.alt;
}

function inputValueFiller() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function closePopUp(el) {
  el.parentElement.parentElement.classList.add("popup_hidden");
}

function profileSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  formProfile.classList.add("popup_hidden");
}

function placeSubmitHandler(evt) {
  evt.preventDefault();

  addCard(cardList, createCard(placeInput.value, linkInput.value));

  formPlace.querySelector(".form__admin").reset();

  formPlace.classList.add("popup_hidden");
}

function openPopUp(popup) {
  popup.classList.remove("popup_hidden");

  console.log(popup);
}

initialCards.forEach(function (card) {
  addCard(cardList, createCard(card.name, card.link));
});

const imageButton = document.querySelectorAll(".element__photo");

profileSubmitButton.addEventListener("click", profileSubmitHandler);
placeSubmitButton.addEventListener("click", placeSubmitHandler);
addButton.addEventListener("click", function() {
  openPopUp(formPlace);
});
editButton.addEventListener("click", function() {
  openPopUp(formProfile);

  inputValueFiller();
});
imageButton.forEach(function(el) {
  el.addEventListener("click", function() {
    openPopUp(imagePopUp);

    imagePopUpName.textContent = el.alt;
    imagePopUpPhoto.src = el.src;
    imagePopUpPhoto.alt = el.alt;
  })
});
closeButton.forEach(function(el) {
  el.addEventListener("click", function() {
    closePopUp(el);
  });
});
