const openMapBtn = document.getElementById('open-map-btn');
const welcomeWindow = document.getElementById('welcome-window')

if (!welcomeWindow.classList.contains('move-left')) {
    openMapBtn.addEventListener('click', () => {
        console.log('add');
        welcomeWindow.classList.add('move-left')
    })
}

