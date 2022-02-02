export const homePage = `<form class="search-form">
      <input class="search-form__input" placeholder="Search films"></input>
      <button class="search-form__button" type="submit">
        <svg class="icon-search" width="12" height="12">
          <use href="./src/images/icons.svg#icon-search"></use>
        </svg>
      </button>
    </form>
    <p class="visually-hidden search-result-text">
      Search result not successful. Enter the correct movie name and try
      again
    </p>`;
export const libraryPage = `
    <button class="button library-button library-button--active library-button--watched">Watched</button>
    <button class="button library-button--queue">Queue</button>
    <p class="visually-hidden search-result-text">
      Search result not successful. Enter the correct movie name and try
      again
    </p>
  `;
export const modalMovie = `<div class="modal-movie">
  <div class="modal-movie__container">
    <div class="modal-movie__img-thumb">
      <img src="" alt="title">
    </div>
    <div class="modal-movie__text-wrap">
      <h2 class="movie-title">Title</h2>
      <p class="info-title">title<span class="info-text">info</span></p>
      <p class="info-title">title<span class="info-text">info</span></p>
      <p class="info-title">title<span class="info-text">info</span></p>
      <p class="info-title">title<span class="info-text">info</span></p>
      <h3 class="modal-movie__about">About</h3>
      <p class="about-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates, molestiae pariatur,
        ex magni harum a reiciendis corporis laborum veritatis iste praesentium veniam quam quasi, fugit aspernatur
        quibusdam architecto ut? Pariatur natus ullam,
        debitis eligendi facilis illum voluptate fuga quisquam officiis cum dolores omnis porro, voluptates voluptatibus
        amet iure doloremque necessitatibus.
      </p>
      <div class="modal-movie__button-wrap">
        <button class="modal-movie__button button button-watched">Watched</button>
        <button class="modal-movie__button button button-queue">Queue</button>
      </div>
    </div>
  </div>`;

