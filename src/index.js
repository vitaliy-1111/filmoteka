
import 'tui-pagination/dist/tui-pagination.css';
import './sass/main.scss';
import { movieGenre } from './js/genres.js';

import Pagination from 'tui-pagination';
import debounce from 'lodash.debounce';
import './js/scroll.js';

import { refs } from './js/refs.js';
import { homePage, libraryPage, modalMovie } from './js/template.js';
import { fetchMoviesByQuery, fetchMoviesByMedia, fetchMovieById,  fetchMovieDetails } from './js/fetch.js';
import { renderHomeGallery, renderLibraryGallaryWathed, renderLibraryGallaryQueue, renderEmptyGallery, renderModalMovie } from './js/render.js';
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
document.querySelector('.cinema-gallery__list').addEventListener('mouseover', mouseEnterOnBackdrop);
    document.querySelector('.cinema-gallery__list').addEventListener('mouseout', mouseOutOnBackdrop);

fetchMovie("movie", homepPaginationPage);
//  onScrollButton();

function fetchMovie(mediaValue, homepPaginationPage) {
  document.querySelector('.search-result-text').classList.add('visually-hidden');

  fetchMoviesByMedia(mediaValue, homepPaginationPage).then(resp => {
    console.log(resp);
    homePagination.reset(resp.total_pages);
    const listMovies = resp.results;
    console.log(resp.results);
    renderHomeGallery(listMovies);
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
      if (e.target.classList.contains('backdrop-card')) {
         e.target.style.opacity = 0;
      }
      if (e.target.classList.contains('button')) {
       e.target.parentNode.parentNode.style.opacity = 0;
      }
    }else if(e.target.classList.contains("backdrop-card") && !e.relatedTarget.classList.contains('button') &&  !e.relatedTarget.classList.contains('backdrop-average')) {
    e.target.style.opacity = 0
  }
}
function mouseEnterOnBackdrop(e) {
  console.log('mouseover')
  console.log('e.terget',e.target)
  console.log('relatdtarget',e.relatedTarget)
  if (e.target.classList.contains("home-gallery__backdrop-card")) {
    e.target.style.opacity = 1;
     let localWatchedList = JSON.parse(localStorage.getItem("watchedList"));
      localWatchedList === null ? localWatchedList : watchedList = [...localWatchedList];    
    if ((watchedList.find(item => item.id == e.target.id) && true) || false) {
         console.log('yes')
         e.target.childNodes[3].childNodes[1].childNodes[0].textContent = "added to watched";
    } 
     const localQueueList = JSON.parse(localStorage.getItem("queueList"));
      localQueueList === null ? localQueueList : queueList = [...localQueueList];
      if ((queueList.find(item => item.id == e.target.id) && true) || false) {
       e.target.childNodes[3].childNodes[3].childNodes[0].textContent = "added to queue";
      } 
  }
   if (e.target.classList.contains("library-gallery__backdrop-card")) {
     e.target.style.opacity = 1;
  }

}
function onSearhFormInput(event) {
  if (event.target.value == '') {
       
  return fetchMovie("movie", homepPaginationPage);
  }
  
  const searchQueryValue = event.target.value;
   fetchMoviesByQuery(searchQueryValue, searchPaginationPage).then(resp => {
    searchPagination.reset(resp.total_pages);
    console.log(resp.results)
    if (resp.results.length === 0) {
      document.querySelector('.search-result-text').classList.remove('visually-hidden');
      refs.paginationContainerEl.classList.add("visually-hidden");
    }
    if ((resp.results.length !== 0)) {
      refs.paginationContainerEl.classList.remove("visually-hidden");
       document.querySelector('.search-result-text').classList.add('visually-hidden');
    }
    
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
  
  const localMovies = JSON.parse(localStorage.getItem("watchedList"));
  console.log(localMovies);
  if (localMovies === null) {
    renderEmptyGallery();
  } else {
    renderLibraryGallaryWathed(localMovies);

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
      renderLibraryGallaryWathed(localMovies, 'watched');
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
      renderLibraryGallaryQueue(localMovies, 'queue');
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

      function onDeleteWatchedButton(id) {
          let localMovies = JSON.parse(localStorage.getItem("watchedList"));
          console.log(localMovies);
          localMovies = localMovies.filter((movie) => movie.id != id);
          console.log(localMovies)
          localStorage.setItem("watchedList", JSON.stringify(localMovies));
          localMovies = JSON.parse(localStorage.getItem("watchedList"));
        console.log(localMovies)
        if (localMovies === null) {
      renderEmptyGallery();
    } else {
      renderLibraryGallaryWathed(localMovies, 'watched');
  }
      }

      function onDeleteQueueButton(id) {    
       
        let localMovies = JSON.parse(localStorage.getItem("queueList"));
        localMovies = localMovies.filter((movie) => movie.id != id);
        localStorage.setItem("queueList", JSON.stringify(localMovies));
        localMovies = JSON.parse(localStorage.getItem("queueList"));
if (localMovies === null) {
      renderEmptyGallery();
    } else {
      renderLibraryGallaryQueue(localMovies, 'queue');
    }
}
      

document.querySelector("body").addEventListener("click", onBody);

function onBody(e) {
  e.preventDefault();
  if (e.target.classList.contains("button-queue--backdrop")) {
    addMovieToQueueLocalStorage(e.target.id);
    e.target.textContent = 'added to queue';
  }
  if (e.target.classList.contains("button-watched--backdrop")) {
    addMovieToWatchedLocalStorage(e.target.id);
    e.target.textContent = 'added to watched';
  }
   if (e.target.classList.contains("button-delete-watched--backdrop")) {
    onDeleteWatchedButton(e.target.id);
  }
  if (e.target.classList.contains("button-delete-queue--backdrop")) {
    onDeleteQueueButton(e.target.id);
  }

  if (e.target.classList.contains("button-more")) {
   

    fetchMovieDetails(e.target.id).then(resp => {

      renderModalMovie(resp); 
      refs.modal.classList.toggle('is-hidden');
      refs.modal.classList.toggle('backdrop--is-hidden');
      document.querySelector('body').style.overflow = "hidden";
      document.addEventListener('keydown', keyPress)
      function keyPress(e) {
        console.log(e.key)
        if (e.key === 'Escape') {
          refs.modal.classList.toggle('is-hidden');
          refs.modal.classList.toggle('backdrop--is-hidden');
           document.querySelector('body').style.overflow = "auto";
          document.removeEventListener('keydown', keyPress)
       }
      }
      
      document.querySelector('.modal-button-queue').addEventListener('click', onQueueButton)
      document.querySelector('.modal-button-watched').addEventListener('click', onWatchedButton)
       
      const localWatchedList = JSON.parse(localStorage.getItem("watchedList"));
      localWatchedList === null ? localWatchedList : watchedList = [...localWatchedList];    
       if ((watchedList.find(item => item.id == e.target.id) && true) || false) {
         document.querySelector('.modal-button-watched').textContent = 'added to watched';
       } 

      const localQueueList = JSON.parse(localStorage.getItem("queueList"));
      localQueueList === null ? localQueueList : queueList = [...localQueueList];
       if ((queueList.find(item => item.id == e.target.id) && true) || false) {
        document.querySelector('.modal-button-queue').textContent = 'added to queue';
       } 

      function onQueueButton(event) {
        addMovieToQueueLocalStorage(event.target.id);
        event.target.textContent = 'added to queue';
      }
        
      function onWatchedButton(event) {
        addMovieToWatchedLocalStorage(event.target.id)
        event.target.textContent = 'added to watched';
      }
      modalOpen(e.target.id);   
      
    })
  }
  
}  

// localStorage.removeItem("watchedList")
// localStorage.removeItem("queueList")
