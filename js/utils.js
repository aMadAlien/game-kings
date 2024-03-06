// = function parse2D() {}
Array.prototype.parse2D = function () {
    const rows = []
    const colNum = 64
    for (let i = 0; i < this.length; i += colNum) {
        rows.push(this.slice(i, i + colNum))
    }

    return rows
}

Array.prototype.createObjectsFrom2D = function() {
    const objects = []
    this.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === 1) {
                objects.push(
                    new CollisionBlocks({
                        position: {
                            x: x * 16,
                            y: y * 16
                        }
                    })
                )
            }
        })
    })

    return objects
}