
import 'tui-pagination/dist/tui-pagination.css';
import './sass/main.scss';
import { movieGenre } from './js/genres.js';

import Pagination from 'tui-pagination';
import debounce from 'lodash.debounce';
import './js/scroll.js';

import { refs } from './js/refs.js';
import { homePage, libraryPage, modalMovie } from './js/template.js';
import { fetchMoviesByQuery, fetchMoviesByMedia, fetchMovieById,  fetchMovieDetails } from './js/fetch.js';
import { renderHomeGallery, renderLibraryGallery, renderEmptyGallery, renderModalMovie } from './js/render.js';
import { modalOpen } from './js/modal.js';

let watchedList = [];
let queueList = [];
const paginationOptions = {
   totalItems: 0,
    itemPerPage: 20,
    visiblePages: 4,
    page: 1,
}

const homePagination = new Pagination('#tui-pagination-container', paginationOptions);
const homepPaginationPage = homePagination.getCurrentPage();

const searchPagination = new Pagination('#tui-pagination-container', paginationOptions);
const searchPaginationPage = searchPagination.getCurrentPage();



refs.libraryPageLinkEl.addEventListener("click", onLibraryPageLinkEl);
refs.homePageLinkEl.addEventListener("click", onHomePageLinkEl);
refs.logoPageLinkEl.addEventListener("click", onHomePageLinkEl);
refs.logoIconPageLinkEl.addEventListener("click", onHomePageLinkEl);
refs.searhFormEl.addEventListener('input', debounce((onSearhFormInput), 1000));

fetchMovie("movie", homepPaginationPage);
//  onScrollButton();

function fetchMovie(mediaValue, homepPaginationPage) {
  fetchMoviesByMedia(mediaValue, homepPaginationPage).then(resp => {
    console.log(resp);
    homePagination.reset(resp.total_pages);
    const listMovies = resp.results;
    console.log(resp.results);
    renderHomeGallery(listMovies);
    document.querySelector('.cinema-gallery__list').addEventListener('mouseover', mouseEnterOnBackdrop);
    document.querySelector('.cinema-gallery__list').addEventListener('mouseout', mouseOutOnBackdrop);
  });
  homePagination.on('afterMove', (event) => {
    const currentPage = event.page;
    fetchMoviesByMedia(mediaValue, currentPage).then((response) => renderHomeGallery(response.results))
  });
}
function mouseOutOnBackdrop(e) {
    e = e ? e : window.event;
    const from = e.relatedTarget || e.toElement;
    if ((!from || from.nodeName == "HTML")) {
        // alert("left window");
      // if (e.target.classList.contains('backdrop-card')) {
      //    e.target.style.opacity = 0;
      // }
      console.log(e);
    }
  if (e.target.classList.contains("backdrop-card") && !e.relatedTarget.classList.contains('button') &&  !e.relatedTarget.classList.contains('backdrop-average')) {
    e.target.style.opacity = 0
  }
}
function mouseEnterOnBackdrop(e) {
  console.log('mouseover')
  console.log('e.terget',e.target)
  console.log('relatdtarget',e.relatedTarget)
  if (e.target.classList.contains("backdrop-card")) {
    console.log(e.target.style.opacity = 1)
    console.log('yes it backdrop')
    console.log(e.target.id);
    console.log(e.target.childNodes[3].childNodes[1].childNodes[0].textContent)
     let localWatchedList = JSON.parse(localStorage.getItem("watchedList"));
      localWatchedList === null ? localWatchedList : watchedList = [...localWatchedList];    
    if ((watchedList.find(item => item.id == e.target.id) && true) || false) {
         console.log('yes')
         e.target.childNodes[3].childNodes[1].childNodes[0].textContent = "added to your watched list";
    } 
     const localQueueList = JSON.parse(localStorage.getItem("queueList"));
      localQueueList === null ? localQueueList : queueList = [...localQueueList];
      if ((queueList.find(item => item.id == e.target.id) && true) || false) {
       e.target.childNodes[3].childNodes[3].childNodes[0].textContent = "added on your queue list";
      } 
  }
}
function onSearhFormInput(event) {
  const searchQueryValue = event.target.value;
  // paginationSearchMovies(event.target.value)
  fetchMoviesByQuery(searchQueryValue, searchPaginationPage).then(resp => {
     searchPagination.reset(resp.total_pages);
    const listMovies = resp.results;
    renderHomeGallery(listMovies);
  });
 searchPagination.on('afterMove', (event) => {
   const currentPage = event.page;
   fetchMoviesByQuery(searchQueryValue, currentPage).then((response) => { console.log('search result', response); renderHomeGallery(response.results) })
  });
}

function onHomePageLinkEl(e) {
  e.preventDefault();
  refs.paginationContainerEl.classList.remove("visually-hidden");
  document.querySelector("header").classList.remove("page-header--library");
  refs.libraryPageLinkEl.classList.remove("library-link--current");
  refs.homePageLinkEl.classList.add("home-link--current");
  refs.searhFormEl.innerHTML = homePage;

  fetchMovie("movie", homepPaginationPage);
}

function onLibraryPageLinkEl(e) {
  e.preventDefault();
  refs.paginationContainerEl.classList.add("visually-hidden");
  document.querySelector("header").classList.add("page-header--library");
  refs.homePageLinkEl.classList.remove("home-link--current");
  refs.libraryPageLinkEl.classList.add("library-link--current"); 
  refs.searhFormEl.innerHTML = libraryPage;
  // console.log('library',e.currentTarget);
  // if (e.target.classList.contains("cinema-gallery__img")) {
  //   console.log('library', e.target.id)
  // }
  
  const localMovies = JSON.parse(localStorage.getItem("watchedList"));
  console.log(localMovies);
  if (localMovies === null) {
    renderEmptyGallery();
  } else {
    renderLibraryGallery(localMovies);
    console.log(localMovies)
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
    fetchMovieById(id).then(resp => {
      watchedList.push(resp);
      localStorage.setItem("watchedList", JSON.stringify(watchedList));
    })
  }
}


document.querySelector("body").addEventListener("click", onBody);

function onBody(e) {
  e.preventDefault();
  if (e.target.classList.contains("button-queue--backdrop")) {
    addMovieToQueueLocalStorage(e.target.id);
  }
  if (e.target.classList.contains("button-watched--backdrop")) {
    addMovieToWatchedLocalStorage(e.target.id);
  }

  if (e.target.classList.contains("button-more")) {
    console.log(e.target)

    fetchMovieDetails(e.target.id).then(resp => {

      renderModalMovie(resp); 
      refs.modal.classList.toggle('is-hidden');
      refs.modal.classList.toggle('backdrop--is-hidden');
      document.querySelector('body').style.overflow = "hidden";
      document.querySelector('.button-queue').addEventListener('click', onQueueButton)
      document.querySelector('.button-watched').addEventListener('click', onWatchedButton)
       
      const localWatchedList = JSON.parse(localStorage.getItem("watchedList"));
      localWatchedList === null ? localWatchedList : watchedList = [...localWatchedList];    
       if ((watchedList.find(item => item.id == e.target.id) && true) || false) {
         document.querySelector('.button-watched').textContent = "is on your watched list";
       } 

      const localQueueList = JSON.parse(localStorage.getItem("queueList"));
      localQueueList === null ? localQueueList : queueList = [...localQueueList];
       if ((queueList.find(item => item.id == e.target.id) && true) || false) {
        document.querySelector('.button-queue').textContent = "is on your queue list";
       } 

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

      function onDeleteWatchedButton() {
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

// localStorage.removeItem("watchedList")
// localStorage.removeItem("queueList")
