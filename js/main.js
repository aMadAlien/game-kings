const openMapBtn = document.getElementById('open-map-btn');
const welcomeWindow = document.getElementById('welcome-window')

if (!welcomeWindow.classList.contains('move-left')) {
    openMapBtn.addEventListener('click', () => {
        welcomeWindow.classList.add('move-left')
    })
}

const mapWindow = document.getElementById('map-window')
const levelsContainer = document.getElementsByClassName('map-container')[0]

if (!mapWindow.classList.contains('move-left')) {
    for (let i = 0; i < Object.keys(levels).length; i++) {
        const newLevelBtn = document.createElement('button')
        newLevelBtn.setAttribute('role', 'button')
        newLevelBtn.setAttribute('class', 'level-btn btn')
        newLevelBtn.innerText = i + 1
        levelsContainer.appendChild(newLevelBtn)
    }
}
