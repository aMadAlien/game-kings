window.addEventListener('keydown', (e) => {
    if (player.preventInput) return
    switch (e.key.toLocaleLowerCase()) {
        case 'w':
        case 'arrowup':
            for (let i = 0; i < doors.length; i++) {
                const door = doors[i]
                if (
                    player.hitbox.position.x + player.hitbox.width <= door.position.x + door.width &&
                    player.hitbox.position.x >= door.position.x &&
                    player.hitbox.position.y + player.hitbox.height >= door.position.y &&
                    player.hitbox.position.y <= door.position.y + door.height &&
                    !player.diamonds.length
                ) {
                    player.velocity.x = 0
                    player.velocity.y = 0
                    player.preventInput = true
                    player.switchSprite('enterDoor')
                    door.play()
                    return
                }
            }
            if (player.velocity.y === 0) player.velocity.y = -15
            break
        case 'a':
        case 'arrowleft':
            keys.a.pressed = true
            break
        case 'd':
        case 'arrowright':
            keys.d.pressed = true
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key.toLocaleLowerCase()) {
        case 'a':
        case 'arrowleft':
            keys.a.pressed = false
            break
        case 'd':
        case 'arrowright':
            keys.d.pressed = false
            break
    }
})