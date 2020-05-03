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
    const cells = [];

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
    cells.push()

    // ### ### ### ### 
    // now recursion yields 2 new cells

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
            startVal = prevWallNodes[0][0] + 2
            console.log("status code: 1")
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
            console.log("status code: 2")
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
            console.log("status code: 3")
            startVal = prevWallNodes[0][0] + 2
        } else {
            startVal = prevWallNodes[0][0]
        }
        endVal = width - 1
    } else {
        console.log(prevWallNodes, newWallYCoord)
        startVal = 1
        if (gapIsAtHeightOfNewWall) {
            console.log("status code: 4")
            endVal = prevWallNodes[0][0] - 1 // success for 1 test, i think
        } else {
            endVal = prevWallNodes[0][0]
        }
    }
    wallNodes = buildNewWall(newWallYCoord, startVal, endVal, false);

    for (let i = 0; i < wallNodes.length; i++) {
        buildSequence.push(wallNodes[i])
    }

    // summary: what info do I really need to perform a hypothetical createCell() function?
    // gathered from the creation of walls #2 and #3...
    // cell number
    // new Wall X coodinate or new Wall Y coordinate (could be separate values, only 1 filled in for each instance)
    // "is wall horizontal or vertical?" (alternative to prev line)
    // is wall position acceptable?
    // position of gap in previous wall & "is the next wall at the same x/y coordinate as the previous wall?"
    // is the bigger empty cell on the right or the left, the top or the bottom?
    // the position of the new wall
    // the start coord of the new wall
    // the end coord of the new wall
    // the sequence of wall nodes added to the grid, to be fed into buildSequence
    // 
    // and: what data do i need to prepare for the next call of createCell() ? what elements of createCell #2 are used in #3?
    // 
    // plan: mk func subdivideCell(). it does what it says: takes a cell as an input, returns the two subdivided cells.
    // each Cell has instructions for a Wall and info about the surrounding walls. 
    // after subdivideCell() has been used to create an array of Cells, iterate over the list and extract each Cell's
    // .wallInstructions property, building as you go.


    // ### ### ### ### 
    // now recursion yields FOUR new cells... step 1 is to determine whether they're horizontal or vertical 
    // (based on whether) the prev cycle put vertical or horizontal walls. we alternate.
    // step 2 is to determine their start and end coordinates
    // step 3 is to build the wall.
    // step 4 is to repeat for the next cell.

    // TODO: add: "if cell height or width is = 3, in other words, if there is a 1 node trail to follow, stop recursion"
    console.log(grid)
    return buildSequence
}

function buildNewWall(position, start, end, isVertical) {
    const wallNodesSequence = [];
    const endValWasOneTooLongForThis = end - 1
    // choose a random position for the gap in the wall
    const rangeOfPotentialPositions = endValWasOneTooLongForThis - start;
    let gapPosition = start + parseInt((Math.random() * rangeOfPotentialPositions).toFixed(0))
    while (gapPosition === start) {
        gapPosition = start + parseInt((Math.random() * rangeOfPotentialPositions).toFixed(0))
    }

    for (let i = start; i < end; i++) {
        // this if block creates the wall's 1 unit gap
        if (i === gapPosition) {
            console.log("start: " + start)
            console.log("gap position: " + gapPosition)
            console.log("end: " + endValWasOneTooLongForThis)
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
