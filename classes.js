class Path {
    constructor(distanceFromStart, currentPath, newCoords, containsTarget) {
        // a path contains a journey through a list of coordinates.
        this.distance = distanceFromStart
        if (currentPath.length - 1 < 0) {
            this.lastEntry = null
        } else {
            this.lastEntry = currentPath[currentPath.length - 1]
        }

        console.log(newCoords)
        this.path = currentPath.push(newCoords)
        this.containsTarget = containsTarget === TARGET_NODE ? true : false;
    }
}