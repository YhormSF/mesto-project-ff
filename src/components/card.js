// Функция создания карточки
export const createCard = (cardDetails, removeCard, openImage, like) => {
  const cardTemplate = document.querySelector("#card-template").content; // Темплейт карточки
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true); // клонирование темплейта
  const deleteButton = cardElement.querySelector(".card__delete-button"); // кнопка удаления карточки

  const liteButton = cardElement.querySelector('.card__like-button');

  const images = cardElement.querySelector(".card__image"); // сама картинка
  const imageTitle = cardElement.querySelector(".card__title"); // текст под картинкой
  images.src = cardDetails.link;
  images.alt = cardDetails.name;
  imageTitle.textContent = cardDetails.name;

// слушатель для открытия картинки-попапа
  images.addEventListener('click', () => {
    openImage(cardDetails.link, cardDetails.name, cardDetails.alt)
  }); 

// слушатель для удаления картинки
  deleteButton.addEventListener("click", () => { 
    removeCard(cardElement);
  });

  liteButton.addEventListener('click', like); 

  return cardElement;
};

// Функция удаления карточки
export const removeCard = (cardElement) => {
  cardElement.remove();
}

// Функция лайка
export const like = (evt) => {
    evt.target.classList.toggle('card__like-button_is-active');
}