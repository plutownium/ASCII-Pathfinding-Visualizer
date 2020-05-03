class Path {
    constructor(distanceFromStart, currentPath, newCoords, containsTarget) {
        // a path contains a journey through a list of coordinates.
        if (currentPath === undefined) {
            console.log("FAILURE!")
            throw "currentPath is undefined in Path constructor"
        }
        this.distance = distanceFromStart
        this.lastEntry = newCoords
        const startPath = currentPath
        startPath.push(newCoords)
        this.path = [...startPath]
        this.containsTarget = containsTarget; // do the boolean calculation outside of the class pls
    }
}

class Cell {
    constructor() {
        this.minX
        this.minY
        this.maxX
        this.maxY
        this.horizontal
        this.vertical

    }
}