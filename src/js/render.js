import { refs } from './refs.js';
import { movieGenre, genreIdToName } from './genres.js';

export function renderHomeGallery(listMovies) {
  const gallery = listMovies.map(movie => {
    const genreName = genreIdToName(movie.genre_ids, movieGenre);
    let imgUrl = "https://image.tmdb.org/t/p/w500";
    if (movie.release_date === '') {
      movie.release_date = 'date';
    }
    if (movie.poster_path==null) {
      imgUrl = 'https://cdn.pixabay.com/photo/2020/02/17/21/12/cinema-4857895_1280.jpg';
    }
    if (!movie.release_date && !movie.first_air_date) {
      movie.release_date = ' ';
    }
    return `<li class="cinema-gallery__item">
        <div class="thumb-img">
         <div class="backdrop-card home-gallery__backdrop-card" id="${movie.id}">
          <span class="cinema-gallery__average backdrop-average ${movie.vote_average == 0 ? movie.vote_average = 'visually-hidden' : movie.vote_average}">${movie.vote_average || " "}</span>
          <div class="button-wrap--backdrop">
            <button class="button-backdrop button button-watched button-watched--backdrop" id="${movie.id}">add to Watched</button>
            <button class="button-backdrop  button button-queue button-queue--backdrop" id="${movie.id}">add to Queue</button>
            <button class="button-backdrop  button button-more" id="${movie.id}">see more</button>
          </div>
          </div>
          <img class="cinema-gallery__img img" src='${imgUrl}${movie.poster_path || ''}'
           id="${movie.id}" alt="poster ${movie.name || movie.title}" loading="lazy data-modal-open">
           
        </div>
        <div class="thumb-text">
          <p class="cinema-gallery__name">${movie.name || movie.title}</p>
          <p class="cinema-gallery__text">${genreName || 'no genres'} |
           ${movie.release_date.slice(0,4) || movie.first_air_date.slice(0,4) || ' '}
          </p>
        </div></li>`});    
  refs.galleryListEl.innerHTML = gallery.join(''); 
}

export function renderLibraryGallaryWathed(listMovies) {
   const gallery = listMovies.map(movie => {
    return `<li class="cinema-gallery__item">
        <div class="thumb-img">
        <div class="backdrop-card library-gallery__backdrop-card" id="${movie.id}">
          <span class="cinema-gallery__average backdrop-average ${movie.vote_average == 0 ? movie.vote_average = 'visually-hidden' : movie.vote_average}">${movie.vote_average}</span>
           <div class="button-wrap--backdrop">
            <button class="button-backdrop  button button-watched button-delete-watched--backdrop" id="${movie.id}">delete from watched</button>
            <button class="button-backdrop  button button-queue button-queue--backdrop" id="${movie.id}">add to Queue</button>
            <button class="button-backdrop  button button-more" id="${movie.id}">see more</button>
          </div>
          </div>
          <img class="cinema-gallery__img img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
           id="${movie.id}" alt="poster ${movie.name || movie.title}" loading="lazy data-modal-open">
        
        </div>
        <div class="thumb-text">
          <p class="cinema-gallery__name">${movie.name || movie.title}</p>
          <p class="cinema-gallery__text">${movie.genres.map(genre => genre.name).join(' ')} |
           ${movie.release_date.slice(0, 4) || movie.first_air_date.slice(0, 4) || ' '}
          </p>
        </div></li>`});    
  refs.galleryListEl.innerHTML = gallery.join(''); 
}

export function renderLibraryGallaryQueue(listMovies) {
   const gallery = listMovies.map(movie => {
    return `<li class="cinema-gallery__item">
        <div class="thumb-img">
        <div class="backdrop-card library-gallery__backdrop-card" id="${movie.id}">
          <span class="cinema-gallery__average backdrop-average ${movie.vote_average == 0 ? movie.vote_average = 'visually-hidden' : movie.vote_average}">${movie.vote_average}</span>
           <div class="button-wrap--backdrop">
           <button class="button-backdrop  button button-queue button-delete-queue--backdrop" id="${movie.id}">delete from queue</button>
           <button class="button-backdrop button button-watched button-watched--backdrop" id="${movie.id}">add to Watched</button>
            <button class="button-backdrop  button button-more" id="${movie.id}">see more</button>
          </div>
          </div>
          <img class="cinema-gallery__img img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
           id="${movie.id}" alt="poster ${movie.name || movie.title}" loading="lazy data-modal-open">
        
        </div>
        <div class="thumb-text">
          <p class="cinema-gallery__name">${movie.name || movie.title}</p>
          <p class="cinema-gallery__text">${movie.genres.map(genre => genre.name).join(' ')} |
           ${movie.release_date.slice(0, 4) || movie.first_air_date.slice(0, 4) || ' '}
          </p>
        </div></li>`});    
  refs.galleryListEl.innerHTML = gallery.join(''); 
}

export function renderEmptyGallery() {
  const gallery = `<li class="cinema-gallery__item">Empty LocalStorage</li>`;
  refs.galleryListEl.innerHTML = gallery;
}
export function renderModalMovie(movie) {
  const movieInfo = `<div class="modal-movie__container">
        <div class="modal-movie__img-thumb">
          <img class="cinema-modal__img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="poster ${movie.name || movie.title}" id="${movie.id}">
        </div>
        <div class="modal-movie__text-wrap">
          <h2 class="movie-title">${movie.title}</h2>
          <p class="info-title">Vote / Votes<span class = "info-averages">${movie.vote_average}</span> / <span class="info-text"> ${movie.vote_count}</span></p>
          <p class="info-title">Popularity<span class="info-text">${movie.popularity}</span></p>
          <p class="info-title">Original Title<span class="info-text">${movie.original_title}</span></p>
          <p class="info-title">Jenre<span class="info-text">${movie.genres.map(genre => genre.name).join(' ')}</span></p>
          <h3 class="modal-movie__about">About</h3>
          <p class="about-text">${movie.overview}
          </p>
          <div class="modal-movie__button-wrap">
            <button class="modal-movie__button button modal-button-watched"  id="${movie.id}">Watched</button>
            <button class="modal-movie__button button modal-button-queue"  id="${movie.id}">Queue</button>
          </div> 
        
        </div>`;
  refs.modalMovie.innerHTML = movieInfo;
}
