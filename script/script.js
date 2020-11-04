const formElement = document.querySelector(".form");

const profileElement = document.querySelector(".profile__info");
const profileName = profileElement.querySelector(".profile__name");
const profileJob = profileElement.querySelector(".profile__desc");

const closeButton = document.querySelector(".button_action_close");
const editButton = document.querySelector(".button_action_edit");

const nameInput = formElement.querySelector(".form__item_el_name");
const jobInput = formElement.querySelector(".form__item_el_job");

function editProfile() {
  formElement.classList.remove("form_hidden");

  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
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

editButton.addEventListener("click", editProfile);
closeButton.addEventListener("click", closeForm);
formElement.addEventListener("submit", formSubmitHandler);
