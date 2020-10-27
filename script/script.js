let formElement = document.querySelector(".form");

let profileElement = document.querySelector(".profile__info");
let profileName = profileElement.querySelector(".profile__name");
let profileJob = profileElement.querySelector(".profile__desc");

let closeButton = document.querySelector(".button_action_close");
let editButton = document.querySelector(".button_action_edit");

function editProfile() {
  formElement.classList.remove("form_hidden");
}

function closeForm() {
  formElement.classList.add("form_hidden");
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  let nameInput = formElement.querySelector('.form__input, [name="name"]').value;
  let jobInput = formElement.querySelector('.form__input, [name="job"]').value;

  profileName.textContent = nameInput;
  profileJob.textContent = jobInput;

  closeForm();
}


editButton.addEventListener("click", editProfile);
closeButton.addEventListener("click", closeForm);
formElement.addEventListener("submit", formSubmitHandler);
