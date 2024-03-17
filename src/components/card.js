import { getRemoveCard, addLikeData, removeLikeData } from "./api";
// Функция создания карточки
export const createCard = (cardDetails,openImage,like,userId,preRemoveCard) => {
  const cardTemplate = document.querySelector("#card-template").content; // Темплейт карточки
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true); // клонирование темплейта
  const deleteButton = cardElement.querySelector(".card__delete-button"); // кнопка удаления карточки
  const likeButton = cardElement.querySelector(".card__like-button"); // кнопка лайка

  const images = cardElement.querySelector(".card__image"); // сама картинка
  const imageTitle = cardElement.querySelector(".card__title"); // текст под картинкой

  images.src = cardDetails.link;
  images.alt = cardDetails.name;
  imageTitle.textContent = cardDetails.name;

  const likeCountierElement = cardElement.querySelector(".like-counter"); // место для чисел лайков
  const cardId = cardDetails._id; // id карточки

  // вызов расстановки лайков
  updateCardInerface(cardDetails, likeCountierElement, likeButton, userId);

  // проверка создана ли карточка нами или нет (чтобы решить оставить или убрать кнопку удаления)
  if (cardDetails.owner && cardDetails.owner._id !== userId) {
    deleteButton.remove();
  }

  // слушатель кнопки лайка
  likeButton.addEventListener("click", () => {
    like(likeButton, cardId, likeCountierElement);
  });

  // слушатель кнопки удаления для открытия окна подтверждения удаления
  deleteButton.addEventListener("click", () => {
    preRemoveCard(cardElement, cardId);
  });

  // слушатель карточки для открытия картинки-попапа
  images.addEventListener("click", () => {
    openImage(cardDetails.link, cardDetails.name);
  });

  return cardElement;
};

// Функция расстановки лайков
// выводим количеством лайков и проверяем есть ли лайк от пользователя
const updateCardInerface = (cardDetails,likeCountierElement,likeButton,userId) => {
  if (cardDetails.likes.length > 0) {
    likeCountierElement.textContent = cardDetails.likes.length; // вывод количества лайков в span-элементы на карточку
    const likedUserId = cardDetails.likes.map((like) => like._id); // здесь происходит проверка лайка от пользователя
    if (likedUserId.includes(userId)) {
      likeButton.classList.add("card__like-button_is-active");
    }
  } else {
    likeCountierElement.textContent = ""; // иначе скрываем счетчик
  }
};

// Удаление карточки с сервера
export function removeCard(cardElement, cardId, closeModal, popup, button) {
  button.textContent = "Удаляем...";
  getRemoveCard(cardId)
    .then(() => {
      console.log("Карточка удалена");
      cardElement.remove();
      closeModal(popup);
    })
    .catch((err) => console.log(err));
}

// Функция лайка, передача на сервер, если успешно - ставится или удаляется лайк
export const like = (likeButton, cardId, likeCountierElement) => {
  if (!likeButton.classList.contains("card__like-button_is-active")) {
    addLikeData(cardId) // добавление лайка на сервер
      .then((data) => {
        likeButton.classList.add("card__like-button_is-active");
        likeCountierElement.textContent = data.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    removeLikeData(cardId) // удаление лайка с сервера
      .then((data) => {
        likeButton.classList.remove("card__like-button_is-active");
        if (data.likes.length > 0) {
          likeCountierElement.textContent = data.likes.length;
        } else {
          likeCountierElement.textContent = "";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};
