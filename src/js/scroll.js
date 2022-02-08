import throttle from 'lodash.throttle';
import { refs } from './refs'
refs.scrollButtonEl.addEventListener('click', onScrollButton)

console.log(window.scrollY);
document.addEventListener('scroll', throttle((addScrollButton), 250))
function addScrollButton() {
  console.log(window.scrollY)
 if (window.scrollY < 300) {
    refs.scrollButtonEl.classList.add('visually-hidden');
  }
  if (window.scrollY > 300) {
    refs.scrollButtonEl.classList.remove('visually-hidden');
}
}
export function onScrollButton() {
 
  window.scrollTo(pageYOffset, 0);
}