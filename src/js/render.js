import { refs } from './refs.js';

export function renderNewGallery(listMovies, library = "none") {
     const gallery = listMovies.map(movie => `<li class="cinema-gallery__item">
        <div class="thumb-img">
          <img class="cinema-gallery__img img" src=" https://image.tmdb.org/t/p/w500${movie.poster_path}" id="${movie.id}" loading="lazy">
           <div class="button-wrap">
            <button class="button button-watched" id="${movie.id}">Watched</button>
            <button class="button button-queue" id="${movie.id}">Queue</button>
              <button class="button button-delete button-${library}-delete" id="${movie.id}">Delete</button>
          </div>
        </div>
        <div class="thumb-text">
          <p class="cinema-gallery__name">${movie.name || movie.title}</p>
          <p class="cinema-gallery__text">${movie.genre_ids} | ${movie.release_date || movie.first_air_date || ' '}</p>
        </div>`);    
    refs.galleryListEl.innerHTML = gallery;
}
export function renderEmptyGallery() {
  const gallery = `<li class="cinema-gallery__item">Empty LocalStorage</li>`;
  refs.galleryListEl.innerHTML = gallery;
}