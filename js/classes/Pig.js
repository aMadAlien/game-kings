class Pig extends Sprite {
    constructor({ position, size,
        imageSrc, frameRate, animations, loop
    }) {
        super({ imageSrc, frameRate, animations, loop })
        this.position = position
        this.size = size
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
                x: this.position.x + 25,
                y: this.position.y + 22
            }
        }
    }
}