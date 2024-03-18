// Функция, которая отображает ошибку
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
};

// Функция, которая убирает отображение ошибки
export const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
};

// Функция проверки валидности поля
const isValid = (formElement, inputElement) => {
  // проверка на валидность регулярки
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
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
const setEventLisnenerInput = (formElement, inputElement, buttonElement) => {
  const inputList = Array.from(formElement.querySelectorAll(inputElement));
  const button = formElement.querySelector(buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, button);
    });
  });
};

// Функция для проверки наличия невалидного поля (для блокировки и разблокировки кнопки)
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Функция для стилизации кнопки (активна или нет)
export const toggleButtonState = (inputList, button) => {
  if ( inputList === true || hasInvalidInput(inputList) ) {
    button.disabled = true;
    button.classList.add("button_inactive");
  } else {
    button.disabled = false;
    button.classList.remove("button_inactive");
  }
};



// Функция для перебора всех форм на странице
export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventLisnenerInput(formElement, config.inputElement, config.buttonElement);
  });
};