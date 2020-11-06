const formProfile = document.querySelector(".form-profile");
const formPlace = document.querySelector(".form-place");

const profileInfo = document.querySelector(".profile__info");
const profileName = profileInfo.querySelector(".profile__name");
const profileJob = profileInfo.querySelector(".profile__desc");

const popUpButton = document.querySelectorAll(".open-popup");
const closeButton = document.querySelectorAll(".button_action_close");

const nameInput = document.querySelector(".form__item_el_name");
const jobInput = document.querySelector(".form__item_el_job");
const placeInput = document.querySelector(".form__item_el_place");
const linkInput = document.querySelector(".form__item_el_image");

const cardsSection = document.querySelector(".elements");

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

for (i = 0; i < 6; i += 1) {
  const cardElement = cardTemplate.cloneNode(true);

  const card = cardElement.querySelector(".element");

  cardElement.querySelector(".element__name").textContent = initialCards[i].name;
  cardElement.querySelector(".element__photo").src = initialCards[i].link;
  cardElement.querySelector(".element__photo").alt = cardElement.textContent;
  cardElement.querySelector(".button_action_like").addEventListener("click", function (evt) {
    evt.target.classList.toggle("button_action_like_active");
  })
  cardElement.querySelector(".button_action_delete").addEventListener("click", function(evt) {
    card.remove();
  })

  cardsSection.append(cardElement);
}

const imagePopUp = document.querySelector(".image-popup");
const cardImage = document.querySelectorAll(".element__photo");
const cardTitle = document.querySelectorAll(".element__name");

const likeButton = document.querySelectorAll(".button_action_like");

function inputValueFiller () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openForm () {
  popUpButton.forEach(function (el) {
    el.addEventListener("click", function () {
      if (el.classList.contains("button_action_edit")) {
        formProfile.classList.remove("form_hidden");
      }
      else {
        formPlace.classList.remove("form_hidden");
      }
      inputValueFiller();
    })
  })
}

function closePopUp () {
  closeButton.forEach(function (el) {
    el.addEventListener("click", function () {
      if (formProfile.classList.contains("form_hidden") === false) {
        formProfile.classList.add("form_hidden");
      }
      else if (formPlace.classList.contains("form_hidden") === false){
        formPlace.classList.add("form_hidden");
      }
      else {
        imagePopUp.classList.add("image-popup_hidden");
      }
    })
  })
}

function addCard () {
  const newCard = cardTemplate.cloneNode(true);

  const cardBody = newCard.querySelector(".element")

  newCard.querySelector(".element__name").textContent = placeInput.value;
  newCard.querySelector(".element__photo").src = linkInput.value;
  newCard.querySelector(".element__photo").alt = placeInput.value;
  newCard.querySelector(".button_action_like").addEventListener("click", function (evt) {
    evt.target.classList.toggle("button_action_like_active");
  })
  newCard.querySelector(".button_action_delete").addEventListener("click", function(evt) {
    cardBody.remove();
  })

  placeInput.value = "";
  linkInput.value = "";

  cardsSection.prepend(newCard);
}

const submitButton = document.querySelectorAll(".form__button");

function formSubmitHandler () {
  submitButton.forEach(function (el) {
    el.addEventListener("click", function (evt) {
      evt.preventDefault();
      if (formProfile.classList.contains("form_hidden") === false) {
        profileName.textContent = nameInput.value;
        profileJob.textContent = jobInput.value;

        formProfile.classList.add("form_hidden");
      }
      else if (formPlace.classList.contains("form_hidden") === false) {
        addCard();

        formPlace.classList.add("form_hidden");
        console.log("add");
      }
    })
  })
}

function openImagePopUp () {
  cardImage.forEach(function (el) {
    const imagePopUpPhoto = document.querySelector(".image-container__photo");
    const imagePopUpTitle = document.querySelector(".image-container__title");

    el.addEventListener("click", function (evt) {
      imagePopUp.classList.remove("image-popup_hidden");
      imagePopUpPhoto.src = el.src;
      imagePopUpPhoto.alt = el.alt;
      imagePopUpTitle.textContent = el.alt;
    })
  })
}

popUpButton.forEach(openForm);
closeButton.forEach(closePopUp);
submitButton.forEach(formSubmitHandler);
cardImage.forEach(openImagePopUp);
