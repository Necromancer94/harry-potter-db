// functions to save/ remove favorites from local storage

import { domElements } from "./domElements.js"
import { genderChart, houseChart, speciesChart, countChars, genderData, houseData, speciesData, updateChart } from "./charts.js"
import { createFavoriteCard } from "./createFavoriteCard.js"

let favoriteIconListener = false; //checks if the event listener has been fired

// I. Collect and group favorite characters

let favoritesList = JSON.parse(localStorage.getItem('favoriteCharacters')) ?? []

function charsByCondition(charArray, condition, countVariable, objectProperty) {
    const chars = charArray.filter((char) => {
        return char[objectProperty].includes(condition)
    })

    countChars[countVariable] = chars.length
}

async function countFavorites() {

    const favorites = retrieveLocalStorage('favoriteCharacters')

    if (favorites) {
        domElements.totalFavorites.textContent = 'Total favorites: ' + favorites.length

        charsByCondition(favorites, 'Gryffindor', 'allGryffindor', 'house')
        charsByCondition(favorites, 'Slytherin', 'allSlytherin', 'house')
        charsByCondition(favorites, 'Hufflepuff', 'allHufflepuff', 'house')
        charsByCondition(favorites, 'Ravenclaw', 'allRavenclaw', 'house')
        countChars.allNoHouse = favorites.length - countChars.allGryffindor - countChars.allRavenclaw - countChars.allHufflepuff - countChars.allSlytherin

        charsByCondition(favorites, 'Female', 'allFemale', 'gender')
        charsByCondition(favorites, 'Male', 'allMale', 'gender')
        countChars.allOtherGender = favorites.length - countChars.allMale - countChars.allFemale

        charsByCondition(favorites, 'Human', 'allHuman', 'species')
        countChars.allNonHuman = favorites.length - countChars.allHuman

        updateChart(genderChart, [countChars.allMale, countChars.allFemale, countChars.allOtherGender])
        updateChart(houseChart, [countChars.allGryffindor, countChars.allSlytherin, countChars.allRavenclaw, countChars.allHufflepuff, countChars.allNoHouse])
        updateChart(speciesChart, [countChars.allHuman, countChars.allNonHuman])
    }
}

// II. Local storage fns

function updateLocalStorage(itemName, list) {
    localStorage.setItem(itemName, JSON.stringify(list))
}

function retrieveLocalStorage(itemName) {
    return JSON.parse(localStorage.getItem(itemName))
}

function setLocalItem(characterObject) {
    favoritesList.push(characterObject)
    updateLocalStorage('favoriteCharacters', favoritesList)
    countFavorites()
}

function removeLocalItem(selector) {
    const deleteIndex = favoritesList.findIndex((char) => {
        return char.name.trim() === selector.trim()
    });

    if (deleteIndex !== -1) {
        favoritesList.splice(deleteIndex, 1);
    }

    updateLocalStorage('favoriteCharacters', favoritesList)
    countFavorites()
}

// III. Add and remove favorites (DOM)

function checkFavoriteState() {

    let favorites = retrieveLocalStorage('favoriteCharacters')

    if (favorites) {
        favorites = favorites.map((favorite) => {
            return favorite.name
        }) // get the name of each favorite char

        const filteredCards = Array.from(document.querySelectorAll('.card-container .card'))
            .filter((card) => {
                return favorites.includes(card.querySelector('h3').textContent)
            }) // get the cards of matching characters

        filteredCards.forEach((card) => {
            card.querySelector('.favorite-icon').setAttribute('src', 'assets/star-red.svg')
        }) //replace icons of matching characters
    }
}

function changeIcon(name) { //possible to reuse
    const changedCard = Array.from(document.querySelectorAll('.card'))
        .filter((card) => {
            return card.querySelector('h3').textContent.trim() === name.trim()
        })

    if (changedCard.length > 0) {
        changedCard[0].querySelector('.favorite-icon').setAttribute('src', 'assets/star-white.svg')
    }

}

async function loadIconEvents() {
    if (!favoriteIconListener) {
        const cardCollection = document.querySelector('.card-container')
        cardCollection.addEventListener('click', (event) => {
            if (event.target.matches('.favorite-icon')) {
                handleIconClick(event.target)
            }
        })
        favoriteIconListener = true;
    }
}

function handleDelete(event) {
    const deleteIcons = document.querySelectorAll('.favorite-char-single > .delete-icon')
    let icon = null;
    if (Array.from(deleteIcons).includes(event.target)) {
        icon = event.target
        const charName = icon.parentNode.querySelector('h4').textContent.trim()
        removeLocalItem(charName)
        changeIcon(charName)
        icon.parentNode.remove()
    }

    return
}

function deleteFavoriteHandler() {
    domElements.favoritesPageList.addEventListener('click', handleDelete)
}

function composeFavoriteChar(icon) {
    return {
        "name": icon.parentNode.querySelector('.name').textContent,
        "house": icon.parentNode.querySelector('.house').textContent,
        "gender": icon.parentNode.querySelector('.gender').textContent,
        "species": icon.parentNode.querySelector('.species').textContent,
        "image": icon.parentNode.querySelector('.card-img').getAttribute('src')
    }
}

function handleIconClick(icon) {

    if (!icon.getAttribute('src').includes('red')) {
        icon.setAttribute('src', 'assets/star-red.svg')
        const favoriteChar = composeFavoriteChar(icon)
        setLocalItem(favoriteChar)
    }

    else {
        icon.setAttribute('src', 'assets/star-white.svg')
        const charNameToDelete = icon.parentNode.querySelector('.name').textContent.trim()
        removeLocalItem(charNameToDelete)
    }
}

// IV. Generate mini-cards for favorite characters

function renderFavorites() {

    domElements.favoritesPageList.innerHTML = ''

    const parsedData = retrieveLocalStorage('favoriteCharacters')

    if (parsedData) {
        for (let i = 0; i < parsedData.length; i++) {
            createFavoriteCard(parsedData[i].name, parsedData[i].image)
        }

        deleteFavoriteHandler()
    }
}

export {
    favoritesList, removeLocalItem, setLocalItem, loadIconEvents,
    handleIconClick, composeFavoriteChar, countFavorites,
    renderFavorites, checkFavoriteState
}