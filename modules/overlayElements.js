export const body = document.querySelector('body')

function insertInBody(element) {
    body.classList.add('overflow-hidden')
    body.insertAdjacentElement('afterbegin', element)
}

function generateHTML(text, isWarning) {

    let markup = null

    if (isWarning) {
        markup =
            `
        <div class="bg-gray-400 opacity-60 absolute top-0 left-0 w-full h-full"> </div>
            <div role="alert" class="alert-box mobile:w-[70%] absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[50%] rounded-xl border p-10 shadow-sm  border-red-500 bg-red-50">
                <p class="m-auto text-md font-medium text-red-800">
                ${text ?? 'Failed to load data'}
                </p>
            </div>
        `
    }

    else {
        markup =
            `
        <div class="bg-gray-400 opacity-60 absolute top-0 left-0 w-full h-full"> </div>
            <div role="alert" class="alert-box mobile:w-[70%] absolute top-[50%] right-[50%] translate-x-[50%] translate-y-[50%] rounded-xl border border-gray-100 bg-white p-10 shadow-sm">
                <p class="m-auto text-md text-gray-700">
                ${text.attributes.blood_status ?? 'This information is unknown'}
                </p>
            </div>
        `
    }

    return markup
}

function renderPopup(){
    const newPopup = document.createElement('div')
    newPopup.classList.add('overlay', 'w-[100vw]', 'h-full', 'z-10', 'fixed')
    return newPopup
}


export function createPopup(data, warningStatus = '') {
    const popup = renderPopup()

    if(warningStatus){
        popup.innerHTML = generateHTML(data, 'warning')
    }

    else {
        popup.innerHTML = generateHTML(data)
    }
    
    insertInBody(popup)
}