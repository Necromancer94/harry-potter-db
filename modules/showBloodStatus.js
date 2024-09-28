import { loadData } from "../main.js"
import { createPopup, body } from "./overlayElements.js"

export default async function showBloodStatus() {

    // const cardContainer = document.querySelector('.card-container')
    // cardContainer.addEventListener('click', async (event) => {
    //     if(Array.from(document.querySelectorAll('.info-icon')).includes(event.target)){
    //     }
    // })

    const allCards = document.querySelectorAll('.card')
    for (let card of allCards) {

        card.querySelector('.info-icon').addEventListener('click', async () => {
            const charNameCard = card.querySelector('.name').textContent
            const exactNameUrl = 'https://api.potterdb.com/v1/characters?filter[name_eq]=' + charNameCard
            const uniqueCharacter = await loadData(exactNameUrl)

            createPopup(uniqueCharacter[0])
            const overlay = document.querySelector('.overlay')
            const alert = document.querySelector('.alert-box')

            function bodyClick(event) {
                const popupNotice = document.querySelector('.overlay')
                if(overlay.contains(event.target) && !alert.contains(event.target))
                popupNotice.remove()
                body.classList.remove('overflow-hidden')
                body.removeEventListener('click', bodyClick)
            }

            body.addEventListener('click', bodyClick)
        })
    }
}