let userData = null

window.addEventListener("load", (event) => {
    // set user's data
    userData = JSON.parse(localStorage.getItem('game-data'))
    if (!userData) {
        userData = { lastLevel: 1 }
        localStorage.setItem('game-data', JSON.stringify(userData))
    }

    // create levels map
    createLevelsMap(Object.keys(levels).length)
    listenLevelSelect()
});

// listen click on start btn
const openMapBtn = document.getElementById('open-map-btn');
const welcomeWindow = document.getElementById('welcome-window')
const bgAudioElem = document.getElementById('bg-audio')

if (!welcomeWindow.classList.contains('move-left')) {
    openMapBtn.addEventListener('click', () => {
        welcomeWindow.classList.add('move-left')
        bgAudioElem.play()
    })
}

const mapWindow = document.getElementById('map-window')
const levelsContainer = document.getElementsByClassName('map-container')[0]

function listenLevelSelect() {
    for (let i = 1; i <= levelsContainer.childNodes.length; i++) {
        const levelBtn = levelsContainer.childNodes[i - 1]
        const lastLevel = JSON.parse(localStorage.getItem('game-data')).lastLevel

        if (lastLevel >= i) {
            if (lastLevel > i) {
                levelBtn.classList.remove('level-current')
                levelBtn.classList.add('level-done')
            } else if (lastLevel === i) {
                levelBtn.classList.remove('level-blocked')
                levelBtn.classList.add('level-current')
            }

            levelBtn.addEventListener('click', () => {
                mapWindow.classList.add('move-left')
                mapWindow.classList.remove('move-right')
                runLevel(i)
            })
        } else {
            levelBtn.classList.add('level-blocked')
        }
    }
}

function createLevelsMap(length) {
    for (let i = 1; i <= length; i++) {
        const newLevelBtn = document.createElement('button')
        newLevelBtn.setAttribute('role', 'button')
        newLevelBtn.setAttribute('class', 'level-btn btn')
        newLevelBtn.innerText = i

        levelsContainer.appendChild(newLevelBtn)
    }
}

// listen menu
const openMenuBtn = document.getElementById('open-menu-btn')
const closeMenuBtn = document.getElementById('close-menu-btn')
const menuModal = document.getElementById('menu')
const backToMapBtn = document.getElementById('back-to-map-btn')

openMenuBtn.addEventListener('click', () => {
    menuModal.classList.remove('d-none')
})
closeMenuBtn.addEventListener('click', () => {
    menuModal.classList.add('d-none')
})

backToMapBtn.addEventListener('click', () => {
    mapWindow.classList.add('move-right')
    mapWindow.classList.remove('move-left')
    menuModal.classList.add('d-none')
    listenLevelSelect()
})

const instructionBtn = document.getElementById('instruction-btn')
const instructionModal = document.getElementById('instruction')
const closeInstructionBtn = document.getElementById('close-instruction-btn')

instructionBtn.addEventListener('click', () => {
    instructionModal.classList.remove('d-none')
    menuModal.classList.add('d-none')
})

closeInstructionBtn.addEventListener('click', () => {
    instructionModal.classList.add('d-none')
})