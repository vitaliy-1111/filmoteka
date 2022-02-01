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

