import { domElements } from "./modules/domElements.js";
import { countFavorites, renderFavorites, checkFavoriteState, loadIconEvents } from "./modules/favorites.js";
import queries from "./modules/queryParams.js"
import showBanner from "./modules/favoritesBanner.js";
import showBloodStatus from "./modules/showBloodStatus.js";
import createCard from "./modules/createCard.js";
import { createPopup } from "./modules/overlayElements.js";

// I. Global definitions

let pageNumber = 1;
let currentURL = null;
const baseURL = 'https://api.potterdb.com/v1/characters'
const startURL = new URL(baseURL)
const URLparams = new URLSearchParams(startURL.search)

export function appendQueryParams(queryParam, paramValue) {

    if (paramValue === '') {
        URLparams.delete(queryParam)
    }

    else {
        URLparams.set(queryParam, paramValue)
    }

    startURL.search = URLparams.toString();
    currentURL = startURL.href
}

// II. Utility functions

function resetPageNumber() {
    pageNumber = 1;
    appendQueryParams(queries.pageQuery, pageNumber)
}

function deleteCards() {
    domElements.cardContainer.innerHTML=''
    hideElement(domElements.loadMoreBtn) //
}

export function showElement(element) {
    element.classList.remove('invisible')
}

export function hideElement(element) {
    element.classList.add('invisible')
}

function disableRadioBtn (selector){
    domElements[selector].disabled=true;
}

function uncheckElement(...selectors){
    selectors.forEach((selector) => {
        domElements[selector].checked = false
    })
}

function randomLink (){
    const url = 'https://api.potterdb.com/v1/characters?page[size]=50&page[number]='
    const minPage = 1
    const maxPage = 97
    const randomNum = Math.floor(Math.random() * (maxPage - minPage + 1) + minPage)
    return url + randomNum
}

async function renderInitialCards() {
    resetPageNumber()
    const allCharacters = await loadData()
    renderCards(allCharacters)
}

function showFavoritePage(){ //could store page in a variable
    hideElement(domElements.searchPage)
    showElement(domElements.favoritesPage)
    renderFavorites() 
    countFavorites()
    domElements.favoritesLink.classList.add('!bg-sky-100', '!text-sky-600')
    domElements.searchLink.classList.remove('!bg-sky-100', '!text-sky-600')
}


function showSearchPage (){
    showElement(domElements.searchPage)
    hideElement(domElements.favoritesPage)
    domElements.searchLink.classList.add('!bg-sky-100', '!text-sky-600')
    domElements.favoritesLink.classList.remove('!bg-sky-100', '!text-sky-600')
}

// III. Fetching data

function resetURL(){
    for (let query in queries){
        appendQueryParams(queries[query], '')
    }
}

export async function loadData (url = currentURL) {

    try {
        showElement(domElements.spinner)
        hideElement(domElements.formNone)

        const response = await fetch(url)
        const result = await response.json()

        if(result.data.length === 0){
            showElement(domElements.formNone)
            hideElement(domElements.topBar)
        }

        else if (result.meta.pagination.records < 100 || result.data.length < 100) {
            hideElement(domElements.loadMoreBtn)
        }

        else {
            showElement(domElements.loadMoreBtn)
        }

        hideElement(domElements.spinner)
        // console.log(currentURL)
        return result.data
    }

    catch (error) {
        console.error(error);
        createPopup(error, 'warning')
        hideElement(domElements.topBar)
        hideElement(domElements.loadMoreBtn)
        hideElement(domElements.searchBox)
    }
}

async function renderCards(charactersArray) {
    for (const character of charactersArray) {
        createCard(character)
    }

    showElement(domElements.topBar)
    showElement(domElements.loadMoreBtn) //
    showBloodStatus()
    await loadIconEvents() //wait for contextual event listeners
    checkFavoriteState()
}

// IV. Filters

async function search(searchValue) {

    resetPageNumber()
    deleteCards()

    if (searchValue === '') {
        resetInterface()
        renderInitialCards()
        appendQueryParams(queries.nameStartQuery, '')
        return
    }

    else {
        appendQueryParams(queries.nameStartQuery, searchValue)
    }

    const filteredCharactersBySearch = await loadData()

    while (filteredCharactersBySearch.length === 0) {
        showElement(domElements.formNone)
        hideElement(domElements.topBar)
        return
    }

    renderCards(filteredCharactersBySearch)
}

