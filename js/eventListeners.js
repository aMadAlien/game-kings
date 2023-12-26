window.addEventListener('keydown', (e) => {
    switch (e.key.toLocaleLowerCase()) {
        case 'w':
        case 'arrowup':
            if (player.velocity.y === 0) player.velocity.y = -10
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
    console.log(e.key.toLocaleLowerCase());
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