parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"clu1":[function(require,module,exports) {

},{"./../images/home-bg-320-1x-min.jpg":[["home-bg-320-1x-min.af8cb03f.jpg","OYs0"],"OYs0"],"./../images/home-bg-320-2x-min.jpg":[["home-bg-320-2x-min.52db1ef7.jpg","oNHL"],"oNHL"],"./../images/home-bg-768-1x-min.jpg":[["home-bg-768-1x-min.4ef3f3d7.jpg","zu4t"],"zu4t"],"./../images/home-bg-768-2x-min.jpg":[["home-bg-768-2x-min.695b6a87.jpg","ItOb"],"ItOb"],"./../images/home-bg-1024-1x-min.jpg":[["home-bg-1024-1x-min.973645b0.jpg","V80p"],"V80p"],"./../images/home-bg-1024-2x-min.jpg":[["home-bg-1024-2x-min.b119d062.jpg","HOsS"],"HOsS"],"./../images/library-bg-320-1x-min.jpg":[["library-bg-320-1x-min.a9592d42.jpg","YuwI"],"YuwI"],"./../images/library-bg-320-2x-min.jpg":[["library-bg-320-2x-min.67437679.jpg","oylv"],"oylv"],"./../images/library-bg-768-1x-min.jpg":[["library-bg-768-1x-min.e75733f7.jpg","LeCs"],"LeCs"],"./../images/library-bg-768-2x-min.jpg":[["library-bg-768-2x-min.c572c696.jpg","hbUO"],"hbUO"],"./../images/library-bg-1024-1x-min.jpg":[["library-bg-1024-1x-min.60711cfe.jpg","LqdB"],"LqdB"],"./../images/library-bg-1024-2x-min.jpg":[["library-bg-1024-2x-min.3375d1fb.jpg","UNNn"],"UNNn"]}],"L0x2":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=s;const e='<form class="search-form">\n      <input class="search-form__input" placeholder="Search films"></input>\n      <button class="search-form__button" type="submit">\n        <svg class="icon-search" width="12" height="12">\n          <use href="./images/icons.svg#icon-search"></use>\n        </svg>\n      </button>\n    </form>\n    <p class="visually-hidden search-result-text">\n      Search result not successful. Enter the correct movie name and try\n      again\n    </p>',n='\n    <button class="button library-button">Watched</button>\n    <button class="button library-button">Queue</button>    \n    <p class="visually-hidden search-result-text">\n      Search result not successful. Enter the correct movie name and try\n      again\n    </p>\n  </div>',a='  <div class="container">\n    <ul class="cinema-gallery__list list">\n      <li class="cinema-gallery__item">\n        <div class="thumb-img">\n          <img class="cinema-gallery__img" src="./images/home-bg-320-1x-min.jpg">\n\n        </div>\n        <div class="thumb-text">\n          <p class="cinema-gallery__name">Movie title</p>\n          <p class="cinema-gallery__text">Genre and year</p>\n        </div>\n\n      </li>\n      <li class="cinema-gallery__item">\n        <div class="thumb-img">\n          <img class="cinema-gallery__img" src="./images/home-bg-320-1x-min.jpg">\n\n        </div>\n        <div class="thumb-text">\n          <p class="cinema-gallery__name">Movie title</p>\n          <p class="cinema-gallery__text">Genre and year</p>\n        </div>\n\n      </li>\n    </ul>\n  </div>',r=[{id:28,name:"Action"},{id:12,name:"Adventure"},{id:16,name:"Animation"},{id:35,name:"Comedy"},{id:80,name:"Crime"},{id:99,name:"Documentary"},{id:18,name:"Drama"},{id:10751,name:"Family"},{id:14,name:"Fantasy"},{id:36,name:"History"},{id:27,name:"Horror"},{id:10402,name:"Music"},{id:9648,name:"Mystery"},{id:10749,name:"Romance"},{id:878,name:"Science Fiction"},{id:10770,name:"TV Movie"},{id:53,name:"Thriller"},{id:10752,name:"War"},{id:37,name:"Western"}],t={homePageLinkEl:document.querySelector("a.home-link"),libraryPageLinkEl:document.querySelector("a.library-link"),headerEl:document.querySelector("header.page-header"),body:document.querySelector("body"),textSearchResult:document.querySelector("p.search-result-text"),nav:document.querySelector("nav.nav"),searhFormEl:document.querySelector("form.search-form"),gallery:document.querySelector(".cinema-gallery"),galleryListEl:document.querySelector(".cinema-gallery__list")};function i(e){e.preventDefault(),document.querySelector("header").classList.add("page-header--library"),t.libraryPageLinkEl.classList.add("library-link--current"),t.homePageLinkEl.classList.remove("home-link--current"),t.searhFormEl.innerHTML=n,t.gallery.innerHTML=a}function l(n){n.preventDefault(),document.querySelector("header").classList.remove("page-header--library"),t.libraryPageLinkEl.classList.remove("library-link--current"),t.homePageLinkEl.classList.add("home-link--current"),t.searhFormEl.innerHTML=e}function s(){fetch("https://api.themoviedb.org/3/trending/all/day?api_key=c54b9b3bc824900bd0fc655039f09ff1").then(e=>e.json()).then(e=>{console.log(e),console.log(e.results);const n=e.results.map(e=>`<li class="cinema-gallery__item">\n        <div class="thumb-img">\n          <img class="cinema-gallery__img" src=" https://image.tmdb.org/t/p/w500${e.poster_path}">\n\n        </div>\n        <div class="thumb-text">\n          <p class="cinema-gallery__name">${e.name||e.title}</p>\n          <p class="cinema-gallery__text">${e.genre_ids} | ${e.release_date||e.first_air_date}</p>\n        </div>`);t.galleryListEl.innerHTML=n.join("")})}t.homePageLinkEl.addEventListener("click",l),t.libraryPageLinkEl.addEventListener("click",i);
},{}],"Focm":[function(require,module,exports) {
"use strict";require("./sass/main.scss");var e=s(require("./js/filmoteka.js"));function s(e){return e&&e.__esModule?e:{default:e}}(0,e.default)();
},{"./sass/main.scss":"clu1","./js/filmoteka.js":"L0x2"}]},{},["Focm"], null)
//# sourceMappingURL=/filmoteka/src.99ca939d.js.map