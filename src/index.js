// добавление стилей для вебпака
import './pages/index.css'; 

// добавление массива с картинками карточек для вебпака
import { initialCards, createCard, removeCard, like } from './components/cards.js' 

// импорт функций открытия и закрытия модальных окон
import { openModal, closeModal, openImage} from './components/modal.js';

// импорт функций для добавления ифнормации, введенных в форму
import { copyDataProfile, handleFormSubmitProfile, handleFormSubmitNewCard} from './components/modal.js';


// DOM узлы:
const placesList = document.querySelector(".places__list"); // область с карточками

// переменные для открытия попапа-картинки
const popupImage = document.querySelector('.popup_type_image'); // сам попап-картинка
const closePopupButtonImage = popupImage.querySelector('.popup__close'); // кнопка-крестик для закрытия картинки-попапа

// переменные для попапа "редактировать профиль"
const popupEditProfile = document.querySelector('.popup_type_edit'); // сам попап "редактировать профиль"
const openPopupButtonEditProfile = document.querySelector('.profile__edit-button'); //кнопка для изменения профиля
const closePopupButtonEditProfile = popupEditProfile.querySelector('.popup__close'); // кнопка-крестик для закрытия попапа "редактировать профиль"

// переменные для попапа "новое место"
const popupNewCard = document.querySelector('.popup_type_new-card'); // сам попап "новое место"
const openPopupNewCardButton = document.querySelector('.profile__add-button'); // кнопка для открытия попапа "новое место"
const closePopupButtonNewCard = popupNewCard.querySelector('.popup__close'); // кнопка-крестик для закрытия попапа "новое место"


const profileName = document.querySelector('.profile__title'); // имя профиля на странице
const profileJob = document.querySelector('.profile__description'); // деятельность профиля на странице

// переменные форм
const editProfileForm  = document.forms.editProfile; // форма "редактировать профиль"
const nameInput = editProfileForm.elements.name; // поле "имя" формы "редактировать профиль"
const jobInput = editProfileForm.elements.description; // поле "детельность" формы "редактировать профиль"

const newCardForm = document.forms.newPlace; // форма "новое место"

// Вывод карточек на страницу
initialCards.forEach((item) => {
  placesList.append(createCard(item, removeCard, openImage, like));
});


// Добавление класса для плавного открытия/закрытия попапов
popupImage.classList.add('popup_is-animated');
popupNewCard.classList.add('popup_is-animated');
popupEditProfile.classList.add('popup_is-animated');

// слушатель открытия попапа "редактировать профиль"
openPopupButtonEditProfile.addEventListener('click', () => {
  openModal(popupEditProfile); 
  copyDataProfile(profileName, profileJob, nameInput, jobInput);
});  

// слушатель открытия попапа "новое место"
openPopupNewCardButton.addEventListener('click', () => 
openModal(popupNewCard)); 


// слушатель закрытия попапа "редактировать профиль"
closePopupButtonEditProfile.addEventListener('click', () => 
closeModal(popupEditProfile));

// слушатель закрытия попапа "новое место"
closePopupButtonNewCard.addEventListener('click', () => 
closeModal(popupNewCard)); 

// слушатель для закрытия картинки-попапа
closePopupButtonImage.addEventListener('click', () => 
closeModal(popupImage));

// слушатель кнопки для сохрания новых данных профиля
 editProfileForm.addEventListener('submit', (evt) => 
 handleFormSubmitProfile(evt, profileName, profileJob, nameInput, jobInput, popupEditProfile)); 

// слушатель кнопки для сохранения новой карточки
newCardForm.addEventListener('submit', (evt) => 
handleFormSubmitNewCard(evt, createCard, removeCard, newCardForm, placesList, popupNewCard)); 

// слушатель для лайка
placesList.addEventListener('click', like); 






