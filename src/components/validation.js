const editProfileForm = document.forms.editProfile; // форма "редактировать профиль"
const nameInput = editProfileForm.elements.name; // поле "имя" формы "редактировать профиль"

// Функция, которая отображает ошибку
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
};

// Функция, которая убирает отображение ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
};

// Функция проверки валидности поля
const isValid = (formElement, inputElement) => {
  // проверка на валидность регулярки
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(nameInput.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  // проверка на обычную валидность
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Функция-слушатель для нужного поля ввода
const setEventLisnenerInput = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  const buttonElement = formElement.querySelector(".popup__button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

// Функция для проверки наличия невалидного поля (для блокировки и разблокировки кнопки)
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция для стилизации кнопки
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("button_inactive");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("button_inactive");
  }
};

// Функция для очистки ошибки для слушателя открытия попапа
export const clearValidation = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__input"));
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
};

// Функция для перебора всех форм на странице
export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    setEventLisnenerInput(formElement);
  });
};