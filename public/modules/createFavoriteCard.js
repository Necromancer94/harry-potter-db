import { domElements } from "./domElements.js";

export function createFavoriteCard(name, image){
    const favoriteSingle = document.createElement('div')
    favoriteSingle.classList.add('favorite-char-single') 
    domElements.favoritesPageList.appendChild(favoriteSingle)

    favoriteSingle.innerHTML =
    `
    <img class='card-img w-[60px] m-0' src=${image}>
    <h4> ${name} </h4>
    <img class="delete-icon w-5 bottom-2 right-2 absolute cursor-pointer" src="assets/delete.svg">
    `
    return favoriteSingle
}