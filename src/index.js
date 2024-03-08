import "./pages/index.css"; // добавление стилей для вебпака
import { initialCards } from "./components/cards.js"; // импорт массива с карточками-картинками
import { createCard, removeCard, like } from "./components/card.js"; // импорт функций работы с карточками
import { openModal, closeModal, closeOutModal } from "./components/modal.js"; // импорт функций открытия и закрытия модальных окон

// DOM узлы:
const placesList = document.querySelector(".places__list"); // область с карточками
const buttonCloseModal = document.querySelectorAll(".popup__close"); // кнопки-крестики для закрытия попапов

// переменные для открытия попапа-картинки
const popupImage = document.querySelector(".popup_type_image"); // само модальное окно с картинкой
const popupImageOpened = popupImage.querySelector(".popup__image"); // сама картинка в поопапе
const imageCaption = popupImage.querySelector(".popup__caption"); // название картинки под ней в попапе

// переменные для попапа "редактировать профиль"
const popupEditProfile = document.querySelector(".popup_type_edit"); // сам попап "редактировать профиль"
const openPopupButtonEditProfile = document.querySelector(".profile__edit-button"); //кнопка для открытия изменения профиля

const profileName = document.querySelector(".profile__title"); // имя профиля на странице
const profileJob = document.querySelector(".profile__description"); // деятельность профиля на странице

// переменные для попапа "новое место"
const popupNewCard = document.querySelector(".popup_type_new-card"); // сам попап "новое место"
const openPopupNewCardButton = document.querySelector(".profile__add-button"); // кнопка для открытия попапа "новое место"

// переменные форм
const editProfileForm = document.forms.editProfile; // форма "редактировать профиль"
const nameInput = editProfileForm.elements.name; // поле "имя" формы "редактировать профиль"
const jobInput = editProfileForm.elements.description; // поле "детельность" формы "редактировать профиль"

const newCardForm = document.forms.newPlace; // форма "новое место"
const placeNameInput = newCardForm.elements.placeName; // поле с названием места формы "новое место"
const linkInput = newCardForm.elements.link; // поле с сссылкой формы "новое место"

// Функция для открытия попапа-картинки (должна быть выше вывода)
const openImage = (src, name) => {
  popupImageOpened.src = src;
  popupImageOpened.alt = name;
  imageCaption.textContent = name;
  openModal(popupImage);
};

// Вывод карточек на страницу
initialCards.forEach((item) => {
  placesList.append(createCard(item, removeCard, openImage, like));
});

// Функция копирования данных профиля на странице в форму редактирования профиля
const copyDataProfile = () => {
  const nameValue = profileName.textContent;
  const jobValue = profileJob.textContent;
  nameInput.value = nameValue;
  jobInput.value = jobValue;
};

// Функция для сохранения данных + вызов закрытия окна при пройденной валидации
const handleFormSubmitProfile = (evt, popup) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  const isValid = nameInput.value.length > 0 && jobInput.value.length > 0;
  if (isValid) {
    closeModal(popup);
  }
};

// Функция добавления новой карточки + вызов закрытия окна при пройденной валидации
const handleFormSubmitNewCard = (evt) => {
  evt.preventDefault();

  const place = placeNameInput.value;
  const link = linkInput.value;

  const newCardData = { name: place, alt: place, link: link };
  const newCardElement = createCard(newCardData, removeCard, openImage, like);
  placesList.prepend(newCardElement, placesList.firstChild);

  const isValid = placeNameInput.value.length > 0 && linkInput.value.length > 0;
  if (isValid) {
    placeNameInput.value = "";
    linkInput.value = "";
    closeModal(popupNewCard);
  }
};

// Общее закрытие для всех попапов, которые есть и будут + добавление класса с анимацией
buttonCloseModal.forEach((button) => {
  const popup = button.closest(".popup");
  popup.addEventListener("mousedown", closeOutModal);
  button.addEventListener("click", () => closeModal(popup));
  popup.classList.add("popup_is-animated");
});

// слушатель открытия попапа "новое место"
openPopupNewCardButton.addEventListener("click", () => openModal(popupNewCard));

// слушатель открытия попапа "редактировать профиль"
openPopupButtonEditProfile.addEventListener("click", () => {
  openModal(popupEditProfile);
  copyDataProfile();
});

// слушатель кнопки для сохрания новых данных профиля
editProfileForm.addEventListener("submit", (evt) =>
  handleFormSubmitProfile(evt, popupEditProfile)
);

// слушатель кнопки для сохранения новой карточки
newCardForm.addEventListener("submit", (evt) => handleFormSubmitNewCard(evt));
