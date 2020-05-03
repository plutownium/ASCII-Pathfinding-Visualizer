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
    offset = 2;

    constructor(minX, minY, maxX, maxY, isHorizontal, isVertical, newWallXCoord, newWallYCoord, prevWallCoords, previousCellObj,
        top, left) {
        this.cellNumber = 0;

        this.newWallXCoord = newWallXCoord // at which x coord is the | located
        this.newWallYCoord = newWallYCoord // at which y coord is the - located (at which height)
        this.wallStartCoord;
        this.wallEndCoord;
        this.previousWallCoordinates = prevWallCoords;

        this.minX = minX;
        this.minY = minY;
        // value should include the position of the bottom wall because looping will stop at i < this.maxX
        this.maxX = maxX;
        // value should include the position of the right wall because looping will stop at i < this.maxY
        this.maxY = maxY;

        this.horizontal = isHorizontal;
        this.vertical = isVertical
        this.prevWallIsHorizontal = previousCellObj.horizontal;
        this.prevWallIsVertical = previousCellObj.vertical;

        this.isOnTopSideOfPrevWall = top; // boolean argument
        this.isOnLeftSideOfPrevWall = left;

        this.wallInstructions = [];

        this.unacceptableWallPosition = this.calcAcceptability()

    }

    static calcAcceptability() {
        // TODO: Figure out what makes the position of a wall acceptable in a Cell
        // as I see it, the wall position has to be between minX + 2 & maxX - 2, or between minY + 2 & maxY - 2
        // if it isn't, a different wall position must be assigned.

        // ... note you want to have an acceptable wall position input into the Cell initialization...
        // maybe calcAcceptability() should throw an error and end the program if it detects a bad wall pos... useful for debugging
    }
}