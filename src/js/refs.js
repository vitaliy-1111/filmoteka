
export const refs = {
  homePageLinkEl: document.querySelector("a.home-link"),
  libraryPageLinkEl: document.querySelector("a.library-link"),
  logoPageLinkEl: document.querySelector('.logo-link--title'),
  logoIconPageLinkEl: document.querySelector('.logo-link--icon'),

  headerEl: document.querySelector("header.page-header"),

  body: document.querySelector("body"),

  textSearchResult: document.querySelector("p.search-result-text"),
  nav: document.querySelector("nav.nav"),
  searhFormEl: document.querySelector("form.search-form"),
  gallery: document.querySelector(".cinema-gallery"),
  galleryListEl: document.querySelector(".cinema-gallery__list"),
  modalMovie: document.querySelector(".modal-movie"),
  openModalBtn: document.querySelector('[data-modal-open]'),
  closeModalBtn: document.querySelector('[data-modal-close]'),
  modal: document.querySelector('[data-modal]'),
  queueButtonEl: document.querySelector('.button-queue'),
  watchedButtonEl: document.querySelector('.button-watched'),
}