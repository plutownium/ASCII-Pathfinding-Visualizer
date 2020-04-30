class Path {
    constructor(distanceFromStart, currentPath, newCoords, containsTarget) {
        // a path contains a journey through a list of coordinates.
        this.distance = distanceFromStart
        if (currentPath.length - 1 < 0) {
            this.lastEntry = null
        } else {
            this.lastEntry = currentPath[currentPath.length - 1]
        }
        const startPath = currentPath
        startPath.push(newCoords)
        this.path = startPath
        this.containsTarget = containsTarget === TARGET_NODE ? true : false;
    }
}