const formProfile = document.querySelector(".form-profile");
const formPlace = document.querySelector(".form-place");

const profileInfo = document.querySelector(".profile__info");
const profileName = profileInfo.querySelector(".profile__name");
const profileJob = profileInfo.querySelector(".profile__desc");

const popUpButton = document.querySelectorAll(".open-popup");
const closeButton = document.querySelectorAll(".button_action_close");
const submitButton = document.querySelectorAll(".form__button");

const nameInput = document.querySelector(".form__item_el_name");
const jobInput = document.querySelector(".form__item_el_job");

function inputValueFiller() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

function openForm() {
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

function closeForm() {
  closeButton.forEach(function(el) {
    el.addEventListener("click", function () {
      if (formProfile.classList.contains("form_hidden") === false) {
        formProfile.classList.add("form_hidden");
      }
      else {
        formPlace.classList.add("form_hidden");
      }
    })
  })
}

function formSubmitHandler() {
  submitButton.forEach(function(el) {
    el.addEventListener("click", function(evt) {
      evt.preventDefault();
      if (formProfile.classList.contains("form_hidden") === false) {
        profileName.textContent = nameInput.value;
        profileJob.textContent = jobInput.value;

        formProfile.classList.add("form_hidden");
      }
    })
  })
}

popUpButton.forEach(openForm);
closeButton.forEach(closeForm);
submitButton.forEach(formSubmitHandler);
