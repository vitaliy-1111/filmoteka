
import './sass/main.scss';
import 'basiclightbox/dist/basicLightbox.min.css';
import './js/genres.js';

import * as basicLightbox from 'basiclightbox';
import { paginationMovies, paginationSearchMovies } from './js/pagination.js';
import { fetchMoviesByQuery, fetchMoviesByMedia, fetchMovieById } from './js/fetch.js';
import debounce from 'lodash.debounce';
// import './js/filmoteka.js';
import { homePage, libraryPage } from './js/template.js';
import { refs } from './js/refs.js';
import { renderNewGallery, renderEmptyGallery } from './js/render.js';

let watchedList = [];
let queueList = [];

const instance = basicLightbox.create(`
	<h1>Dynamic Content</h1>
	<p>You can set the content of the lightbox with JS.</p>
`);

refs.libraryPageLinkEl.addEventListener("click", onLibraryPageLinkEl);
refs.homePageLinkEl.addEventListener("click", onHomePageLinkEl);
refs.searhFormEl.addEventListener('input', debounce((onSearhFormInput), 1000));

fetchMovie("movie");

function onSearhFormInput(e) {
  console.log(e.target.value);
  const searchQueryValue = e.target.value;
  // paginationSearchMovies(e.target.value)
  fetchMoviesByQuery(searchQueryValue).then(resp => {
    const listMovies = resp.results;
    renderNewGallery(listMovies);
  });
}

function fetchMovie(mediaValue) {
  const media = mediaValue;
  fetchMoviesByMedia(media).then(resp => {
    const listMovies = resp.results;
    renderNewGallery(listMovies);
    // paginationMovies();
  })
}

function onHomePageLinkEl(e) {
  e.preventDefault();
  document.querySelector("header").classList.remove("page-header--library")
  refs.libraryPageLinkEl.classList.remove("library-link--current")
  refs.homePageLinkEl.classList.add("home-link--current")
  refs.searhFormEl.innerHTML = homePage;
  fetchMovie("movie")
}

function onLibraryPageLinkEl(e) {
  e.preventDefault();
  document.querySelector("header").classList.add("page-header--library");
  refs.homePageLinkEl.classList.remove("home-link--current");
  refs.libraryPageLinkEl.classList.add("library-link--current"); 
  refs.searhFormEl.innerHTML = libraryPage;

  const localMovies = JSON.parse(localStorage.getItem("watchedList"));
  console.log(localMovies);
  if (localMovies === null) {
    renderEmptyGallery();
  } else {
    renderNewGallery(localMovies);
  }
  document.querySelector(".library-button--watched").addEventListener('click', onLibBtnWatched)
  document.querySelector(".library-button--queue").addEventListener('click', onLibBtnQueue)
}
function onLibBtnWatched() {
  console.log("it's work, wathed");
  document.querySelector(".library-button--queue").classList.remove("library-button--active");
  document.querySelector(".library-button--watched").classList.add("library-button--active");
  const localMovies = JSON.parse(localStorage.getItem("watchedList"));
  if (localMovies === null) {
      renderEmptyGallery();
    } else {
      renderNewGallery(localMovies, 'watched');
  }

}

function onLibBtnQueue() {
  console.log('queue')
  document.querySelector(".library-button--queue").classList.add("library-button--active");
  document.querySelector(".library-button--watched").classList.remove("library-button--active");
  const localMovies = JSON.parse(localStorage.getItem("queueList"));
    if (localMovies === null) {
      renderEmptyGallery();
    } else {
      renderNewGallery(localMovies, 'queue');
    }
}



document.querySelector("body").addEventListener("click", onBody);

function onBody(e) {
   e.preventDefault();
  // if (e.target.classList.contains("library-button--queue")) {
  //   // e.target.classList.add("library-button--active")
  //   // e.target.previousElementSibling.classList.remove("library-button--active");
  //   // const localMovies = JSON.parse(localStorage.getItem("queueList"));
  //   // if (localMovies === null) {
  //   //   renderEmptyGallery();
  //   // } else {
  //   //   renderNewGallery(localMovies);
  //   // }
  // }
  // if (e.target.classList.contains("library-button--watched")) {
  //   // e.target.classList.add("library-button--active")
  //   // e.target.nextElementSibling.classList.remove("library-button--active");
  //   // const localMovies = JSON.parse(localStorage.getItem("watchedList"));
  //   // if (localMovies === null) {
  //   //   renderEmptyGallery();
  //   // } else {
  //   //   renderNewGallery(localMovies);
  //   // }
  // }
   if (e.target.classList.contains("button-watched-delete")) {
     let localMovies = JSON.parse(localStorage.getItem("watchedList"));
     localMovies = localMovies.filter((movie) => movie.id != e.target.id);
     localStorage.setItem("watchedList", JSON.stringify(localMovies));
     localMovies = JSON.parse(localStorage.getItem("watchedList"));
  }
   if (e.target.classList.contains("button-queue-delete")) {
     let localMovies = JSON.parse(localStorage.getItem("queueList"));
     localMovies = localMovies.filter((movie) => movie.id != e.target.id);
     localStorage.setItem("queueList", JSON.stringify(localMovies));
     localMovies = JSON.parse(localStorage.getItem("queueList"));
  }

  if (e.target.classList.contains("button-watched")) {
    console.log(JSON.parse(localStorage.getItem("watchedList")))
    const localWatchedList = JSON.parse(localStorage.getItem("watchedList"));
    localWatchedList === null ? localWatchedList : watchedList = [...localWatchedList];    
    if (!(watchedList.find(item => item.id == e.target.id) && true) || false) {
      fetchMovieById(e.target.id)
        .then(resp => {
          watchedList.push(resp);      
          localStorage.setItem("watchedList", JSON.stringify(watchedList));
        })
    }
    instance.show();
  }  

  if (e.target.classList.contains("button-queue")) {
     const localQueueList = JSON.parse(localStorage.getItem("queueList"));
    localQueueList === null ? localQueueList : queueList = [...localQueueList]; 
    // queueList = [ ...JSON.parse(localStorage.getItem("queueList"))]
    if (!(queueList.find(item => item.id == e.target.id) && true) || false) {
      fetchMovieById(e.target.id).then(resp => {
        queueList.push(resp);
        localStorage.setItem("queueList", JSON.stringify(queueList));
      })
    }
  }
}
localStorage.removeItem("watchedList")
localStorage.removeItem("queueList")





