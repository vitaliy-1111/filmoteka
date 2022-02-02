export function modalOpen() {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };

  refs.openModalBtn.addEventListener('click', toggleModal);
  refs.closeModalBtn.addEventListener('click', oncloseModalBtn);

  function toggleModal() {
    refs.modal.classList.toggle('is-hidden');
    refs.modal.classList.toggle('backdrop--is-hidden');
    document.querySelector('body').style.overflow = "hidden";
  }
  function oncloseModalBtn() {
    refs.modal.classList.toggle('is-hidden');
    refs.modal.classList.toggle('backdrop--is-hidden');
    document.querySelector('body').style.overflow = "auto";
  }

}
  
