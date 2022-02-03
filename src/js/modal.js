import { refs } from './refs.js';
import { fetchMovieById } from './fetch.js';
export function modalOpen() {


  // refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', oncloseModalBtn);

 

  function oncloseModalBtn() {
    refs.modal.classList.add('is-hidden');
    refs.modal.classList.add('backdrop--is-hidden');
    document.querySelector('body').style.overflow = "auto";

  }

}