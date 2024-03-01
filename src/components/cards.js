export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// Функция создания карточки
export const createCard = (cardDetails, removeCard, openImage, like) => {
  const cardTemplate = document.querySelector("#card-template").content; // Темплейт карточки
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true); // клонирование теплейта
  const deleteButton = cardElement.querySelector(".card__delete-button"); // кнопка удание карточки

  const images = cardElement.querySelector(".card__image"); // сама картинка
  const imageTitle = cardElement.querySelector(".card__title"); // текст под картинкой
  images.src = cardDetails.link;
  images.alt = cardDetails.name;
  imageTitle.textContent = cardDetails.name;

// слушатель для открытия картинки-попапа
  images.addEventListener('click', () => {
    openImage(images.src, images.alt)
  }); 

// слушатель для удаления картинки
  deleteButton.addEventListener("click", () => { 
    removeCard(cardElement);
  });

  return cardElement;
};

// Функция удаления карточки
export const removeCard = (cardElement) => {
  cardElement.remove();
}

// Функция лайка
export const like = (evt) => {
  if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_is-active');
  }
}