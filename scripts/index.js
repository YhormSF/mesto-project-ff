// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;


// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
const cardCreate = (cardDetails) => {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // клонирование теплейта
  const buttonDelete = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = cardDetails.link;
  cardElement.querySelector('.card__title').textContent = cardDetails.name;

  buttonDelete.addEventListener('click', () => {
    cardRemove(cardElement);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function cardRemove(cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  placesList.append(cardCreate(item));
});
