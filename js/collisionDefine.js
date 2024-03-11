const mode = 'production' // || 'dev'

const gridBlock = document.getElementById('grid-block')

const colsNum = 64
const rowsNum = 36
const totalTiles = colsNum * rowsNum

function buildGrid() {
    for (let i = 0; i < totalTiles; i++) {
        const tileBtnElem = document.createElement('button')
        tileBtnElem.setAttribute('id', 'tile-' + (i + 1))
        tileBtnElem.classList.add('grid-tile')

        tileBtnElem.addEventListener('click', () => {
            tileBtnElem.classList.toggle('grid-tile__selected')
        })

        gridBlock.appendChild(tileBtnElem)
    }
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

    if (!gridBlock.hasChildNodes()) {
        buildGrid()
    }
})

function selectTile(e) {
    e.target.classList.toggle('grid-tile__selected');
}

gridBlock.addEventListener('mousedown', () => {
    [...gridBlock.children].forEach(tile => {
        tile.addEventListener('mouseover', selectTile);
    });
});

gridBlock.addEventListener('mouseup', () => {
    [...gridBlock.children].forEach(tile => {
        tile.removeEventListener('mouseover', selectTile);
    });
});

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

const canvasCoordinatesElem = document.getElementById('get-coordinates')

let getCoordinates = false

canvasCoordinatesElem.addEventListener('click', () => {
    getCoordinates = !getCoordinates

    canvas.classList.toggle('cursor-crosshair')
    menuModal.classList.add('d-none')

    if (getCoordinates) {
        canvas.addEventListener('click', getCursorPosition)
    } else {
        canvas.removeEventListener('click', getCursorPosition)
    }
})

function getCursorPosition(event) {
    const rect = canvas.getBoundingClientRect()
    const x = Math.floor(event.clientX - rect.left) - 10
    const y = Math.floor(event.clientY - rect.top)
    console.log({ x, y })
    navigator.clipboard.writeText(`{ x: ${x}, y: ${y} }`)
}



if (mode === 'production') {
    displayGridBtn.style.display = 'none'
    canvasCoordinatesElem.style.display = 'none'
}
