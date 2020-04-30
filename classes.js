class Path {
    constructor(distanceFromStart, currentPath, newCoords, containsTarget) {
        // a path contains a journey through a list of coordinates.
        this.distance = distanceFromStart
        console.log("90009:")
        console.log(currentPath) // what's SUPPOSED to happen?
        // currentPath.length < 0 is supposed to return true here, and 
        // then trigger this.lastEntry to be NULL because there is no "lastEntry" in the initial Path.
        // there IS supposed to be a "lastEntry" value for every Path after it, as lastEntry is defined as 
        if (currentPath.length < 0) {
            // if (currentPath === undefined) {
            //     // currentPath===undefined USED TO BE (currentPath.length < 0)
            //     this.lastEntry = newCoords // on init, should the lastEntry value be null? or what?
        } else {
            this.lastEntry = currentPath[currentPath.length - 1]
        }
        const startPath = currentPath
        startPath.push(newCoords)
        this.path = startPath
        this.containsTarget = containsTarget; // do the boolean calculation outside of the class pls
    }
}