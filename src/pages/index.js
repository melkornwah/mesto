import "./index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  validationConfig,
  formList,
  editButton,
  addButton,
  patchButton,
  userProfile,
  profileInputs,
}
 from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupCardDelete from "../components/PopupCardDelete.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

const api = new Api({
  baseURL: "https://mesto.nomoreparties.co/v1/cohort-19",
  headers: {
    authorization: "f14a0855-c596-42e6-9cca-cb9c4d82767b",
    "Content-Type": "application/json"
  }
})

const deleteCardPopup = new PopupCardDelete({popupSelector: ".popup__delete"})

const cardList = new Section(".elements__list");

const userInfo = new UserInfo(userProfile);

const modal = new PopupWithImage(".popup__image");

api.getUserInfo()
  .then((user) => {
    userInfo.setUserInfo(user);
  })
  .catch((err) => {
    console.log(err);
  })

const createCard = (data, counter, creator) => {
  const card = new Card (data, ".template_type_el", handleCardClick, deleteCardPopup, api, userInfo);
  const cardElement = card.generateCard(counter, creator);

  return cardElement;
};

const placePopup = new PopupWithForm({
  popupSelector: `form[name="place"]`,
  handleFormSubmit: (formData) => {
    const popupButton = placePopup.getPopupButton();

    renderLoading(popupButton, () => {
      api.postCard(formData)
      .then(res => {
        cardList.addItem(createCard(res, 0, true));
      })
      .catch(err => {
        console.log(err);
      })
    })
  }
});

const profilePopup = new PopupWithForm({
  popupSelector: `form[name="profile"]`,
  handleFormSubmit: (formData) => {
    const popupButton = profilePopup.getPopupButton();

    renderLoading(popupButton, () => {
      api.updateUserInfo(formData)
        .then(data => {
          userInfo.setUserInfo(data);
        })
        .catch((err) => {
          console.log(err);
        })
    });
  }
});

const profilePhotoPopup = new PopupWithForm({
  popupSelector: `form[name="profile-photo"]`,
  handleFormSubmit: (formData) => {
    const popupButton = profilePhotoPopup.getPopupButton();

    renderLoading(popupButton, () => {
      api.patchAvatar(formData)
        .then(data => {
          setUserAvatar(data);
        })
        .catch((err) => {
          console.log(err);
        })
    });
  }
});

api.loadInitialCards()
  .then(cards => {
    cards.forEach(card => {
      cardList.loadInitial(createCard(card));
    })
  })
  .catch(err => {
    console.log(err);
  });

const renderLoading = (button, renderer) => {
  const buttonText = button.textContent;

  button.textContent = "Сохранение...";

  const newPromise = new Promise(resolve => {
    renderer();

    resolve();
  });

  newPromise
    .then(() => {
      button.textContent = buttonText;
    })
}


const setUserAvatar = (formData) => {
   userInfo.setUserInfo(formData);
};

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
patchButton.addEventListener("click", () => {
  profilePhotoPopup.open();
})

formList.forEach((formElement) => {
  const formValidator = new FormValidator(validationConfig, formElement);

  formValidator.enableValidation();
});


