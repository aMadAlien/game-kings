
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 64 * 16
canvas.height = 64 * 9

let parsedCollistions, collisionBlocks, background
let doors


const player = new Player({
    imageSrc: './img/king/idle.png',
    frameRate: 11,
    animations: {
        idleRight: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: './img/king/idle.png',
        },
        idleLeft: {
            frameRate: 11,
            frameBuffer: 2,
            loop: true,
            imageSrc: './img/king/idleLeft.png',
        },
        runRight: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: './img/king/runRight.png',
        },
        runLeft: {
            frameRate: 8,
            frameBuffer: 4,
            loop: true,
            imageSrc: './img/king/runLeft.png',
        },
        enterDoor: {
            frameRate: 8,
            frameBuffer: 4,
            loop: false,
            imageSrc: './img/king/enterDoor.png',
            onComplete: () => {
                gsap.to(overvay, {
                    opacity: 1,
                    onComplete: () => {
                        level++
                        levels[level].init()
                        gsap.to(overvay, {
                            opacity: 0
                        })
                    }
                })
            }
        },
    }
})

let level = 1
let levels = {
    1: {
        init: () => {
            parsedCollistions = collisionsLevel1.parse2D()
            collisionBlocks = parsedCollistions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgroundLevel1.png'
            })
            doors = [
                new Sprite({
                    position: {
                        x: 767,
                        y: 270
                    },
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoPlay: false,
                    imageSrc: './img/doorOpen.png',
                })
            ]
        }
    },
    2: {
        init: () => {
            parsedCollistions = collisionsLevel2.parse2D()
            collisionBlocks = parsedCollistions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 96
            player.position.y = 113

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgroundLevel2.png'
            })
            doors = [
                new Sprite({
                    position: {
                        x: 772,
                        y: 336
                    },
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoPlay: false,
                    imageSrc: './img/doorOpen.png',
                })
            ]
        }
    },
    3: {
        init: () => {
            parsedCollistions = collisionsLevel3.parse2D()
            collisionBlocks = parsedCollistions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 750
            player.position.y = 230

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/backgroundLevel3.png'
            })
            doors = [
                new Sprite({
                    position: {
                        x: 176,
                        y: 335
                    },
                    frameRate: 5,
                    frameBuffer: 5,
                    loop: false,
                    autoPlay: false,
                    imageSrc: './img/doorOpen.png',
                })
            ]
        }
    }
}



let keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

let overvay = {
    opacity: 0
}

function animate() {
    window.requestAnimationFrame(animate)

    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    background.draw()
    collisionBlocks.forEach((collisionBlock => {
        collisionBlock.draw()
    }))

    doors.forEach(door => {
        door.draw()
    })

    player.handleInput(keys)
    player.draw()
    player.update()

    c.save()
    c.globalAlpha = overvay.opacity
    c.fillStyle = 'black'
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.restore()
}

levels[level].init()
animate()