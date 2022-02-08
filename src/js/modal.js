import { refs } from './refs.js';

export function modalOpen() {
  refs.closeModalBtn.addEventListener('click', oncloseModalBtn);
   refs.scrollButtonEl.classList.add('visually-hidden');
  function oncloseModalBtn() {
    refs.modal.classList.add('is-hidden');
    refs.modal.classList.add('backdrop--is-hidden');
    document.querySelector('body').style.overflow = "auto";
  }
}