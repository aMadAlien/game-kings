class Pig extends Sprite {
    constructor({ position, size = { width: 18, height: 18 }, die,
        imageSrc, frameRate = 11, loop, direction
    }) {
        super({ imageSrc, frameRate, loop })
        this.position = position
        this.size = size
        this.lives = 3
        this.die = die
        this.direction = direction
    }

    update() {
        this.updateHitbox()
        // this is the blue box
        c.fillStyle = 'rgba(0, 0, 255, 0.4)'
        c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.size.width, this.size.height)
    }
    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 5,
                y: this.position.y + 9
            }
        }
    }
    hitted() {
        this.lives--

        this.animate('hit')
        setTimeout(() => {
            if (this.lives === 0) {
                this.die(pigs.indexOf(this))
                this.animate('dead')
            } else
                this.animate('idle')
        }, 200)
    }
    switchSprite(animation, animationName) {
        if (this.currentAnimation === animationName) return
        this.currentFrame = 0
        this.image.src = animation.imageSrc
        this.frameRate = animation.frameRate
        this.frameBuffer = animation.frameBuffer
        this.loop = animation.loop
        this.currentAnimation = animationName
    }
    animate(animationName) {
        const playerDirection = player.lastDirection.charAt(0).toUpperCase() + player.lastDirection.slice(1)
        const pigDirection = this.direction

        if (animationName === 'hit' && playerDirection !== pigDirection) {
            this.direction = playerDirection
        }
        const animationList = {
            idle: {
                frameRate: 11,
                frameBuffer: 1,
                loop: false,
                autoPlay: false,
                imageSrc: `./img/pigs/idle${pigDirection}.png`,
            },
            hit: {
                frameRate: 2,
                frameBuffer: 1,
                loop: false,
                autoPlay: false,
                imageSrc: `./img/pigs/hit${playerDirection}.png`,
            },
            dead: {
                frameRate: 4,
                frameBuffer: 1,
                loop: false,
                autoPlay: false,
                imageSrc: `./img/pigs/dead${playerDirection}.png`,
            }
        }

        this.switchSprite(animationList[animationName], animationName)
    }
}