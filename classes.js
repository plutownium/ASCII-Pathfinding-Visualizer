class Path {
    constructor(distanceFromStart, currentPath, newCoords, containsTarget) {
        // a path contains a journey through a list of coordinates.
        this.distance = distanceFromStart
        this.lastEntry = currentPath[currentPath.length - 1]
        this.path = currentPath.push(newCoords)
        this.containsTarget = containsTarget === TARGET_NODE ? true : false;
    }
}