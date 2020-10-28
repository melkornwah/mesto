let formElement = document.querySelector(".form");

let profileElement = document.querySelector(".profile__info");
let profileName = profileElement.querySelector(".profile__name");
let profileJob = profileElement.querySelector(".profile__desc");

let closeButton = document.querySelector(".button_action_close");
let editButton = document.querySelector(".button_action_edit");

let nameInput = formElement.querySelector(".form__item_el_name");
let jobInput = formElement.querySelector(".form__item_el_job");

function editProfile() {
  formElement.classList.remove("form_hidden");
}

function closeForm() {
  formElement.classList.add("form_hidden");
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closeForm();
}

nameInput.value = profileName.textContent;
jobInput.value = profileJob.textContent;

editButton.addEventListener("click", editProfile);
closeButton.addEventListener("click", closeForm);
formElement.addEventListener("submit", formSubmitHandler);
