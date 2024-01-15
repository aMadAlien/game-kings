window.addEventListener('keydown', (e) => {
    switch (e.key.toLocaleLowerCase()) {
        case 'w':
        case 'arrowup':
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