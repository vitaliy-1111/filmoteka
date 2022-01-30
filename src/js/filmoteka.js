// const refs = {
//   homePageLinkEl: document.querySelector("a.home-link"),
//   libraryPageLinkEl: document.querySelector("a.library-link"),
//   headerEl: document.querySelector("header.page-header"),
// }

// refs.homePageLinkEl.addEventListener("click", onHomePageLinkEl);

// function onHomePageLinkEl(e) {
//   e.preventDefault();
//   const gallery = `<section class="cinema-gallery">
//   <div class="container">
//     <ul class="cinema-gallery__list list">
//       <li class="cinema-gallery__item">
//         <div class="thumb-img">
//           <img class="cinema-gallery__img" src="./images/home-bg-320-1x-min.jpg">

//         </div>
//         <div class="thumb-text">
//           <p class="cinema-gallery__name">Movie title</p>
//           <p class="cinema-gallery__text">Genre and year</p>
//         </div>

//       </li>
//       <li class="cinema-gallery__item">
//         <div class="thumb-img">
//           <img class="cinema-gallery__img" src="./images/home-bg-320-1x-min.jpg">

//         </div>
//         <div class="thumb-text">
//           <p class="cinema-gallery__name">Movie title</p>
//           <p class="cinema-gallery__text">Genre and year</p>
//         </div>

//       </li>
//     </ul>
//   </div>
// </section>`.join('');
//   refs.headerEl.insertAdjacentHTML('beforeend', gallery);
// }

const homePage = `<form class="search-form">
      <input class="search-form__input" placeholder="Search films"></input>
      <button class="search-form__button" type="submit">
        <svg class="icon-search" width="12" height="12">
          <use href="./images/icons.svg#icon-search"></use>
        </svg>
      </button>
    </form>
    <p class="visually-hidden search-result-text">
      Search result not successful. Enter the correct movie name and try
      again
    </p>`;
const libraryPage = `
    <button class="button library-button">Watched</button>
    <button class="button library-button">Queue</button>    
    <p class="visually-hidden search-result-text">
      Search result not successful. Enter the correct movie name and try
      again
    </p>
  </div>`;
const libraryGallery = `  <div class="container">
    <ul class="cinema-gallery__list list">
      <li class="cinema-gallery__item">
        <div class="thumb-img">
          <img class="cinema-gallery__img" src="./images/home-bg-320-1x-min.jpg">

        </div>
        <div class="thumb-text">
          <p class="cinema-gallery__name">Movie title</p>
          <p class="cinema-gallery__text">Genre and year</p>
        </div>

      </li>
      <li class="cinema-gallery__item">
        <div class="thumb-img">
          <img class="cinema-gallery__img" src="./images/home-bg-320-1x-min.jpg">

        </div>
        <div class="thumb-text">
          <p class="cinema-gallery__name">Movie title</p>
          <p class="cinema-gallery__text">Genre and year</p>
        </div>

      </li>
    </ul>
  </div>`;
const genre = [
{id: 28, name: 'Action'},
{id: 12, name: 'Adventure'},
{id: 16, name: 'Animation'},
{id: 35, name: 'Comedy'},
{id: 80, name: 'Crime'},
{id: 99, name: 'Documentary'},
{id: 18, name: 'Drama'},
{id: 10751, name: 'Family'},
{id: 14, name: 'Fantasy'},
{id: 36, name: 'History'},
{id: 27, name: 'Horror'},
{id: 10402, name: 'Music'},
{id: 9648, name: 'Mystery'},
{id: 10749, name: 'Romance'},
{id: 878, name: 'Science Fiction'},
{id: 10770, name: 'TV Movie'},
{id: 53, name: 'Thriller'},
{id: 10752, name: 'War'},
{id: 37, name: 'Western'},
]

const refs = {
  homePageLinkEl: document.querySelector("a.home-link"),
  libraryPageLinkEl: document.querySelector("a.library-link"),
  headerEl: document.querySelector("header.page-header"),
  body: document.querySelector("body"),
  textSearchResult: document.querySelector("p.search-result-text"),
  nav: document.querySelector("nav.nav"),
  searhFormEl: document.querySelector("form.search-form"),
  gallery: document.querySelector(".cinema-gallery"),
  galleryListEl:document.querySelector(".cinema-gallery__list")
  
}

refs.homePageLinkEl.addEventListener("click", onHomePageLinkEl);
refs.libraryPageLinkEl.addEventListener("click", onLibraryPageLinkEl);
// refs.textSearchResult.classList.add("visually-hidden");


// refs.headerEl.insertAdjacentHTML('afterend', homePage);


function onLibraryPageLinkEl(e) {
  e.preventDefault();
  document.querySelector("header").classList.add("page-header--library")
  refs.libraryPageLinkEl.classList.add("library-link--current")
  refs.homePageLinkEl.classList.remove("home-link--current")

  //  refs.nav.insertAdjacentHTML('afterend', libraryPage);
  refs.searhFormEl.innerHTML = libraryPage;
  refs.gallery.innerHTML = libraryGallery;
}

function onHomePageLinkEl(e) {
  e.preventDefault();
  document.querySelector("header").classList.remove("page-header--library")
  refs.libraryPageLinkEl.classList.remove("library-link--current")
  refs.homePageLinkEl.classList.add("home-link--current")
 refs.searhFormEl.innerHTML = homePage;
}

export default function fetchMovie() {
  // fetch("https://api.themoviedb.org/3/trending/all/day?api_key=c54b9b3bc824900bd0fc655039f09ff1").then(resp => resp.json()).then(console.log);
  fetch("https://api.themoviedb.org/3/trending/all/day?api_key=c54b9b3bc824900bd0fc655039f09ff1").then(resp => resp.json()).then(resp => {
    console.log(resp);
    console.log(resp.results);
    const listMovies = resp.results;
    const gallery = listMovies.map(movie => `<li class="cinema-gallery__item">
        <div class="thumb-img">
          <img class="cinema-gallery__img" src=" https://image.tmdb.org/t/p/w500${movie.poster_path}">

        </div>
        <div class="thumb-text">
          <p class="cinema-gallery__name">${movie.name || movie.title}</p>
          <p class="cinema-gallery__text">${movie.genre_ids } | ${movie.release_date || movie.first_air_date}</p>
        </div>`);
    
    refs.galleryListEl.innerHTML = gallery.join("");

  })
  }

// console.log(fetchMovie());
