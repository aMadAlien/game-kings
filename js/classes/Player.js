class Player extends Sprite {
    constructor({
        collisionBlocks = [], diamonds, traps, onRestart,
        imageSrc, frameRate, animations, loop
    }) {
        super({ imageSrc, frameRate, animations, loop })

        this.position = {
            x: 200,
            y: 200
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        this.sides = {
            bottom: this.position.y + this.height
        }
        this.gravity = 1

        this.collisionBlocks = collisionBlocks
        this.diamonds = diamonds
        this.score = 0

        this.traps = traps
        this.onRestart = onRestart
    }

    update() {
        // this is the blue box
        // c.fillStyle = 'rgba(0, 0, 255, 0.4)'
        // c.fillRect(this.position.x, this.position.y, this.width, this.height)

        this.position.x += this.velocity.x

        this.updateHitbox()

        this.checkForHofizontalCollisions()
        this.applyGravity()

        this.updateHitbox()

        this.checkForVerticalCollisions()
        this.diamonds && this.checkDiamonds()
        this.traps && this.checkTraps()
    }
    handleInput(keys) {
        if (player.preventInput) return

        player.velocity.x = 0

        if (keys.d.pressed) {
            player.switchSprite('runRight')
            player.velocity.x = 5
            player.lastDirection = 'right'
        } else if (keys.a.pressed) {
            player.switchSprite('runLeft')
            player.velocity.x = -5
            player.lastDirection = 'left'
        } else {
            if (player.lastDirection === 'left')
                player.switchSprite('idleLeft')
            else player.switchSprite('idleRight')
        }
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
    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 58,
                y: this.position.y + 34
            },
            width: 50,
            height: 53
        }
    }
    checkTraps() {
        for (let i = 0; i < this.traps.length; i++) {
            const trap = this.traps[i]
            if (
                player.hitbox.position.x <= trap.position.x + trap.width &&
                player.hitbox.position.x + player.hitbox.width >= trap.position.x &&
                player.hitbox.position.y + player.hitbox.height >= trap.position.y &&
                player.hitbox.position.y <= trap.position.y + trap.height
            ) {
                player.position.x -= 70
                player.position.y -= 100
                this.score = 0
                document.getElementById('score').textContent = this.score
                player.onRestart()
            }
        }
    }
    checkDiamonds() {
        for (let i = 0; i < this.diamonds.length; i++) {
            const diamond = this.diamonds[i]
            if (
                player.hitbox.position.x <= diamond.position.x + diamond.width &&
                player.hitbox.position.x + player.hitbox.width >= diamond.position.x &&
                player.hitbox.position.y + player.hitbox.height >= diamond.position.y &&
                player.hitbox.position.y <= diamond.position.y + diamond.height
            ) {
                const diamondId = this.diamonds.indexOf(diamond)
                if (diamondId > -1) {
                    this.diamonds.splice(diamondId, 1)
                    this.score++
                    document.getElementById('score').textContent = this.score
                }
            }
        }
    }
    checkForHofizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]

            // if a collision exists
            if (
                this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                // collision on x axis going to the left
                if (this.velocity.x < 0) {
                    const offset = this.hitbox.position.x - this.position.x
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
                    break
                }

                if (this.velocity.x > 0) {
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                    this.position.x = collisionBlock.position.x - offset - 0.01
                    break
                }
            }
        }
    }
    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i]

            // if a collision exists
            if (
                this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
                this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
                this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
            ) {
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
                    break
                }

                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = collisionBlock.position.y - offset - 0.01
                    break
                }
            }
        }
    }
    applyGravity() {
        this.velocity.y += this.gravity
        this.position.y += this.velocity.y
    }
}