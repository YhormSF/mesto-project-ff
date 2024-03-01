// Функция для открытия модальных окон
export const openModal = (modalElement) => {
  modalElement.classList.add('popup_is-opened');
  document.addEventListener('keyup', closeModalEsc); // добавление слушателя ESC при открытии окна
  document.addEventListener('click', closeOutModal); // добавление слушателя "закрытия модального окна за его пределы"
}

// Функция для открытия попапа-картинки
export const openImage = (src, alt) => {
  const popupImage = document.querySelector('.popup_type_image'); // сам попап-картинка
  const popupImageOpened = popupImage.querySelector('.popup__image'); 
  popupImageOpened.src = src;
  popupImageOpened.alt = alt;
  openModal(popupImage);
}


// Функция для закрытия модальных окон
export const closeModal = (modalElement) => {
  modalElement.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', closeModalEsc); // удаление слушателя ESC при закрытии окна
  document.removeEventListener('click', closeOutModal); // удаление слушателя "закрытия модального окна за его пределы"
}

// Функция закрытия при ESC
export const closeModalEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupIsOpen = document.querySelector('.popup_is-opened');
    closeModal(popupIsOpen);
  }
}

// Функция закрытияи модального окна, если нажать за его пределы
export const closeOutModal = (evt) => {
  const popupIsOpen = document.querySelector('.popup_is-opened'); // нужен, чтобы найти открытый контент
  const popupContent = popupIsOpen.querySelector('.popup__content'); // контент модального окна
  const openPopupButtonEditProfile = document.querySelector('.profile__edit-button'); //кнопка для изменения профиля
  const openPopupNewCardButton = document.querySelector('.profile__add-button'); // кнопка для открытия попапа "новое место"
  const placesList = document.querySelector(".places__list"); // область с картинками

  const buttonTargetProfile = evt.composedPath().includes(openPopupButtonEditProfile);
  const buttonTargetNewCard = evt.composedPath().includes(openPopupNewCardButton);
  const popupTarget = evt.composedPath().includes(popupContent);
  const imageTarget = evt.composedPath().includes(placesList);

  // если выбран не контент попапа, не кнопки открытия попапов или не область с картинками
  if (!(popupTarget || buttonTargetProfile || buttonTargetNewCard || imageTarget)) { 
    const popupIsOpen = document.querySelector('.popup_is-opened');
    closeModal(popupIsOpen);
  }
}

// Функция копирования данных профиля в форму
export const copyDataProfile = (profileName, profileJob, nameInput, jobInput) => {
  const nameValue = profileName.innerText;
  const jobValue = profileJob.innerText;
  nameInput.value = nameValue;
  jobInput.value = jobValue;
}

// Функция для сохранения данных + вызов закрытия окна при пройденной валидации
export const handleFormSubmitProfile = (evt, profileName, profileJob, nameInput, jobInput, popup) => {
  evt.preventDefault();
  profileName.innerText = nameInput.value;
  profileJob.innerText = jobInput.value;
  const isValid = nameInput.value.length > 0 && jobInput.value.length > 0;
  if (isValid) {
    closeModal(popup);
  }
 }

// Функция добавления новой карточки + вызов закрытия окна при пройденной валидации
export const handleFormSubmitNewCard = (evt, createCard, removeCard, newCardForm, placesList, popup) => {
  evt.preventDefault();
  const placeNameInput = newCardForm.elements.placeName; // поле с названием места
  const linkInput = newCardForm.elements.link; // поле с сссылкой

  let place = placeNameInput.value;
  let link = linkInput.value;

  const newCardData = {name: place, alt: place, link: link }
  const newCardElement = createCard(newCardData, removeCard, openImage);
  placesList.prepend(newCardElement, placesList.firstChild);

  const isValid = placeNameInput.value.length > 0 && linkInput.value.length > 0;
  if (isValid) {
    placeNameInput.value = '';
    linkInput.value = '';
    closeModal(popup);;
  }
}
