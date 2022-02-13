
const URL = 'https://api.themoviedb.org/3/';
const API_KEY = 'c54b9b3bc824900bd0fc655039f09ff1';

export function fetchMoviesByQuery(searchQueryValue, page) {
  return fetch(`${URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchQueryValue}&page=${page}`)
    .then(resp => resp.json());
}
export function fetchMoviesByMedia(media, page) {
  return fetch(`${URL}trending/${media}/day?api_key=${API_KEY}&page=${page}`)
    .then(resp => resp.json());
}
export function fetchMovieById(id) {
  return fetch(`${URL}movie/${id}?api_key=${API_KEY}&language=en-US`)
    .then(resp => resp.json());
}
export function fetchMovieDetails(movie_id) {
  return fetch(`${URL}movie/${movie_id}?api_key=${API_KEY}&language=en-US`)
    .then(resp => resp.json());
}


