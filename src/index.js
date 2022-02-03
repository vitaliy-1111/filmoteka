
import './sass/main.scss';
import 'basiclightbox/dist/basicLightbox.min.css';
import { movieGenre} from './js/genres.js';

// import * as basicLightbox from 'basiclightbox';
import { paginationMovies, paginationSearchMovies } from './js/pagination.js';
import { fetchMoviesByQuery, fetchMoviesByMedia, fetchMovieById,  fetchMovieDetails } from './js/fetch.js';
import debounce from 'lodash.debounce';
// import './js/filmoteka.js';
import { homePage, libraryPage, modalMovie } from './js/template.js';
import { refs } from './js/refs.js';
import { renderHomeGallery, renderLibraryGallery, renderEmptyGallery, renderModalMovie } from './js/render.js';
import { modalOpen } from './js/modal.js';


let watchedList = [];
let queueList = [];

// modalOpen();
// const instance = basicLightbox.create(modalMovie);

refs.libraryPageLinkEl.addEventListener("click", onLibraryPageLinkEl);
refs.homePageLinkEl.addEventListener("click", onHomePageLinkEl);
refs.searhFormEl.addEventListener('input', debounce((onSearhFormInput), 1000));

fetchMovie("movie");

function fetchMovie(mediaValue) {
  fetchMoviesByMedia(mediaValue).then(resp => {
    console.log(resp);
    const listMovies = resp.results;
    renderHomeGallery(listMovies);
    // paginationMovies();
  })
}

function onSearhFormInput(e) {
  console.log(e.target.value);
  const searchQueryValue = e.target.value;
  // paginationSearchMovies(e.target.value)
  fetchMoviesByQuery(searchQueryValue).then(resp => {
    const listMovies = resp.results;
    renderHomeGallery(listMovies);
  });
}

function onHomePageLinkEl(e) {
  e.preventDefault();
  document.querySelector("header").classList.remove("page-header--library");
  refs.libraryPageLinkEl.classList.remove("library-link--current");
  refs.homePageLinkEl.classList.add("home-link--current");
  refs.searhFormEl.innerHTML = homePage;

  fetchMovie("movie");
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
    renderLibraryGallery(localMovies);
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
      renderLibraryGallery(localMovies, 'watched');
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
      renderLibraryGallery(localMovies, 'queue');
    }
}

function addMovieToQueueLocalStorage(id) {
  const localQueueList = JSON.parse(localStorage.getItem("queueList"));
  localQueueList === null ? localQueueList : queueList = [...localQueueList];
  // queueList = [ ...JSON.parse(localStorage.getItem("queueList"))]
  if (!(queueList.find(item => item.id == id) && true) || false) {
    fetchMovieById(id).then(resp => {
      queueList.push(resp);
      localStorage.setItem("queueList", JSON.stringify(queueList));
    })
  }
}
function addMovieToWatchedLocalStorage(id) {
  console.log(JSON.parse(localStorage.getItem("watchedList")))
  const localWatchedList = JSON.parse(localStorage.getItem("watchedList"));
  localWatchedList === null ? localWatchedList : watchedList = [...localWatchedList];    
  if (!(watchedList.find(item => item.id == id) && true) || false) {
    fetchMovieById(id)
    .then(resp => {
      watchedList.push(resp);
      localStorage.setItem("watchedList", JSON.stringify(watchedList));
    })
  }
}


document.querySelector("body").addEventListener("click", onBody);

function onBody(e) {
  e.preventDefault();
  if (e.target.classList.contains("cinema-gallery__img")) {
    console.log(e.target.id)
    fetchMovieDetails(e.target.id).then(resp => {

      renderModalMovie(resp); 
      refs.modal.classList.toggle('is-hidden');
      refs.modal.classList.toggle('backdrop--is-hidden');
      document.querySelector('body').style.overflow = "hidden";
      document.querySelector('.button-queue').addEventListener('click', onQueueButton)
      document.querySelector('.button-watched').addEventListener('click', onWatchedButton)
      document.querySelector('.button-queue-delete').addEventListener('click', onDeleteQueueButton)
      document.querySelector('.button-watched-delete').addEventListener('click', onDeleteWatchedButton)

      function onQueueButton(event) {
        if (event.target.classList.contains('button-queue')) {
             addMovieToQueueLocalStorage(e.target.id);
           }
          }
        
            function onWatchedButton(event) {
              if (event.target.classList.contains('button-watched')) {
                addMovieToWatchedLocalStorage(e.target.id)
              }
      }
      function onDeleteWatchedButton(event) {
          let localMovies = JSON.parse(localStorage.getItem("watchedList"));
          console.log(localMovies);
          localMovies = localMovies.filter((movie) => movie.id != e.target.id);
          console.log(localMovies)
          localStorage.setItem("watchedList", JSON.stringify(localMovies));
          localMovies = JSON.parse(localStorage.getItem("watchedList"));
           console.log(localMovies)
      }

      function onDeleteQueueButton() {    
       
        let localMovies = JSON.parse(localStorage.getItem("queueList"));
        
        localMovies = localMovies.filter((movie) => movie.id != e.target.id);
        
        localStorage.setItem("queueList", JSON.stringify(localMovies));
        
        localMovies = JSON.parse(localStorage.getItem("queueList"));
        

      }


      

      modalOpen(e.target.id);   
      
    })
  }
  
}  
      
localStorage.removeItem("watchedList")
localStorage.removeItem("queueList")


