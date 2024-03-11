
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 64 * 16
canvas.height = 64 * 9

let parsedCollistions, collisionBlocks, background
let doors, diamonds, traps, boxes, pigs, hearts
let deadPigs = []
let scores = []

const liveBar = new Sprite({
    position: {
        x: 10,
        y: 10
    },
    frameBuffer: 1,
    loop: false,
    autoPlay: false,
    imageSrc: './img/live-and-coins/live-bar.png',
})

const lives = [
    new Sprite({
        position: {
            x: 21,
            y: 20
        },
        frameRate: 8,
        frameBuffer: 11,
        loop: true,
        autoPlay: true,
        imageSrc: './img/live-and-coins/small-heart-idle.png',
    }),
    new Sprite({
        position: {
            x: 32,
            y: 20
        },
        frameRate: 8,
        frameBuffer: 12,
        loop: true,
        autoPlay: true,
        imageSrc: './img/live-and-coins/small-heart-idle.png',
    }),
    new Sprite({
        position: {
            x: 42,
            y: 20
        },
        frameRate: 8,
        frameBuffer: 13,
        loop: true,
        autoPlay: true,
        imageSrc: './img/live-and-coins/small-heart-idle.png',
    })
]

const scoreSprite = new Sprite({
    position: {
        x: 25,
        y: 38
    },
    frameRate: 8,
    frameBuffer: 14,
    loop: true,
    autoPlay: true,
    imageSrc: './img/live-and-coins/score-diamond-idle.png',
})

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
            frameBuffer: 3,
            loop: true,
            autoPlay: false,
            imageSrc: './img/king/attackRight.png',
        },
        attackLeft: {
            frameRate: 3,
            frameBuffer: 3,
            loop: true,
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
                        resetGameSession()
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

let level = 1
let levels = {
    1: {
        init: () => {
            parsedCollistions = collisionsLevel1.parse2D()
            collisionBlocks = parsedCollistions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 320
            player.position.y = 330

            if (player.currentAnimation) player.currentAnimation.isActive = false

            diamonds = [
                new Sprite({
                    position: {
                        x: 600,
                        y: 330
                    },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 468, y: 288 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                })
            ]
            player.diamonds = diamonds

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/levels/level-1.png'
            })
            doors = [
                new Sprite({
                    position: {
                        x: 640,
                        y: 296
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
            player.position.x = 255
            player.position.y = 200

            if (player.currentAnimation) player.currentAnimation.isActive = false

            diamonds = [
                new Sprite({
                    position: {
                        x: 400,
                        y: 270
                    },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: {
                        x: 300,
                        y: 410
                    },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 646, y: 354 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                })
            ]
            player.diamonds = diamonds

            pigs = [
                new Pig({
                    imageSrc: './img/pigs/idleLeft.png',
                    frameBuffer: 1,
                    die: (index) => pigDie(index),
                    position: { x: 350, y: 420 },
                    direction: 'Left',
                }),
                new Pig({
                    imageSrc: './img/pigs/idleRight.png',
                    frameBuffer: 1,
                    die: (index) => pigDie(index),
                    position: { x: 600, y: 388 },
                    direction: 'Right',
                })
            ]
            player.pigs = pigs

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/levels/level-2.png'
            })
            doors = [
                new Sprite({
                    position: {
                        x: 700,
                        y: 355
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
            player.position.x = 350
            player.position.y = 80

            if (player.currentAnimation) player.currentAnimation.isActive = false

            diamonds = [
                new Sprite({
                    position: {
                        x: 400,
                        y: 220
                    },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 630, y: 251 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: {
                        x: 380,
                        y: 220
                    },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: {
                        x: 430,
                        y: 285
                    },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: {
                        x: 470,
                        y: 350
                    },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: {
                        x: 310,
                        y: 380
                    },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: {
                        x: 550,
                        y: 480
                    },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: {
                        x: 640,
                        y: 460
                    },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: {
                        x: 690,
                        y: 285
                    },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: {
                        x: 630,
                        y: 330
                    },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: {
                        x: 695,
                        y: 400
                    },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: {
                        x: 675,
                        y: 400
                    },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 740, y: 105 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 715, y: 85 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 740, y: 85 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 740, y: 65 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 715, y: 65 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 740, y: 156 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 715, y: 105 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 310, y: 331 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
            ]
            player.diamonds = diamonds

            hearts = [
                new Sprite({
                    position: { x: 436, y: 162 },
                    frameRate: 8,
                    frameBuffer: 8,
                    imageSrc: './img/live-and-coins/heartIdle.png',
                }),
                new Sprite({
                    position: { x: 617, y: 463 },
                    frameRate: 8,
                    frameBuffer: 8,
                    imageSrc: './img/live-and-coins/heartIdle.png',
                }),
                new Sprite({
                    position: { x: 390, y: 414 },
                    frameRate: 8,
                    frameBuffer: 8,
                    imageSrc: './img/live-and-coins/heartIdle.png',
                }),
            ]
            player.hearts = hearts

            pigs = [
                new Pig({
                    imageSrc: './img/pigs/idleLeft.png',
                    frameBuffer: 1,
                    die: (index) => pigDie(index),
                    position: { x: 394, y: 277 },
                    direction: 'Left',
                }),
                new Pig({
                    imageSrc: './img/pigs/idleRight.png',
                    frameBuffer: 1,
                    die: (index) => pigDie(index),
                    position: { x: 470, y: 277 },
                    direction: 'Right',
                }),
                new Pig({
                    imageSrc: './img/pigs/idleLeft.png',
                    frameBuffer: 1,
                    die: (index) => pigDie(index),
                    position: { x: 330, y: 373 },
                    direction: 'Left',
                }),
                new Pig({
                    imageSrc: './img/pigs/idleLeft.png',
                    frameBuffer: 1,
                    die: (index) => pigDie(index),
                    position: { x: 486, y: 436 },
                    direction: 'Left',
                }),
                new Pig({
                    imageSrc: './img/pigs/idleRight.png',
                    frameBuffer: 1,
                    die: (index) => pigDie(index),
                    position: { x: 590, y: 450 },
                    direction: 'Right',
                }),
                new Pig({
                    imageSrc: './img/pigs/idleLeft.png',
                    frameBuffer: 1,
                    die: (index) => pigDie(index),
                    position: { x: 685, y: 149 },
                    direction: 'Left',
                }),
            ]
            player.pigs = pigs

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/levels/level-3.png'
            })
            doors = [
                new Sprite({
                    position: { x: 555, y: 168 },
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
            parsedCollistions = collisionsLevel4.parse2D()
            collisionBlocks = parsedCollistions.createObjectsFrom2D()
            player.collisionBlocks = collisionBlocks
            player.position.x = 560
            player.position.y = 80
            player.lastDirection = 'left'

            if (player.currentAnimation) player.currentAnimation.isActive = false

            diamonds = [
                new Sprite({
                    position: { x: 870, y: 156 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 860, y: 65 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 860, y: 85 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 860, y: 105 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 880, y: 65 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 880, y: 85 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 880, y: 105 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 775, y: 253 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 835, y: 286 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 775, y: 336 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 685, y: 345 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 685, y: 320 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 685, y: 295 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 685, y: 270 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 825, y: 390 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 825, y: 370 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 825, y: 350 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 825, y: 330 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 585, y: 445 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 605, y: 445 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 625, y: 445 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 645, y: 445 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 515, y: 100 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 550, y: 182 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 535, y: 202 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 515, y: 221 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 605, y: 285 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 406, y: 390 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 430, y: 390 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 455, y: 410 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 540, y: 410 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 360, y: 500 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 360, y: 525 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 335, y: 500 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 335, y: 525 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 165, y: 350 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 165, y: 330 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 210, y: 305 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 210, y: 285 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 120, y: 290 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 120, y: 270 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 100, y: 290 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 100, y: 270 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 265, y: 205 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 285, y: 205 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 305, y: 205 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 325, y: 205 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 265, y: 225 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 285, y: 225 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 305, y: 225 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
                new Sprite({
                    position: { x: 325, y: 225 },
                    frameRate: 10,
                    frameBuffer: 9,
                    imageSrc: './img/live-and-coins/diamondIdle.png',
                }),
            ]
            player.diamonds = diamonds

            hearts = [
                new Sprite({
                    position: { x: 692, y: 495 },
                    frameRate: 8,
                    frameBuffer: 8,
                    imageSrc: './img/live-and-coins/heartIdle.png',
                }),
                new Sprite({
                    position: { x: 455, y: 335 },
                    frameRate: 8,
                    frameBuffer: 8,
                    imageSrc: './img/live-and-coins/heartIdle.png',
                }),
                new Sprite({
                    position: { x: 614, y: 350 },
                    frameRate: 8,
                    frameBuffer: 8,
                    imageSrc: './img/live-and-coins/heartIdle.png',
                }),
            ]
            player.hearts = hearts

            pigs = [
                new Pig({
                    imageSrc: './img/pigs/idleLeft.png',
                    frameBuffer: 1,
                    die: (index) => pigDie(index),
                    position: { x: 545, y: 277 },
                    direction: 'Left',
                }),
                new Pig({
                    imageSrc: './img/pigs/idleLeft.png',
                    frameBuffer: 1,
                    die: (index) => pigDie(index),
                    position: { x: 485, y: 405 },
                    direction: 'Left',
                }),
                new Pig({
                    imageSrc: './img/pigs/idleRight.png',
                    frameBuffer: 1,
                    die: (index) => pigDie(index),
                    position: { x: 740, y: 453 },
                    direction: 'Right',
                }),
                new Pig({
                    imageSrc: './img/pigs/idleRight.png',
                    frameBuffer: 1,
                    die: (index) => pigDie(index),
                    position: { x: 780, y: 453 },
                    direction: 'Right',
                }),
                new Pig({
                    imageSrc: './img/pigs/idleLeft.png',
                    frameBuffer: 1,
                    die: (index) => pigDie(index),
                    position: { x: 720, y: 309 },
                    direction: 'Left',
                }),
                new Pig({
                    imageSrc: './img/pigs/idleRight.png',
                    frameBuffer: 1,
                    die: (index) => pigDie(index),
                    position: { x: 788, y: 149 },
                    direction: 'Right',
                }),
                new Pig({
                    imageSrc: './img/pigs/idleLeft.png',
                    frameBuffer: 1,
                    die: (index) => pigDie(index),
                    position: { x: 840, y: 149 },
                    direction: 'Left',
                }),
                new Pig({
                    imageSrc: './img/pigs/idleLeft.png',
                    frameBuffer: 1,
                    die: (index) => pigDie(index),
                    position: { x: 360, y: 389 },
                    direction: 'Left',
                }),
                new Pig({
                    imageSrc: './img/pigs/idleLeft.png',
                    frameBuffer: 1,
                    die: (index) => pigDie(index),
                    position: { x: 335, y: 389 },
                    direction: 'Left',
                }),
                new Pig({
                    imageSrc: './img/pigs/idleRight.png',
                    frameBuffer: 1,
                    die: (index) => pigDie(index),
                    position: { x: 300, y: 389 },
                    direction: 'Right',
                }),
                new Pig({
                    imageSrc: './img/pigs/idleRight.png',
                    frameBuffer: 1,
                    die: (index) => pigDie(index),
                    position: { x: 290, y: 517 },
                    direction: 'Right',
                }),
                new Pig({
                    imageSrc: './img/pigs/idleLeft.png',
                    frameBuffer: 1,
                    die: (index) => pigDie(index),
                    position: { x: 174, y: 388 },
                    direction: 'Left',
                }),
                new Pig({
                    imageSrc: './img/pigs/idleLeft.png',
                    frameBuffer: 1,
                    die: (index) => pigDie(index),
                    position: { x: 106, y: 388 },
                    direction: 'Left',
                }),
                new Pig({
                    imageSrc: './img/pigs/idleRight.png',
                    frameBuffer: 1,
                    die: (index) => pigDie(index),
                    position: { x: 286, y: 260 },
                    direction: 'Right',
                }),
                new Pig({
                    imageSrc: './img/pigs/idleRight.png',
                    frameBuffer: 1,
                    die: (index) => pigDie(index),
                    position: { x: 320, y: 260 },
                    direction: 'Right',
                }),
            ]
            player.pigs = pigs

            // traps = [
            //     new Sprite({
            //         position: {
            //             x: 400,
            //             y: 433
            //         },
            //         imageSrc: './img/items/sharpTrap.png',
            //     })
            // ]
            // player.traps = traps

            background = new Sprite({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: './img/levels/level-4.png'
            })
            doors = [
                new Sprite({
                    position: { x: 700, y: 168 },
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

function updateScore(num) {
    const scoreNums = String(num).split('')

    scores = scoreNums.map((num, numId) => {
        const scoreBarPos = 25;
        const scoreBarWidth = 18;
        const scoreNumWidth = 6;

        return new Sprite({
            position: {
                x: scoreBarPos + scoreBarWidth + scoreNumWidth * numId,
                y: 41
            },
            frameRate: 1,
            frameBuffer: 1,
            loop: false,
            autoPlay: false,
            imageSrc: `./img/numbers/num-${num}.png`,
        })
    });
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

    hearts?.forEach(heart => {
        heart.draw()
    })

    // traps?.forEach(trap => {
    //     trap.draw()
    // })

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

    liveBar.draw()
    lives.forEach((live, liveId) => {
        if (liveId + 1 > player.lives) return
        live.draw()
    })

    scoreSprite.draw()
    scores.forEach(s => {
        s.draw()
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
    hearts = []
    player.score = 0
    player.lives = 3
    updateScore(player.score)
}

function runLevel(levelId) {
    level = levelId
    resetGameSession()
    player.switchSprite('idleRight')
    player.preventInput = false
    window.cancelAnimationFrame(animFrame)
    levels[level].init()
    animate()
}