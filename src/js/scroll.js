import throttle from 'lodash.throttle';
const scrollButton = document.querySelector('.scroll-top');
scrollButton.addEventListener('click', onScrollButton)
console.log(window.scrollY);
document.addEventListener('scroll', throttle((addScrollButton), 250))
function addScrollButton() {
  console.log(window.scrollY)
 if (window.scrollY < 300) {
    scrollButton.classList.add('visually-hidden');
  }
  if (window.scrollY > 300) {
    scrollButton.classList.remove('visually-hidden');
}
}
//  if (window.scrollY < 300) {
//     scrollButton.classList.add('visually-hidden');
// }
//  if (window.scrollY > 300) {
//     scrollButton.classList.add('visually-hidden');
// }
export function onScrollButton() {
  
 
  window.scrollTo(pageYOffset, 0);
}