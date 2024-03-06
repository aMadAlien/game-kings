const gridBlock = document.getElementById('grid-block')

const colsNum = 64
const rowsNum = 36
const totalTiles = colsNum * rowsNum

for (let i = 0; i < totalTiles; i++) {
    const tileBtnElem = document.createElement('button')
    tileBtnElem.setAttribute('id', 'tile-' + (i + 1))
    tileBtnElem.classList.add('grid-tile')

    tileBtnElem.addEventListener('click', () => {
        tileBtnElem.classList.toggle('grid-tile__selected')
    })

    gridBlock.appendChild(tileBtnElem)
}


const displayGridBtn = document.getElementById('display-grid')

const saveGridBtn = document.getElementById('grid-save')
const resetGridBtn = document.getElementById('grid-reset')
const cancelGridBtn = document.getElementById('grid-cancel')

displayGridBtn.addEventListener('click', () => {
    gridBlock.classList.remove('d-none')
    saveGridBtn.classList.remove('d-none')
    resetGridBtn.classList.remove('d-none')
    cancelGridBtn.classList.remove('d-none')
    displayGridBtn.style.display = 'none'
    menuModal.classList.add('d-none')
})

cancelGridBtn.addEventListener('click', () => {
    gridBlock.classList.add('d-none')
    saveGridBtn.classList.add('d-none')
    resetGridBtn.classList.add('d-none')
    cancelGridBtn.classList.add('d-none')
    displayGridBtn.style.display = 'block'
    menuModal.classList.add('d-none')
})

resetGridBtn.addEventListener('click', () => {
    [...gridBlock.children].forEach(tile => {
        tile.classList.remove('grid-tile__selected')
    });
})

saveGridBtn.addEventListener('click', () => {
    let collisionList = [...gridBlock.children].map(tile => {
        return tile.classList.contains('grid-tile__selected') ? 1 : 0
    });

    console.log({ collisionList });
    navigator.clipboard.writeText(collisionList)
})
