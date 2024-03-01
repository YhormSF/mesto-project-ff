// Функция для открытия модальных окон
export const openModal = (modalElement) => {
  modalElement.classList.add('popup_is-opened');
  document.addEventListener('keyup', closeModalEsc); // добавление слушателя ESC при открытии окна
}
// Функция для закрытия модальных окон
export const closeModal = (modalElement) => {
  modalElement.classList.remove('popup_is-opened');
  document.removeEventListener('keyup', closeModalEsc); // удаление слушателя ESC при закрытии окна
}

// Функция закрытия при ESC
export const closeModalEsc = (evt) => {
  if (evt.key === 'Escape') {
    const popupIsOpen = document.querySelector('.popup_is-opened');
    closeModal(popupIsOpen);
  }
}

// Функция закрытия модального окна, если нажать за его пределы
export const closeOutModal = (evt) => {
  if (evt.target.classList.contains('popup')) {
    closeModal(evt.target);
  }
}