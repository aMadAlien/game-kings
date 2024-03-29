class Player extends Sprite {
    constructor({
        collisionBlocks = [], diamonds, hearts, traps, boxes, onRestart,
        imageSrc, frameRate, animations, loop, pigs
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

        this.lives = 3

        this.sides = {
            bottom: this.position.y + this.height
        }
        this.gravity = 1

        this.collisionBlocks = collisionBlocks
        this.diamonds = diamonds
        this.hearts = hearts
        this.score = 0

        this.traps = traps
        this.boxes = boxes
        this.pigs = pigs
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
        this.updateLives()

        this.checkForVerticalCollisions()
        this.diamonds && this.checkDiamonds()
        this.hearts && this.checkHearts()
        this.traps && this.checkTraps()
        this.boxes && this.checkBoxes()
        this.pigs && this.checkPigs()
    }
    handleInput(keys) {
        if (player.preventInput) return

        player.velocity.x = 0

        if (keys.d.pressed) {
            player.switchSprite('runRight')
            player.velocity.x = 3
            player.lastDirection = 'right'
        } else if (keys.a.pressed) {
            player.switchSprite('runLeft')
            player.velocity.x = -3
            player.lastDirection = 'left'
        } else if (keys.e.pressed) {
            if (player.lastDirection === 'left')
                player.switchSprite('attackLeft')
            else player.switchSprite('attackRight')
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
                x: this.position.x + 20,
                y: this.position.y + 18
            },
            width: 23,
            height: 26
        }
    }
    hitPig() {
        for (let i = 0; i < this.pigs.length; i++) {
            const kingX = this.position.x - 5
            const kingX2 = this.position.x + this.width + 5
            const pig = this.pigs[i]
            const pigX = pig.hitbox.position.x
            const pigX2 = pigX + pig.size.width / 2
            const pigY = pig.hitbox.position.y
            const kingY = this.position.y
            const kingY2 = kingY + this.hitbox.height

            if (
                (
                    this.lastDirection === 'left' &&
                    (kingX === pigX2 || pigX2 > kingX && pigX2 < kingX2) ||
                    this.lastDirection === 'right' &&
                    (kingX2 === pigX || pigX > kingX && pigX < kingX2)
                ) &&
                kingY <= pigY && pigY <= kingY2
            ) {
                pig.hitted()
            }
        }
    }
    updateLives() {
        if (this.lives === 0) {
            this.restart()
        }
    }
    checkPigs() {
        for (let i = 0; i < this.pigs.length; i++) {
            const pig = this.pigs[i]

            if (
                this.hitbox.position.x <= pig.hitbox.position.x + pig.size.width &&
                this.hitbox.position.x + this.hitbox.width >= pig.hitbox.position.x &&
                this.hitbox.position.y + this.hitbox.height >= pig.hitbox.position.y &&
                this.hitbox.position.y <= pig.hitbox.position.y + pig.size.height
            ) {
                this.preventInput = true
                this.velocity.x = 0
                let distance = 20

                if (this.lastDirection === 'left') {
                    const offset = pig.hitbox.position.x + pig.size.width - this.hitbox.position.x
                    this.position.x += 5 + offset
                    this.switchSprite('hitLeft')
                } else {
                    distance = -20
                    const offset = this.hitbox.position.x + this.hitbox.width - pig.hitbox.position.x
                    this.position.x -= 5 + offset
                    this.switchSprite('hitRight')
                }

                this.lives--

                setTimeout(() => {
                    this.preventInput = false
                    this.position.x += distance
                }, 100);
            }
        }
    }
    checkBoxes() {
        for (let i = 0; i < this.boxes.length; i++) {
            const box = this.boxes[i]

            if (
                player.hitbox.position.x <= box.position.x + box.width &&
                player.hitbox.position.x + player.hitbox.width >= box.position.x &&
                player.hitbox.position.y + .01 + player.hitbox.height >= box.position.y &&
                player.hitbox.position.y + .01 <= box.position.y + box.height
            ) {
                // move right
                if (this.velocity.x < 0 && this.velocity.y <= 0) {
                    box.position.x = this.hitbox.position.x - box.width + 0.01
                    break
                }

                // move left
                if (this.velocity.x > 0 && this.velocity.y <= 0) {
                    box.position.x = this.hitbox.position.x + this.hitbox.width - 0.01
                    break
                }

                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = box.position.y - offset
                    break
                }
            }
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
                this.restart()
            }
        }
    }
    restart() {
        document.getElementById('menu').classList.add('d-none')
        gsap.to(overvay, {
            opacity: 1,
            onComplete: () => {
                gsap.to(overvay, {
                    opacity: 0,
                })
                this.lives = 3
                this.score = 0
                updateScore(this.score)
                player.onRestart()
            }
        })
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
                    updateScore(this.score)
                }
            }
        }
    }
    checkHearts() {
        if (this.lives >= 3) return

        for (let i = 0; i < this.hearts.length; i++) {
            const diamond = this.hearts[i]
            if (
                player.hitbox.position.x <= diamond.position.x + diamond.width &&
                player.hitbox.position.x + player.hitbox.width >= diamond.position.x &&
                player.hitbox.position.y + player.hitbox.height >= diamond.position.y &&
                player.hitbox.position.y <= diamond.position.y + diamond.height
            ) {
                const diamondId = this.hearts.indexOf(diamond)
                if (diamondId > -1) {
                    this.hearts.splice(diamondId, 1)
                    this.lives++
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