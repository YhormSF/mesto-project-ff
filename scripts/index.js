// @todo: Темплейт карточки
  const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
  const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
  const createCard = (cardDetails, removeCard) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true); // клонирование теплейта
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardElement.querySelector(".card__image").src = cardDetails.link;
  cardElement.querySelector(".card__image").alt = cardDetails.name;
  cardElement.querySelector(".card__title").textContent = cardDetails.name;
  
  deleteButton.addEventListener("click", () => { 
    removeCard(cardElement);
  });

  return cardElement;
};

// @todo: Функция удаления карточки
const removeCard = cardElement => {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  placesList.append(createCard(item, removeCard));
});