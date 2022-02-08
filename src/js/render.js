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
      imgUrl = '/cinema-poster.caf95f4c.jpg';
    }
    return `<li class="cinema-gallery__item">
        <div class="thumb-img">
         <div class="backdrop-card" id="${movie.id}">
          <span class="cinema-gallery__average backdrop-average ">${movie.vote_average || "10"}</span>
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
           ${movie.release_date.slice(0, 4) || movie.first_air_date.slice(0, 4) || ' '}
          </p>
        </div></li>`});    
  refs.galleryListEl.innerHTML = gallery.join(''); 
}

export function renderLibraryGallery(listMovies) {
  const gallery = listMovies.map(movie => {
    return `<li class="cinema-gallery__item">
        <div class="thumb-img">
          <img class="cinema-gallery__img img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
           id="${movie.id}" alt="poster ${movie.name || movie.title}" loading="lazy data-modal-open">
        </div>
        <div class="thumb-text">
          <p class="cinema-gallery__name">${movie.name || movie.title}</p>
          <p class="cinema-gallery__text">${movie.genres.map(genre => genre.name).join(' ')} |
           ${movie.release_date.slice(0, 4) || movie.first_air_date.slice(0, 4) || ' '}
           <span class="cinema-gallery__average">${movie.vote_average || "10"}</span>
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
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="poster ${movie.name || movie.title}" id="${movie.id}">
        </div>
        <div class="modal-movie__text-wrap">
          <h2 class="movie-title">${movie.title}</h2>
          <p class="info-title">Vote / Votes<span class="info-text">${movie.vote_average} / ${movie.vote_count}</span></p>
          <p class="info-title">Popularity<span class="info-text">${movie.popularity}</span></p>
          <p class="info-title">Original Title<span class="info-text">${movie.original_title}</span></p>
          <p class="info-title">Jenre<span class="info-text">${movie.genres.map(genre => genre.name).join(' ')}</span></p>
          <h3 class="modal-movie__about">About</h3>
          <p class="about-text">${movie.overview}
          </p>
          <div class="modal-movie__button-wrap">
            <button class="modal-movie__button button button-watched  id="${movie.id}">Watched</button>
            <button class="modal-movie__button button button-queue  id="${movie.id}">Queue</button>
          </div> 
        
        </div>`;
  refs.modalMovie.innerHTML = movieInfo;
}
  // <div class="modal-movie__button-wrap">
  //           <button class="modal-movie__button button button-watched-delete  id="${movie.id}">watched-delete</button>
  //           <button class="modal-movie__button button button-queue-delete id="${movie.id}">queue-delete</button>
  //         </div>