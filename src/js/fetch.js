export function fetchMoviesByQuery(searchQueryValue, page) {
  return fetch(`https://api.themoviedb.org/3/search/movie?api_key=c54b9b3bc824900bd0fc655039f09ff1&language=en-US&query=${searchQueryValue}&page=${page}`)
    .then(resp => resp.json());
}
export function fetchMoviesByMedia(media, page) {
  return fetch(`https://api.themoviedb.org/3/trending/${media}/day?api_key=c54b9b3bc824900bd0fc655039f09ff1&page=${page}`)
    .then(resp => resp.json());
}
export function fetchMovieById(id) {
  return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=c54b9b3bc824900bd0fc655039f09ff1&language=en-US`)
    .then(resp => resp.json());
}
export function fetchMovieDetails(movie_id) {
  return fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=c54b9b3bc824900bd0fc655039f09ff1&language=en-US`)
    .then(resp => resp.json());
}


