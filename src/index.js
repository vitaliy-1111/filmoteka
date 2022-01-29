
import './sass/main.scss';
// import './js/filmoteka.js';
const homePage = `<form class="search-form">
      <input class="search-form__input" placeholder="Search films"></input>
      <button class="search-form__button" type="submit">
        <svg class="icon-search" width="12" height="12">
          <use href="./images/icons.svg#icon-search"></use>
        </svg>
      </button>
    </form>
    <p class="visually-hidden search-result-text">
      Search result not successful. Enter the correct movie name and try
      again
    </p>`;
const libraryPage = `
    <button>button1</button>
    <button>button2</button>    
    <p class="visually-hidden search-result-text">
      Search result not successful. Enter the correct movie name and try
      again
    </p>
  </div>`;
const libraryGallery = `  <div class="container">
    <ul class="cinema-gallery__list list">
      <li class="cinema-gallery__item">
        <div class="thumb-img">
          <img class="cinema-gallery__img" src="./images/home-bg-320-1x-min.jpg">

        </div>
        <div class="thumb-text">
          <p class="cinema-gallery__name">Movie title</p>
          <p class="cinema-gallery__text">Genre and year</p>
        </div>

      </li>
      <li class="cinema-gallery__item">
        <div class="thumb-img">
          <img class="cinema-gallery__img" src="./images/home-bg-320-1x-min.jpg">

        </div>
        <div class="thumb-text">
          <p class="cinema-gallery__name">Movie title</p>
          <p class="cinema-gallery__text">Genre and year</p>
        </div>

      </li>
    </ul>
  </div>`;

const refs = {
  homePageLinkEl: document.querySelector("a.home-link"),
  libraryPageLinkEl: document.querySelector("a.library-link"),
  headerEl: document.querySelector("header.page-header"),
  body: document.querySelector("body"),
  textSearchResult: document.querySelector("p.search-result-text"),
  nav: document.querySelector("nav.nav"),
  searhFormEl: document.querySelector("form.search-form"),
  gallery: document.querySelector(".cinema-gallery"),
  
}

refs.homePageLinkEl.addEventListener("click", onHomePageLinkEl);
refs.libraryPageLinkEl.addEventListener("click", onLibraryPageLinkEl);
// refs.textSearchResult.classList.add("visually-hidden");


// refs.headerEl.insertAdjacentHTML('afterend', homePage);


function onLibraryPageLinkEl(e) {
  e.preventDefault();
  document.querySelector("header").classList.add("page-header--library")
  refs.libraryPageLinkEl.classList.add("library-link--current")
  refs.homePageLinkEl.classList.remove("home-link--current")

  //  refs.nav.insertAdjacentHTML('afterend', libraryPage);
  refs.searhFormEl.innerHTML = libraryPage;
  refs.gallery.innerHTML = libraryGallery;
}

function onHomePageLinkEl(e) {
  e.preventDefault();
  document.querySelector("header").classList.remove("page-header--library")
  refs.libraryPageLinkEl.classList.remove("library-link--current")
  refs.homePageLinkEl.classList.add("home-link--current")
 refs.searhFormEl.innerHTML = homePage;
}



