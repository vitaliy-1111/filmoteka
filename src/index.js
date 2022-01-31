
import './sass/main.scss';
import './js/genres.js';
// import './js/filmoteka.js';
import { homePage, libraryPage } from './js/template.js';
const refs = {
  homePageLinkEl: document.querySelector("a.home-link"),
  libraryPageLinkEl: document.querySelector("a.library-link"),
  headerEl: document.querySelector("header.page-header"),
  body: document.querySelector("body"),
  textSearchResult: document.querySelector("p.search-result-text"),
  nav: document.querySelector("nav.nav"),
  searhFormEl: document.querySelector("form.search-form"),
  gallery: document.querySelector(".cinema-gallery"),
  galleryListEl: document.querySelector(".cinema-gallery__list"),  
}
refs.libraryPageLinkEl.addEventListener("click", onLibraryPageLinkEl);
refs.homePageLinkEl.addEventListener("click", onHomePageLinkEl);

let watchedList = [];
let queueList = [];

fetchMovie("movie");

function fetchMovie(media) {
  fetch(`https://api.themoviedb.org/3/trending/${media}/day?api_key=c54b9b3bc824900bd0fc655039f09ff1`).then(resp => resp.json()).then(resp => {
    const listMovies = resp.results;
    const gallery = listMovies.map(movie => `<li class="cinema-gallery__item">
        <div class="thumb-img">
          <img class="cinema-gallery__img img" src=" https://image.tmdb.org/t/p/w500${movie.poster_path}" id="${movie.id}">
           <div class="button-wrap">
            <button class="button button-watched" id="${movie.id}">Watched</button>
            <button class="button button-queue" id="${movie.id}">Queue</button>
          </div>
        </div>
        <div class="thumb-text">
          <p class="cinema-gallery__name">${movie.name || movie.title}</p>
          <p class="cinema-gallery__text">${movie.genre_ids} | ${movie.release_date || movie.first_air_date}</p>
        </div>`);    
    refs.galleryListEl.innerHTML = gallery.join("");
  })
}
function onLibraryPageLinkEl(e) {
  e.preventDefault();
  document.querySelector("header").classList.add("page-header--library");
  refs.homePageLinkEl.classList.remove("home-link--current");
  refs.libraryPageLinkEl.classList.add("library-link--current"); 
  refs.searhFormEl.innerHTML = libraryPage;

  const localMovies = JSON.parse(localStorage.getItem("watchedList"));
  renderGallery(localMovies);
}

function onHomePageLinkEl(e) {
  e.preventDefault();
  document.querySelector("header").classList.remove("page-header--library")
  refs.libraryPageLinkEl.classList.remove("library-link--current")
  refs.homePageLinkEl.classList.add("home-link--current")
  refs.searhFormEl.innerHTML = homePage;
  fetchMovie("movie")
}

document.querySelector("body").addEventListener("click", onBody);

function onBody(e) {
   e.preventDefault();
  if (e.target.classList.contains("library-button--queue")) {
    e.target.classList.add("library-button--active")
    e.target.previousElementSibling.classList.remove("library-button--active");
    const localMovies = JSON.parse(localStorage.getItem("queueList"));
    renderGallery(localMovies);
  }
  if (e.target.classList.contains("library-button--watched")) {
    e.target.classList.add("library-button--active")
    e.target.nextElementSibling.classList.remove("library-button--active");
    const localMovies = JSON.parse(localStorage.getItem("watchedList"));
     renderGallery(localMovies);
  }

  if (e.target.classList.contains("button-watched")) {
    watchedList = [ ...JSON.parse(localStorage.getItem("watchedList"))]
    if (!(watchedList.find(item => item.id == e.target.id) && true) || false) {
       fetch(`https://api.themoviedb.org/3/movie/${e.target.id}?api_key=c54b9b3bc824900bd0fc655039f09ff1&language=en-US`)
      .then(resp => resp.json())
      .then(resp => { 
          watchedList.push(resp);
        console.log(resp);
        console.log(watchedList);
      
      localStorage.setItem("watchedList", JSON.stringify(watchedList));
    })
  }   
  }

  if (e.target.classList.contains("button-queue")) {
    console.log(e.target.id);
    queueList = [ ...JSON.parse(localStorage.getItem("queueList"))]
    if (!(queueList.find(item => item.id == e.target.id) && true) || false) {
      fetch(`https://api.themoviedb.org/3/movie/${e.target.id}?api_key=c54b9b3bc824900bd0fc655039f09ff1&language=en-US`).then(resp => resp.json()).then(resp => {
        queueList.push(resp);
        localStorage.setItem("queueList", JSON.stringify(queueList));
      })
    }
  }
}

function renderGallery(movies) {
         const gallery = movies.map(movie => `<li class="cinema-gallery__item">
       <div class="thumb-img">
          <img class="cinema-gallery__img img" src=" https://image.tmdb.org/t/p/w500${movie.poster_path}" id="${movie.id}">
          <div class="button-wrap">
            <button class="button button-watched" id="${movie.id}">Watched</button>
            <button class="button button-queue" id="${movie.id}">Queue</button>
          </div>
      </div>
       <div class="thumb-text">
          <p class="cinema-gallery__name">${movie.name || movie.title}</p>
         <p class="cinema-gallery__text">${movie.genres.map(genre => genre.name) } | ${movie.release_date || movie.first_air_date}</p>
        </div>`);
  refs.galleryListEl.innerHTML = gallery.join("");
}
// import fetch from "./js/filmoteka.js";

// fetch();