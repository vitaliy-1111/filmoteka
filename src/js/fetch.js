export function fetchMoviesByQuery(searchQueryValue) {
  return fetch(`https://api.themoviedb.org/3/search/movie?api_key=c54b9b3bc824900bd0fc655039f09ff1&language=en-US&query=${searchQueryValue}&page=1&include_adult=false`)
    .then(resp => resp.json());
}
export function fetchMoviesByMedia(media) {
  return fetch(`https://api.themoviedb.org/3/trending/${media}/day?api_key=c54b9b3bc824900bd0fc655039f09ff1`)
    .then(resp => resp.json());
}
export function fetchMovieById(id) {
  return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=c54b9b3bc824900bd0fc655039f09ff1&language=en-US`)
    .then(resp => resp.json());
}
