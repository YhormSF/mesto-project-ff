import { removeCardData, addLikeData, removeLikeData } from "./api";
// Функция создания карточки
export const createCard = (cardDetails,openImage,like,userId,preRemoveCard) => {
  const cardTemplate = document.querySelector("#card-template").content; // Темплейт карточки
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true); // клонирование темплейта
  const deleteButton = cardElement.querySelector(".card__delete-button"); // кнопка удаления карточки
  const likeButton = cardElement.querySelector(".card__like-button"); // кнопка лайка

  const image = cardElement.querySelector(".card__image"); // сама картинка
  const imageTitle = cardElement.querySelector(".card__title"); // текст под картинкой

  image.src = cardDetails.link;
  image.alt = cardDetails.name;
  imageTitle.textContent = cardDetails.name;

  const likeCountierElement = cardElement.querySelector(".like-counter"); // место для чисел лайков
  const cardId = cardDetails._id; // id карточки

  // вызов расстановки лайков
  updateCardInerface(cardDetails, likeCountierElement, likeButton, userId);

  // проверка создана ли карточка нами или нет (чтобы решить оставить или убрать кнопку удаления)
  if (cardDetails.owner && cardDetails.owner._id !== userId) {
    deleteButton.remove();
  } else {
     // слушатель кнопки удаления для открытия окна подтверждения удаления
    deleteButton.addEventListener("click", () => {
    preRemoveCard(cardElement, cardId);
    });
  };

  // слушатель кнопки лайка
  likeButton.addEventListener("click", () => {
    like(likeButton, cardId, likeCountierElement);
  });

  // слушатель карточки для открытия картинки-попапа
  image.addEventListener("click", () => {
    openImage(cardDetails.link, cardDetails.name);
  });

  return cardElement;
};

// Функция расстановки лайков
// выводим количество лайков и проверяем есть ли лайк от пользователя
const updateCardInerface = (cardDetails, likeCountierElement, likeButton, userId) => {
  if (cardDetails.likes.length > 0) {
    likeCountierElement.textContent = cardDetails.likes.length; // вывод количества лайков в span-элементы на карточку
    // здесь происходит проверка лайка от пользователя
    if (cardDetails.likes.some((like) => like._id === userId)) {
      likeButton.classList.add("card__like-button_is-active");
    }
  } else {
    likeCountierElement.textContent = ""; // иначе скрываем счетчик
  }
};

// Удаление карточки с сервера
export const removeCard = (cardElement, cardId, closeModal, popup, button) => {
  button.textContent = "Удаляем...";
  removeCardData(cardId)
    .then(() => {
      console.log("Карточка удалена");
      cardElement.remove();
      closeModal(popup);
    })
    .catch((err) => console.log(err));
};

// Функция лайка, ставит или удаляет, в зависимости от класса на кнопке
export const like = (likeButton, cardId, likeCountierElement) => {
const likeMethod = likeButton.classList.contains("card__like-button_is-active") ? removeLikeData : addLikeData;
likeMethod(cardId) 
        .then((res) => {
           likeCountierElement.textContent = res.likes.length || ""; 
           likeButton.classList.toggle("card__like-button_is-active"); 
        })
.catch(err => console.log(err));
};