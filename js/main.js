const openMapBtn = document.getElementById('open-map-btn');
const welcomeWindow = document.getElementById('welcome-window')

if (!welcomeWindow.classList.contains('move-left')) {
    openMapBtn.addEventListener('click', () => {
        welcomeWindow.classList.add('move-left')
    })
}

const mapWindow = document.getElementById('map-window')
const levelsContainer = document.getElementsByClassName('map-container')[0]

localStorage.setItem('game-data', JSON.stringify({ lastLevel: 2 }))

if (!mapWindow.classList.contains('move-left')) {
    for (let i = 1; i <= Object.keys(levels).length; i++) {
        const newLevelBtn = document.createElement('button')
        newLevelBtn.setAttribute('role', 'button')
        newLevelBtn.setAttribute('class', 'level-btn btn')
        newLevelBtn.innerText = i

        const userData = JSON.parse(localStorage.getItem('game-data'))

        if (userData) {
            const lastLevel = userData.lastLevel
            if (lastLevel > i) {
                newLevelBtn.classList.add('level-done')
            } else if (lastLevel === i) {
                newLevelBtn.classList.add('level-current')
            } else {
                newLevelBtn.classList.add('level-blocked')
            }
        }

        levelsContainer.appendChild(newLevelBtn)
    }
}
