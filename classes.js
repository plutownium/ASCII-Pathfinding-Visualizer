class Path {
    constructor(distanceFromStart, currentPath, newCoords, containsTarget) {
        // a path contains a journey through a list of coordinates.
        this.distance = distanceFromStart
        if (currentPath === undefined) {
            console.log("FAILURE!")
            throw "currentPath is undefined in Path constructor"
        }

        if (currentPath.length === 0) {
            this.lastEntry = null;
        } else {
            // look at the intent of this code. lastEntry is currentPath[-1], meaning, it's the node that LEAD TO the CurrentNode
            this.lastEntry = currentPath[currentPath.length - 1]
        }
        const startPath = currentPath
        startPath.push(newCoords)
        this.path = startPath
        this.containsTarget = containsTarget; // do the boolean calculation outside of the class pls
    }
}