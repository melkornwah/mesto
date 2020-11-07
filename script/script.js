const formProfile = document.querySelector(".form-profile");
const formPlace = document.querySelector(".form-place");

const profileInfo = document.querySelector(".profile__info");
const profileName = profileInfo.querySelector(".profile__name");
const profileJob = profileInfo.querySelector(".profile__desc");

const popUpButton = document.querySelectorAll(".open-popup");
const closeButton = document.querySelectorAll(".button_action_close");
const profileSubmitButton = formProfile.querySelector(".form__button");
const placeSubmitButton = formPlace.querySelector(".form__button");


const nameInput = document.querySelector(".form__item_el_name");
const jobInput = document.querySelector(".form__item_el_job");
const placeInput = document.querySelector(".form__item_el_place");
const linkInput = document.querySelector(".form__item_el_image");

const cardsSection = document.querySelector(".elements");

const imagePopUp = document.querySelector(".image-popup")
const imagePopUpPhoto = imagePopUp.querySelector(".image-container__photo");
const imagePopUpName = imagePopUp.querySelector(".image-container__title");

const cardTemplate = document.querySelector(".template_type_el").content;
const cardElement = cardTemplate.cloneNode(true);

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

function openPopUp () {
  popUpButton.forEach(function (el) {
    el.addEventListener("click", function () {
      if (el.classList.contains("button_action_edit")) {
        formProfile.classList.remove("popup_hidden");
      }
      else if (el.classList.contains("button_action_add")) {
        formPlace.classList.remove("popup_hidden");
      }
      else if (el.classList.contains(".element__photo")) {
        imagePopUp.classList.remove("popup_hidden");
      }
      inputValueFiller();
    })
  })
}

function closePopUp () {
  closeButton.forEach(function (el) {
    el.addEventListener("click", function () {
      if (!(formProfile.classList.contains("popup_hidden"))) {
        formProfile.classList.add("popup_hidden");
      }
      else if (!(formPlace.classList.contains("popup_hidden"))) {
        formPlace.classList.add("popup_hidden");
      }
      else {
        imagePopUp.classList.add("popup_hidden");
      }
    })
  })
}

function inputValueFiller () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function profileSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  formProfile.classList.add("popup_hidden");
}

function placeSubmitHandler () {

}

popUpButton.forEach(openPopUp);
closeButton.forEach(closePopUp);
profileSubmitButton.addEventListener("click", profileSubmitHandler);
placeSubmitButton.addEventListener("click", placeSubmitHandler);


