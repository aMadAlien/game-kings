class Pig extends Sprite {
    constructor({ position, size, die,
        imageSrc, frameRate, animations, loop
    }) {
        super({ imageSrc, frameRate, animations, loop })
        this.position = position
        this.size = size
        this.lives = 3
        this.die = die
    }

    update() {
        this.updateHitbox()
        // this is the blue box
        c.fillStyle = 'rgba(0, 0, 255, 0.4)'
        // c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.size.width, this.size.height)
    }
    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 33,
                y: this.position.y + 35
            }
        }
    }
    hitted() {
        this.lives--

        if (player.lastDirection === 'left')
            this.switchSprite('hitLeft')
        else this.switchSprite('hitRight')

        if (this.lives === 0)
            setTimeout(() => {
                this.die(pigs.indexOf(this))
                this.switchSprite('deadRight')
            }, 200)
        else
            setTimeout(() => this.switchSprite('idle'), 200);
    }
    switchSprite(name) {
        if (this.image === this.animations[name].image) return
        this.currentFrame = 0
        this.image = this.animations[name].image
        this.frameRate = this.animations[name].frameRate
        this.frameBuffer = this.animations[name].frameBuffer
        this.loop = this.animations[name].loop
        this.currentAnimation = this.animations[name]
    }
}