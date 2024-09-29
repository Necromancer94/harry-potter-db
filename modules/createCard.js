import { domElements } from "./domElements.js"

export default function createCard(characterObject) {
    const newCard = document.createElement('div')
    newCard.classList.add('card')
    newCard.innerHTML =
    `
    <img class="card-img w-[100px] mb-6 rounded-md" src="${characterObject.attributes.image ?? 'assets/unknown.svg'}">
    <div class="flex flex-col gap-3">
    <h3 class="name mt-0.5 font-bold text-gray-900 text-2xl">${characterObject.attributes.name ?? 'Unknown'}</h3>
    <span class="gender mt-2 line-clamp-3 text-sm/relaxed text-gray-500">Gender: ${characterObject.attributes.gender ?? 'Unknown'}</span>
    <span class="eye-color mt-2 line-clamp-3 text-sm/relaxed text-gray-500">Eye colour: ${characterObject.attributes.eye_color ?? 'Unknown'}</span>
    <span class="house mt-2 line-clamp-3 text-sm/relaxed text-gray-500">House: ${characterObject.attributes.house ?? 'Unknown'}</span>
    <span class="alive-status mt-2 line-clamp-3 text-sm/relaxed text-gray-500">Died: ${characterObject.attributes.died ?? 'Unknown'}</span>
    <span class="species mt-2 line-clamp-3 text-sm/relaxed text-gray-500">Species: ${characterObject.attributes.species ?? 'Unknown'}</span>
    </div>
    <img class="info-icon w-8 absolute top-5 right-5 cursor-pointer" title="reveal my blood status" 
    src="assets/info-icon.svg">
    <img class="favorite-icon w-6 absolute bottom-5 right-5 cursor-pointer" src="assets/star-white.svg">
    `

    domElements.cardContainer.appendChild(newCard)
}