class Path {
    constructor(distanceFromStart, currentPath, newCoords, containsTarget) {
        // a path contains a journey through a list of coordinates.
        this.distance = distanceFromStart
        if (currentPath.length - 1 < 0) {
            this.lastEntry = newCoords // on init, should the lastEntry value be null?
        } else {
            this.lastEntry = currentPath[currentPath.length - 1]
        }
        const startPath = currentPath
        startPath.push(newCoords)
        this.path = startPath
        this.containsTarget = containsTarget; // do the boolean calculation outside of the class pls
    }
}