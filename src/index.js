import "./pages/index.css"; // добавление стилей для вебпака
import { createCard, removeCard, like } from "./components/card.js"; // импорт функций работы с карточками
import { openModal, closeModal, closeOutModal } from "./components/modal.js"; // импорт функций открытия и закрытия модальных окон
import { enableValidation, clearValidation } from "./components/validation.js"; // импорт валидации
import { getInitialData, addNewProfileData ,addNewCardData, addNewAvatarData } from "./components/api.js"; // импорт API

// DOM узлы:
const placesList = document.querySelector(".places__list"); // область с карточками
const buttonCloseModal = document.querySelectorAll(".popup__close"); // все кнопки-крестики для закрытия попапов

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

// переменные для попапа "обновить аватар"
const popupUpdateAvatar = document.querySelector(".popup_type_update-avatar"); // сам попап "обновить аватар"
const profileAvatar = document.querySelector(".profile__image"); // сама аватарка
const profileAvatarEdit = document.querySelector(".profile__image-edit"); // элемент поверх аватарки для наведения курсора

// переменные для попапа подтверждения удаления карточки
const popupRemoveCard = document.querySelector(".popup_type_remove-card"); // сам попап подтверждения удаления
const buttonСonfirmation = popupRemoveCard.querySelector(".popup__button"); // кнопка подтверждения удаления

// переменные форм
const editProfileForm = document.forms.editProfile; // форма "редактировать профиль"
const nameInput = editProfileForm.elements.name; // поле "имя" формы "редактировать профиль"
const jobInput = editProfileForm.elements.description; // поле "детельность" формы "редактировать профиль"

const newCardForm = document.forms.newPlace; // форма "новое место"
const placeNameInput = newCardForm.elements.placeName; // поле с названием места формы "новое место"
const linkInput = newCardForm.elements.linkImage; // поле с сссылкой формы "новое место"

const updateAvatarForm = document.forms.updateAvatar; // форма "обновить аватар"
const linkImageInput = updateAvatarForm.elements.linkAvatar; // поле с ссылкой формы "обновить аватар"

const removeCardForm = document.forms.removeCard; // форма "подтверждения удаления"

// Функция для открытия попапа-картинки (должна быть выше вывода)
const openImage = (src, name) => {
  popupImageOpened.src = src;
  popupImageOpened.alt = name;
  imageCaption.textContent = name;
  openModal(popupImage);
};

// Загрузка информации о пользователе и карточек с сервера + их вывод
  getInitialData()
    .then(({ userData, cardsData }) => {
      profileName.textContent = userData.name;
      profileJob.textContent = userData.about;
      const userId = userData._id;
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
      cardsData.forEach((card) => {
        placesList.append(
          createCard(card, openImage, like, userId, preRemoveCard)
        );
      });
    })
    .catch((err) => console.log(err));

// Функция копирования данных профиля на странице в форму редактирования профиля
const copyDataProfile = () => {
  const nameValue = profileName.textContent;
  const jobValue = profileJob.textContent;
  nameInput.value = nameValue;
  jobInput.value = jobValue;
};

// Функция для сохранения данных профиля + вызов закрытия окна
const handleFormSubmitProfile = (evt, popup) => {
  evt.preventDefault();
  const buttonSave = popupEditProfile.querySelector(".popup__button");
  buttonSave.textContent = "Сохранение...";
  const name = nameInput.value;
  const job = jobInput.value;
  // добавление на сервер
  addNewProfileData(name, job)
    .then(() => {
      profileName.textContent = name;
      profileJob.textContent = job;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSave.textContent = "Сохранить";
    });
  closeModal(popup);
};


let cardToDeleteId; // айди карточки (для удаления)
let cardToDelete; // сама карточка (для удаления)

// Функция для открытия попапа подтверждения удаления
const preRemoveCard = (cardElement, cardId) => {
  buttonСonfirmation.textContent = "Да";
  openModal(popupRemoveCard);
  cardToDelete = cardElement;
  cardToDeleteId = cardId;
};

// слушатель кнопки "да", передающий параметры в функцию удаления карточки
removeCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  removeCard(cardToDelete, cardToDeleteId, closeModal, popupRemoveCard, buttonСonfirmation);
});


// Общее закрытие для всех попапов, которые есть и будут + добавление класса с анимацией
buttonCloseModal.forEach((button) => {
  const popup = button.closest(".popup");
  popup.addEventListener("mousedown", closeOutModal);
  button.addEventListener("click", () => closeModal(popup));
  popup.classList.add("popup_is-animated");
});

// переменная с объектами для валидации
const config = {
  formSelector: ".popup__form",
  inputElement: ".popup__input",
  buttonElement: ".popup__button"
}


// вызываем валидацию, передаем настройки
enableValidation(config);

// Функция добавления новой карточки
const addNewCard = (evt) => {
  evt.preventDefault();

  const placeName = placeNameInput.value;
  const link = linkInput.value;

  const buttonSave = popupNewCard.querySelector(".popup__button");
  buttonSave.textContent = "Сохранение...";
  addNewCardData(placeName, link) // добавление на сервер
    .then((data) => {
      const userId = data.owner._id;
      const newCardElement = createCard(data, openImage, like, userId, preRemoveCard);
      placesList.prepend(newCardElement, placesList.firstChild);
      closeModal(popupNewCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSave.textContent = "Сохранить";
    });
};

// Функция добавления нового аватара
const addNewAvatar = (evt) => {
  evt.preventDefault();
  const buttonSave = popupUpdateAvatar.querySelector(".popup__button");
  buttonSave.textContent = "Сохранение...";
  const link = linkImageInput.value;
  addNewAvatarData(link) // добавление на сервер
    .then((data) => {
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;
      closeModal(popupUpdateAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      buttonSave.textContent = "Сохранить";
    });
};

// слушатель открытия попапа "редактировать профиль"
openPopupButtonEditProfile.addEventListener("click", () => {
  openModal(popupEditProfile);
  copyDataProfile();
  clearValidation(editProfileForm, config);
});

// слушатель кнопки для сохранения новых данных профиля
editProfileForm.addEventListener("submit", (evt) =>
  handleFormSubmitProfile(evt, popupEditProfile)
);

// слушатель открытия попапа "новое место"
openPopupNewCardButton.addEventListener("click", () => {
  openModal(popupNewCard);
  clearValidation(newCardForm, config);
  newCardForm.reset();
});

// слушатель кнопки формы для сохранения новой карточки
newCardForm.addEventListener("submit", (evt) => {
  addNewCard(evt);
});

// слушатель кнопки формы сохранения нового аватара
updateAvatarForm.addEventListener("submit", (evt) => {
  addNewAvatar(evt);
});

// слушатель на элемент поверх аватарки при наведении курсором
profileAvatarEdit.addEventListener("mouseover", () => {
  profileAvatar.classList.add('image-hover');
});

 // слушатель на эдемент поверх аватарки при убирании курсора с нее
 profileAvatarEdit.addEventListener("mouseout", () => {
  profileAvatar.classList.remove('image-hover');
});

// слушатель для открытия попапа "обновить аватар"
profileAvatarEdit.addEventListener("click", () => {
  updateAvatarForm.reset();
  clearValidation(updateAvatarForm, config);
  openModal(popupUpdateAvatar);
});