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