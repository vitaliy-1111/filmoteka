import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import {refs} from '../index.js';
// export function tuiPagination() {
//   const container = document.getElementById('tui-pagination-container');
//   const options = {
//     totalItems: 500,
//     itemPerPage: 5,
//     visiblepages: 5,
//     page: 1,
//     centerAlign: false,
//     template: {
//             page: '<a href="#" class="tui-page-btn">{{page}}p</a>',
//             currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}p</strong>',
//             moveButton:
//                 '<a href="#" class="tui-page-btn tui-{{type}} custom-class-{{type}}">' +
//                     '<span class="tui-ico-{{type}}">{{type}}</span>' +
//                 '</a>',
//             disabledMoveButton:
//                 '<span class="tui-page-btn tui-is-disabled tui-{{type}} custom-class-{{type}}">' +
//                     '<span class="tui-ico-{{type}}">{{type}}</span>' +
//                 '</span>',
//             moreButton:
//                 '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
//                     '<span class="tui-ico-ellip">...</span>' +
//                 '</a>'
//         }
//   }
//   const instance = new Pagination(container, options);
//   instance.on('afterMove', function (evenData) {
//     console.log('curren page:' + evenData.page)
//   })
// }
const pagination = new Pagination('#tui-pagination-container', {
  totalItems: 0,
  itemPerPage: 20,
  visiblepages: 5,
  page: 1,
});
const page = pagination.getCurrentPage();

fetchImages(page).then((data) => {
   console.log(data)
  pagination.reset(data.total_pages);
  renderImages(data);
  console.log(data)
});

pagination.on('afterMove', (e) => {
  const currentPage = e.page;
  fetchImages(currentPage).then((data) => renderImages(data))
});

function fetchImages(page) {
  return fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=c54b9b3bc824900bd0fc655039f09ff1&page=${page}`).
    then((res) => res.json())
    // .then((data)=>({images: data.hits, total: data.total_pages}))
}
function renderImages(images) {
  
  console.log('render');
  console.log(images);
      const listMovies = images.results;
    const gallery = listMovies.map(movie => `<li class="cinema-gallery__item">
        <div class="thumb-img">
          <img class="cinema-gallery__img img" src="https://image.tmdb.org/t/p/w500${movie.poster_path || movie.backdrop_path}" id="${movie.id}" loading="lazy">
           <div class="button-wrap">
            <button class="button button-watched" id="${movie.id}">Watched</button>
            <button class="button button-queue" id="${movie.id}">Queue</button>
          </div>
        </div>
        <div class="thumb-text">
          <p class="cinema-gallery__name">${movie.name || movie.title}</p>
          <p class="cinema-gallery__text">${movie.genre_ids} | ${movie.release_date || movie.first_air_date || ' '}</p>
        </div>`);    
    refs.galleryListEl.innerHTML = gallery.join("");
  // console.log(images.page);
}