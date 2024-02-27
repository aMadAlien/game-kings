
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 64 * 16
canvas.height = 64 * 9

let parsedCollistions, collisionBlocks, background
let doors, diamonds, traps, boxes, pigs
let deadPigs = []


const player = new Player({
    imageSrc: './img/king/idle.png',
    frameRate: 11,
    onRestart: () => {
        deadPigs = []
        levels[level].init()
    },
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
        attackRight: {
            frameRate: 3,
            frameBuffer: 1,
            loop: false,
            autoPlay: false,
            imageSrc: './img/king/attackRight.png',
        },
        attackLeft: {
            frameRate: 3,
            frameBuffer: 1,
            loop: false,
            autoPlay: false,
            imageSrc: './img/king/attackLeft.png',
        },
        hitRight: {
            frameRate: 1,
            frameBuffer: 1,
            loop: false,
            autoPlay: false,
            imageSrc: './img/king/hitRight.png',
        },
        hitLeft: {
            frameRate: 1,
            frameBuffer: 1,
            loop: false,
            autoPlay: false,
            imageSrc: './img/king/hitLeft.png',
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
                        traps = []
                        pigs = []
                        deadPigs = []
                        player.score = 0
                        document.getElementById('score').textContent = player.score
                        player.lives = 3
                        document.getElementById('lives').textContent = player.lives
                        level++
                        localStorage.setItem('game-data', JSON.stringify({ lastLevel: level }))
                        if (level > Object.keys(levels).length) level = 1
                        levels[level].init()
                        player.switchSprite('idleRight')
                        player.preventInput = false
                        gsap.to(overvay, {
                            opacity: 0
                        })
                    }
                })
            }
        },
    }
})

function pigDie(index) {
    const direction = player.lastDirection.charAt(0).toUpperCase() + player.lastDirection.slice(1)
    const deadPig = pigs[index]
    deadPigs.push(new Sprite({
        position: deadPig.hitbox.position,
        frameRate: 1,
        imageSrc: `./img/pigs/lying${direction}.png`,
    }))

    pigs.splice(index, 1)
}

let levels = {
    1: {
        init: () => {
            parsedCollistions = collisionsLevel1.parse2D()
            collisionBlocks = parsedCollistions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks

            if (player.currentAnimation) player.currentAnimation.isActive = false

            diamonds = [
                new Sprite({
                    position: {
                        x: 567,
                        y: 350
                    },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/items/diamond.png',
                }),
                new Sprite({
                    position: {
                        x: 367,
                        y: 220
                    },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/items/diamond.png',
                })
            ]
            player.diamonds = diamonds

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
            parsedCollistions = collisionsLevel1.parse2D()
            collisionBlocks = parsedCollistions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 200
            player.position.y = 200

            if (player.currentAnimation) player.currentAnimation.isActive = false

            diamonds = [
                new Sprite({
                    position: {
                        x: 150,
                        y: 270
                    },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/items/diamond.png',
                })
            ]
            player.diamonds = diamonds

            pigs = [
                new Pig({
                    imageSrc: './img/pigs/idleRight.png',
                    frameRate: 11,
                    frameBuffer: 1,
                    die: (index) => pigDie(index),
                    direction: 'Right',
                    position: {
                        x: 567,
                        y: 315
                    },
                    size: {
                        width: 35,
                        height: 35
                    },
                })
            ]
            player.pigs = pigs

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
    3: {
        init: () => {
            parsedCollistions = collisionsLevel2.parse2D()
            collisionBlocks = parsedCollistions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 96
            player.position.y = 113

            if (player.currentAnimation) player.currentAnimation.isActive = false

            diamonds = [
                new Sprite({
                    position: {
                        x: 310,
                        y: 90
                    },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/items/diamond.png',
                }),
                new Sprite({
                    position: {
                        x: 180,
                        y: 450
                    },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/items/diamond.png',
                }),
                new Sprite({
                    position: {
                        x: 550,
                        y: 450
                    },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/items/diamond.png',
                })
            ]
            player.diamonds = diamonds

            pigs = [
                new Pig({
                    imageSrc: './img/pigs/idleLeft.png',
                    frameRate: 11,
                    frameBuffer: 1,
                    die: (index) => pigDie(index),
                    position: {
                        x: 125,
                        y: 445
                    },
                    direction: 'Left',
                    size: {
                        width: 35,
                        height: 35
                    }
                }),
                new Pig({
                    imageSrc: './img/pigs/idleRight.png',
                    frameRate: 11,
                    frameBuffer: 1,
                    die: (index) => pigDie(index),
                    position: {
                        x: 567,
                        y: 445
                    },
                    direction: 'Right',
                    size: {
                        width: 35,
                        height: 35
                    }
                })
            ]
            player.pigs = pigs

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
    4: {
        init: () => {
            parsedCollistions = collisionsLevel3.parse2D()
            collisionBlocks = parsedCollistions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 750
            player.position.y = 230

            if (player.currentAnimation) player.currentAnimation.isActive = false

            diamonds = [
                new Sprite({
                    position: {
                        x: 570,
                        y: 200
                    },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/items/diamond.png',
                }),
                new Sprite({
                    position: {
                        x: 800,
                        y: 350
                    },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/items/diamond.png',
                }),
                new Sprite({
                    position: {
                        x: 350,
                        y: 390
                    },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/items/diamond.png',
                })
            ]
            player.diamonds = diamonds


            traps = [
                new Sprite({
                    position: {
                        x: 400,
                        y: 433
                    },
                    imageSrc: './img/items/sharpTrap.png',
                })
            ]
            player.traps = traps

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
    },
    e: {
        pressed: false
    }
}

let overvay = {
    opacity: 0
}

let animFrame

function animate() {
    if (document.getElementById('map-window').classList.contains('move-left')) {
        animFrame = window.requestAnimationFrame(animate)
    }

    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)

    background.draw()
    // red collisions block
    // collisionBlocks.forEach((collisionBlock => {
    //     collisionBlock.draw()
    // }))

    diamonds.forEach(diamond => {
        diamond.draw()
    })

    traps?.forEach(trap => {
        trap.draw()
    })

    boxes?.forEach(box => {
        box.draw()
    })

    pigs?.forEach(pig => {
        pig.draw()
        pig.update()
    })

    deadPigs?.forEach(deadPig => {
        deadPig.draw()
    })

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

function resetGameSession() {
    traps = []
    pigs = []
    deadPigs = []
    player.score = 0
    document.getElementById('score').textContent = player.score
    player.lives = 3
    document.getElementById('lives').textContent = player.lives
    player.switchSprite('idleRight')
    player.preventInput = false
}

function runLevel(levelId) {
    level = levelId
    resetGameSession()
    window.cancelAnimationFrame(animFrame)
    levels[level].init()
    animate()
}