async function genderFilter() {

    resetPageNumber()
    deleteCards()

    domElements.radioButtons.forEach((button) => {
        button.disabled=false;
    })

    let gender = ''

    if (domElements.maleRadio.checked) {
        gender = 'Male'
        disableRadioBtn('maleRadio')
    }

    else if (domElements.femaleRadio.checked) {
        gender = 'Female'
        disableRadioBtn('femaleRadio')
    }

    else {
        renderInitialCards()
        disableRadioBtn('allRadio')
        return
    }

    appendQueryParams(queries.genderQuery, gender)
    const filteredCharactersByGender = await loadData()
    renderCards(filteredCharactersByGender)
}

async function nonHumanFilter() {

    resetPageNumber()
    deleteCards()

    if (domElements.nonHumanCheckBox.checked) {
        appendQueryParams(queries.nonHumanQuery, 'Human')
        const nonHumanCharacters = await loadData()
        renderCards(nonHumanCharacters)
    }

    else {
        appendQueryParams(queries.nonHumanQuery, '')
        renderInitialCards()
    }
}

async function houseFilter() {

    resetPageNumber()
    deleteCards()

    if (domElements.houseDropdown.value == 'All') {
        renderInitialCards()
        appendQueryParams(queries.nohouseQuery, '')
        appendQueryParams(queries.houseQuery, '')
    }

    else if (domElements.houseDropdown.value == 'Neither') {
        appendQueryParams(queries.nohouseQuery, 'true')
        appendQueryParams(queries.houseQuery, '')
        const noHouseChars = await loadData()
        renderCards(noHouseChars)
    }

    else {
        appendQueryParams(queries.houseQuery, domElements.houseDropdown.value)
        appendQueryParams(queries.nohouseQuery, '')
        const houseChars = await loadData()
        renderCards(houseChars)
    }
}

async function deadFilter(){

    resetPageNumber()
    deleteCards()

    if (domElements.deadCheckbox.checked) {
        appendQueryParams(queries.deadQuery, 'true')
        const deadCharacters = await loadData()
        renderCards(deadCharacters)
    }

    else {
        appendQueryParams(queries.deadQuery, '')
        renderInitialCards()
    }
}

async function sortName (){

    resetPageNumber()
    deleteCards()

    if (domElements.sortDropdown.value === 'Z to A') {
        appendQueryParams(queries.sortQuery, '-name')
        const lastCharacters = await loadData()
        renderCards(lastCharacters)
    }

    else {
        appendQueryParams(queries.sortQuery, 'name')
        renderInitialCards()
    }
}

// V. Event listeners

function loadEventListeners(){

    domElements.loadMoreBtn.addEventListener('click', loadMore);
    domElements.houseDropdown.addEventListener('change', houseFilter)
    domElements.nonHumanCheckBox.addEventListener('click', nonHumanFilter)
    
    domElements.searchInput.addEventListener('input', (event) => {
        search(event.target.value.toLowerCase().trim())
    })
    
    domElements.radioButtons.forEach((button) => {
        button.addEventListener('click', genderFilter)
    })

    domElements.resetBtn.addEventListener('click', () => {
        resetInterface()
        renderInitialCards()
    })

    domElements.randomizeBtn.addEventListener('click', getRandom)

    domElements.deadCheckbox.addEventListener('click', deadFilter)

    domElements.sortDropdown.addEventListener('change' , sortName)

    // pages
    
    domElements.searchLink.addEventListener('click', showSearchPage)

    domElements.favoritesLink.addEventListener('click', showFavoritePage)

    domElements.emailBannerLink.addEventListener('click', () => {
        showFavoritePage()
        hideElement(domElements.emailBanner)
    })
}

// VI. Randomize, reset, load more functions

async function getRandom (){
    resetInterface()
    const randomURL = randomLink()
    const randomCharacters = await loadData (randomURL)
    renderCards(randomCharacters)
}

function resetInterface (){
    deleteCards()
    resetPageNumber()
    resetURL()
    disableRadioBtn('allRadio')
    uncheckElement('femaleRadio', 'maleRadio','nonHumanCheckBox', 'deadCheckbox')
    domElements.houseDropdown.value = 'All'
    domElements.searchInput.value=''
    domElements.sortDropdown.value = 'A to Z'
}

async function loadMore() {
    appendQueryParams(queries.pageQuery, ++pageNumber) //improve readability
    const nextBatch = await loadData()
    renderCards(nextBatch)
}

// VII. On page load

window.addEventListener('DOMContentLoaded', () => {
    renderInitialCards()
    showBanner()
    loadEventListeners()
    disableRadioBtn('allRadio')
})