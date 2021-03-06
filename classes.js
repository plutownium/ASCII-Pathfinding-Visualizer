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
    // offset = 2; // commented out 'cause it was causing a SyntaxError somehow

    constructor(xMin, xMax, yMin, yMax, isHorizontal, isVertical, verticalWallXCoord, horizontalWallYCoord, parentCell, cellNumber,
        subdivideFurther) {
        this.cellNumber = cellNumber;
        this.recurse = subdivideFurther;
        this.verticalWallXCoord = verticalWallXCoord // at which x coord is the | located
        this.horizontalWallYCoord = horizontalWallYCoord // at which y coord is the - located (at which height)

        this.xMin = xMin;
        // value should include the position of the bottom wall because looping will stop at i < this.maxX
        this.xMax = xMax;

        this.yMin = yMin;
        // value should include the position of the right wall because looping will stop at i < this.maxY
        this.yMax = yMax;

        this.splitsHorizontally = isHorizontal;
        this.splitsVertically = isVertical;

        if (parentCell) {
            this.prevWallIsHorizontal = parentCell.splitsHorizontally;
            this.prevWallIsVertical = parentCell.splitsVertically;
        } else {
            this.prevWallIsHorizontal = null;
            this.prevWallIsVertical = true; // because the first wall starts out vertically
        }

        // this.wallInstructions = [];
    }
}