function generateRandomMaze() {
    const width = grid[0].length - 1;
    const height = grid.length - 1;

    const buildSequence = [];

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const isWall = Math.random() > 0.5;
            if (isWall) {
                grid[i][j] = WALL_SEGMENT;
                buildSequence.push([j, i])
            }
        }
    }

    return buildSequence
}

function binaryTreeMaze() {
    const width = grid[0].length - 1;
    const height = grid.length - 1;

    const buildSequence = [];

    // generate grid of "width / 2" * "height / 2" cells
    for (let i = 1; i < height; i += 2) {
        for (let j = 1; j < width; j += 2) {
            // push the starting wall of this cell
            buildSequence.push([j, i])

            // decide whether the cell will extend north or west
            const northOrWest = Math.random() > 0.5;
            if (northOrWest) { // extend north
                buildSequence.push([j + 1, i])
            } else { // extend west
                buildSequence.push([j, i + 1])
            }
        }
    }

    return buildSequence
}

function recursiveDivisionMaze() {
    const width = grid[0].length;
    const height = grid.length;

    const buildSequence = [];

    // build the outer walls
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const leftOrRightWall = j === 0 || j === width - 1
            if (i === 0) {
                grid[i][j] = WALL_SEGMENT
                buildSequence.push([j, i])
            } else if (i === height - 1) {
                grid[i][j] = WALL_SEGMENT
                buildSequence.push([j, i])
            } else if (i > 0 && i < height && leftOrRightWall) {
                grid[i][j] = WALL_SEGMENT
                buildSequence.push([j, i])
            }
        }
    }

    // recursively divide rooms by building a wall with a path through it
    let offset = 2


    // make a vertical(?!) wall at a random height
    // NOTE: I originally believed this code would build a *horizontal* wall... a vertical one is just as good but...
    // ...why did it turn out that way?
    console.log("...................................")
    console.log("* * * * Building wall one")
    let newWallXCoord = parseInt((Math.random() * width).toFixed(0)); // the horizontal location of the wall
    let startVal = 1 // start at y=1
    let endVal = height - 1 // end at y=height-1

    let unacceptableStartPosition = newWallXCoord <= offset || newWallXCoord >= width - offset || newWallXCoord % 2 === 1
    while (unacceptableStartPosition) {
        newWallXCoord = parseInt((Math.random() * width).toFixed(0));
        unacceptableStartPosition = newWallXCoord <= offset || newWallXCoord >= width - offset || newWallXCoord % 2 === 1
    }
    let wallNodes = buildNewWall(newWallXCoord, startVal, endVal, true); // "position, startLocation, endLocation, isVertical"
    let prevWallNodes = wallNodes; // exists so later code can update the val of "wallNodes" w/o overwriting useful info
    for (let i = 0; i < wallNodes.length; i++) {
        buildSequence.push(wallNodes[i])
    }
    let biggerSegmentIsOnRightSide = newWallXCoord >= (width / 2) // TESTED: this seems to pass 100% of the time



    // make a horizontal(?!) wall in the bigger cell
    console.log("...................................")
    console.log("* * * * Building wall 2")
    let newWallYCoord = parseInt((Math.random() * height).toFixed(0)); // the vertical location of the wall

    unacceptableStartPosition = newWallYCoord <= offset || newWallYCoord >= height - offset || newWallYCoord % 2 === 1
    while (unacceptableStartPosition) {
        newWallYCoord = parseInt((Math.random() * height).toFixed(0))
        unacceptableStartPosition = newWallYCoord <= offset || newWallYCoord >= height - offset || newWallYCoord % 2 === 1
    }

    // NOTE: EXPLANATION FOR "prevWallNodes.filter(node => node[1] === newWallYCoord)[0][0]" IS AS FOLLOWS...
    // the code searches thru prevWallNodes, a list of coordinates for the previous wall, for the entry where the Y coordinate 
    // (the height) is equal to the height of the next wall. It returns the entry where those two match.
    // Then it extracts the X coordinate's value ("[0][0]", since .filter returns a 1 entry list e.g. "[[2, 3]]")
    // and sets that X value equal to either the start value or the end value of the new wall, depending on whether
    // the new wall will be on the left or the right of the previous wall.
    let gapIsAtHeightOfNewWall = prevWallNodes.filter(node => node[1] === newWallYCoord).length === 0

    if (biggerSegmentIsOnRightSide) { // decide whether to build in the left or right cell
        // get the x value where the wall starts (this is the x value of the prev vertical wall)
        // startVal = prevWallNodes.filter(node => node[1] === newWallYCoord)[0][0]
        console.log(prevWallNodes, newWallYCoord)
        if (gapIsAtHeightOfNewWall) {
            startVal = prevWallNodes[0][0] + 1
        } else {
            startVal = prevWallNodes[0][0]
        }
        // get the x value where the wall ends (this is equal to the width of the grid because we end adjacent to the right wall)
        endVal = width - 1
    } else { // 
        // get the x value where the wall starts (this is 1 because we are starting adjacent to the left wall)
        startVal = 1
        // Uncaught TypeError: Cannot read property '0' of undefined at recursiveDivisionMaze (mazes.js:112)
        // get the x value where the wall ends (this is the x value of the prev vertical wall)
        // endVal = prevWallNodes.filter(node => node[1] === newWallYCoord)[0][0]
        if (gapIsAtHeightOfNewWall) {
            endVal = prevWallNodes[0][0] - 1

        } else {
            endVal = prevWallNodes[0][0]
        }
    }
    wallNodes = buildNewWall(newWallYCoord, startVal, endVal, false);
    for (let i = 0; i < wallNodes.length; i++) {
        buildSequence.push(wallNodes[i])
    }

    // make a horizontal wall in the smaller cell
    console.log("* * * * Building wall three")
    // use a new random newWallYCoord
    // newWallYCoord is the y coord here, the vertical location of the wall
    newWallYCoord = parseInt((Math.random() * height).toFixed(0))

    unacceptableStartPosition = newWallYCoord <= offset || newWallYCoord >= height - offset || newWallYCoord % 2 === 1
    while (unacceptableStartPosition) {
        newWallYCoord = parseInt((Math.random() * height).toFixed(0))
        unacceptableStartPosition = newWallYCoord <= offset || newWallYCoord >= height - offset || newWallYCoord % 2 === 1
    }
    console.log("...................................")

    gapIsAtHeightOfNewWall = prevWallNodes.filter(node => node[1] === newWallYCoord).length === 0
    // reverse the values in the if/else blocks from before because we are doing the other side of the wall (use !)
    if (!biggerSegmentIsOnRightSide) { // build in the cell opposite to the previous one
        console.log(prevWallNodes, newWallYCoord)
        if (gapIsAtHeightOfNewWall) {
            startVal = prevWallNodes[0][0] + 1
        } else {
            startVal = prevWallNodes[0][0]
        }
        endVal = width - 1
    } else {
        console.log(prevWallNodes, newWallYCoord)
        startVal = 1
        if (gapIsAtHeightOfNewWall) {
            endVal = prevWallNodes[0][0] - 1 // success for 1 test, i think
        } else {
            endVal = prevWallNodes[0][0]
        }
    }
    wallNodes = buildNewWall(newWallYCoord, startVal, endVal, false);

    for (let i = 0; i < wallNodes.length; i++) {
        buildSequence.push(wallNodes[i])
    }

    // todo: mk walls land on even numbered index values CHECK
    // fixme: buildNewWall() occasionally removes the same value used by newWallYCoord in the .filter()ing check.
    // causes Uncaught TypeError: Cannot read property '0' of undefined at recursiveDivisionMaze(mazes.js: 144)

    // TODO: add: "if cell height or width is = 3, in other words, if there is a 1 node trail to follow, stop recursion"

    return buildSequence
}

function buildNewWall(position, start, end, isVertical) {
    const wallNodesSequence = [];
    const endValWasOneTooLong = end - 1
    // choose a random position for the gap in the wall
    const rangeOfPotentialPositions = endValWasOneTooLong - start;
    const gapPosition = start + parseInt((Math.random() * rangeOfPotentialPositions).toFixed(0))
    console.log("buildNewWall values: ")
    console.log(start, endValWasOneTooLong, gapPosition)

    for (let i = start; i < endValWasOneTooLong; i++) {
        // this if block creates the wall's 1 unit gap
        if (i === gapPosition) {
            console.log("start: " + start)
            console.log("end: " + endValWasOneTooLong)
            console.log("gap position: " + gapPosition)
            continue
        } else {
            if (isVertical) {
                grid[i][position] = WALL_SEGMENT
                wallNodesSequence.push([position, i])
            } else {
                grid[position][i] = WALL_SEGMENT
                wallNodesSequence.push([i, position])
            }
        }
    }

    return wallNodesSequence
}
