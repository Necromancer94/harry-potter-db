import { domElements } from "./domElements.js";
import { showElement, hideElement } from "../main.js";

export default function showBanner() {

    if(localStorage.getItem('BannerShown')){
        return
    }

    if (localStorage.getItem('favoriteCharacters') && domElements.favoritesPage.classList.contains('invisible')){
        setTimeout(() => {
            showElement(domElements.emailBanner)
            localStorage.setItem('BannerShown', 'true')
        }, 10000)
    
        domElements.closeIcon.addEventListener('click', () => {
            hideElement(domElements.emailBanner)
        })
    }
}