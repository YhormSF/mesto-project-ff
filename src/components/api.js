// переменная API
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-8",
  headers: {
    authorization: "a4262d8e-29e6-4116-b9b1-a461c8ef5c6d",
  },
};

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

// Функция для получения информации о пользователе и карточках
export function getInitialData() {
  // Получение информации о пользователе с сервера
  const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: config.headers.authorization,
      },
    }).then(handleResponse);
  };

  // Получение карточек с сервера
  const getCardsData = () => {
    return fetch(`${config.baseUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: config.headers.authorization,
      },
    }).then(handleResponse);
  };

  // Загрузка информации о пользователе и карточек с сервера + их вывод
  return Promise.all([getUserData(), getCardsData()])
  .then(([userData, cardsData]) => {
      return { userData, cardsData };
    }
  );
};

// Функция удаления карточки с сервера
export const removeCardData = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(handleResponse);
};

// Функция добавления новых данных профиля на сервер
export const addNewProfileData = (name, job) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      about: job,
    }),
  }).then(handleResponse);
};

// Функция добавления новой карточки на сервер
export const addNewCardData = (placeName, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: placeName,
      link: link,
    }),
  }).then(handleResponse);
};

// Фукнция для обновления аватара на сервер
export const addNewAvatarData = (newAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: {
      authorization: config.headers.authorization,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      avatar: newAvatar,
    }),
  }).then(handleResponse);
};

// Функция лайка и отправление лайка на сервер
export const addLikeData = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(handleResponse)
    .then((data) => {
      return data;
    });
};

// Функция удаления лайка и с сервера
export const removeLikeData = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: {
      authorization: config.headers.authorization,
    },
  }).then(handleResponse)
    .then((data) => {
      return data;
    });
};
