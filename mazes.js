let CELL_NUMBER = 0;

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

    // plan: mk func subdivideCell(). it does what it says: takes a cell as an input, returns the two subdivided cells.
    // each Cell has instructions for a Wall and info about the surrounding walls. 
    // after subdivideCell() has been used to create an array of Cells, iterate over the list and extract each Cell's
    // .wallInstructions property, building as you go.

    // recursion of cell division, total cells: 1, 2, 4, 8, 16, 32, 64...

    // Step 1: initialize Room size Cell
    const offset = 2;
    let cellStorage = [];

    let initWallPosition = parseInt((Math.random() * width).toFixed(0)); // the location of the wall as an x coord

    let unacceptablePosition = initWallPosition <= offset || initWallPosition >= width - offset || initWallPosition % 2 === 1
    while (unacceptablePosition) {
        initWallPosition = parseInt((Math.random() * width).toFixed(0));
        unacceptablePosition = initWallPosition <= offset || initWallPosition >= width - offset || initWallPosition % 2 === 1
    }
    // Cell constructor: 
    // constructor(xMin, xMax, yMin, yMax, isHorizontal, isVertical, newWallXCoord, newWallYCoord, parentCell, cellNumber, 
    // subdivideFurther) {
    const initCell = new Cell(0, width, 0, height, false, true, initWallPosition, null, null, CELL_NUMBER, true)
    let wallNodes = buildNewWall(initCell.verticalWallXCoord, initCell.yMin, initCell.yMax, true)
    for (const coord in wallNodes) {
        buildSequence.push(wallNodes[coord])
    }
    cellStorage.push(initCell)
    let startingCell = 0;
    let endingCell = cellStorage.length

    // ############################################ ############################################ 
    // step 2: recursively divide Cells... (these ones have a horizontal wall)
    console.log("step 2")
    // 2 cells
    for (let i = startingCell; i < endingCell; i++) {
        const subdividedCells = subdivideLeftRightVerticalWall(cellStorage[i])
        cellStorage.push(subdividedCells[0])
        cellStorage.push(subdividedCells[1])
    }
    // update start & end indices to loop over cellStorage, building walls out of those new cells
    startingCell = endingCell
    endingCell = cellStorage.length
    for (let i = startingCell; i < endingCell; i++) {
        // console.log("TEST (TOP AND BOTTOM): ")
        // console.log(cellStorage[i])
        // console.log(cellStorage[i].horizontalWallYCoord, cellStorage[i].xMin, cellStorage[i].xMax, false)
        wallNodes = buildNewWall(cellStorage[i].horizontalWallYCoord, cellStorage[i].xMin, cellStorage[i].xMax, false)
        for (const coord in wallNodes) {
            buildSequence.push(wallNodes[coord])
        }
    }

    // ############################################ ############################################ 
    // step 3: subdivide again, repeat process... (these ones have a vertical wall)
    console.log("step three")
    // 4 cells;
    for (let i = startingCell; i < endingCell; i++) {
        if (cellStorage[i].recurse) { // move the check, "does this cell subdivide further?" outside of the function
            const subdividedCells = subdivideTopBottomHorizontalWall(cellStorage[i])
            cellStorage.push(subdividedCells[0])
            // fixme: mazes.js:146 Uncaught TypeError: Cannot read property '0' of undefined
            // at recursiveDivisionMaze(mazes.js: 146)
            cellStorage.push(subdividedCells[1])
        } else {
            // ?
        }
    }
    startingCell = endingCell
    endingCell = cellStorage.length
    for (let i = startingCell; i < endingCell; i++) {
        wallNodes = buildNewWall(cellStorage[i].verticalWallXCoord, cellStorage[i].yMin, cellStorage[i].yMax, true)
        for (const coord in wallNodes) {
            buildSequence.push(wallNodes[coord])
        }
    }
    // step 4: subdivide again, repeat process... (these ones have a horizontal wall)
    console.log("step 4: ", cellStorage.length)
    // 8 cells;
    for (let i = startingCell; i < endingCell; i++) {
        if (cellStorage[i].recurse) { // move the check, "does this cell subdivide further?" outside of the function
            const subdividedCells = subdivideLeftRightVerticalWall(cellStorage[i])
            cellStorage.push(subdividedCells[0])
            // fixme: mazes.js:146 Uncaught TypeError: Cannot read property '0' of undefined
            // at recursiveDivisionMaze(mazes.js: 146)
            cellStorage.push(subdividedCells[1])
        } else {
            // ?
        }
        // const subdividedCells = subdivideLeftRightVerticalWall(cellStorage[i])
    }
    startingCell = endingCell
    endingCell = cellStorage.length
    for (let i = startingCell; i < endingCell; i++) {
        wallNodes = buildNewWall(cellStorage[i].horizontalWallYCoord, cellStorage[i].xMin, cellStorage[i].xMax, false)
        for (const coord in wallNodes) {
            buildSequence.push(wallNodes[coord])
        }
    }

    // ***#
    // FIXME: subdivided walls are getting the same value for their wall position. 
    // it should be a randomly chosen value on each side. i.e. pairs like a,b, c,d, or even a,a occasionally (where a != b != c != d)

    // FIXME: some walls are only going partway thru the maze... 
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
    // if (isVertical) {
    //     console.log("Building vertical wall...")
    // } else {
    //     console.log("insert horizontal wall")
    // }
    // console.log("POSITION: " + position)
    // console.log("start: " + start)
    // console.log("gap position: " + gapPosition)
    // console.log("end: " + endValWasOneTooLongForThis)

    for (let i = start; i < end; i++) {
        // this if block creates the wall's 1 unit gap
        if (i === gapPosition) {

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

// FIXME: saw a wall appear adjacent to the bottom wall, no gap between the two like ## instead of #.#

function subdivideLeftRightVerticalWall(parentCell) {
    // check the right kind of cell was passed into the function. 
    // since the cells are Left / Right, we expect the parentCell.splitsVertically to be true.
    if (!parentCell.splitsVertically) {
        console.log("LEFT/RIGHT split attempted...")
        console.log(parentCell)
        throw "Wrong kind of cell passed into function. Or else you used the wrong function."  // fail early
    }

    // end cell subdivision if .recurse=false
    if (parentCell.recurse === false) {
        console.log(parentCell)
        throw "Recurse was false and you didn't catch it early enough."
    }

    // ### step 1: decide where the wall will go inside of the new cell.
    // generate a different wall position for each of the two new cells.
    let firstHorizontalWallPositionY;
    let secondHorizontalWallPositionY
    let counterOne = 0; // use counters to prevent infinite loop
    let counterTwo = 0;
    // random a y value that doesn't touch any of the previous walls
    firstHorizontalWallPositionY = parseInt(parseInt(Math.random() * parentCell.yMax).toFixed(0))
    // TODO: Refactor this nasty, repetitive 20 line garbage to this:
    // https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
    unacceptablePosition =
        firstHorizontalWallPositionY < parentCell.yMin + parentCell.offset ||
        firstHorizontalWallPositionY > parentCell.yMax - parentCell.offset - 1 ||
        firstHorizontalWallPositionY % 2 === 1
    while (unacceptablePosition) { // reroll if the start position is unacceptable
        console.log("watch me loop... One")
        firstHorizontalWallPositionY = parseInt(parseInt(Math.random() * parentCell.yMax).toFixed(0))
        unacceptablePosition =
            firstHorizontalWallPositionY < parentCell.yMin + parentCell.offset ||
            firstHorizontalWallPositionY > parentCell.yMax - parentCell.offset - 1 ||
            firstHorizontalWallPositionY % 2 === 1
        counterOne++;
        if (counterOne == 10) {
            // firstHorizontalWallPositionY = parentCell.yMax - 2;
            console.log(parentCell.yMin, parentCell.yMax)
            firstHorizontalWallPositionY = parentCell.yMax / 2;
            break
        }

    }
    secondHorizontalWallPositionY = parseInt(parseInt(Math.random() * parentCell.yMax).toFixed(0))
    unacceptablePosition =
        secondHorizontalWallPositionY < parentCell.yMin + parentCell.offset ||
        secondHorizontalWallPositionY > parentCell.yMax - parentCell.offset - 1 ||
        secondHorizontalWallPositionY % 2 === 1
    while (unacceptablePosition) { // reroll if the start position is unacceptable
        console.log("watch me loop... 2")
        secondHorizontalWallPositionY = parseInt(parseInt(Math.random() * parentCell.yMax).toFixed(0))
        unacceptablePosition =
            secondHorizontalWallPositionY < parentCell.yMin + parentCell.offset ||
            secondHorizontalWallPositionY > parentCell.yMax - parentCell.offset - 1 ||
            secondHorizontalWallPositionY % 2 === 1
        counterTwo++;
        if (counterTwo == 10) {
            // secondHorizontalWallPositionY = parentCell.yMax - 2;
            console.log(parentCell.yMin, parentCell.yMax)
            secondHorizontalWallPositionY = parentCell.yMax / 2;
            break
        }
    }
    console.log("No infinite loop...")
    console.log(firstHorizontalWallPositionY, secondHorizontalWallPositionY)
    // ### step two: calculate the min/max x&y values of the new Cells based on the position & orientation of the previous Wall

    const leftCellMinMax = [parentCell.xMin, parentCell.xMin + parentCell.verticalWallXCoord, parentCell.yMin, parentCell.yMax]
    const rightCellMinMax = [parentCell.xMin + parentCell.verticalWallXCoord, parentCell.xMax, parentCell.yMin, parentCell.yMax]

    // ### step three: With the dimensions of the new Cells decided, calculate whether each one will subdivide further, or stop.
    // use these constants to inform the new cells' "subdivideFurther" arguments.
    let verticalGapGreaterThanThree = leftCellMinMax[3] - leftCellMinMax[2] > 3
    let horizontalGapGreaterThanThree = leftCellMinMax[1] - leftCellMinMax[0] > 3
    const leftCellDivides = verticalGapGreaterThanThree && horizontalGapGreaterThanThree;
    verticalGapGreaterThanThree = rightCellMinMax[3] - rightCellMinMax[2] > 3
    horizontalGapGreaterThanThree = rightCellMinMax[1] - rightCellMinMax[0] > 3
    const rightCellDivides = verticalGapGreaterThanThree && horizontalGapGreaterThanThree;

    // ### step four: create the new Cells and return them.
    // constructor(xMin, xMax, yMin, yMax, isHorizontal, isVertical, 
    // newWallXCoord, newWallYCoord, parentCell, cellNumber, subdivideFurther)
    CELL_NUMBER++;
    const leftCell =
        new Cell(leftCellMinMax[0], leftCellMinMax[1], leftCellMinMax[2], leftCellMinMax[3], true, false,
            null, firstHorizontalWallPositionY, parentCell, CELL_NUMBER, leftCellDivides)
    CELL_NUMBER++;
    const rightCell =
        new Cell(rightCellMinMax[0], rightCellMinMax[1], rightCellMinMax[2], rightCellMinMax[3], true, false,
            null, secondHorizontalWallPositionY, parentCell, CELL_NUMBER, rightCellDivides)
    // console.log("LEFT AND RIGHT:")
    // console.log(leftCell, rightCell)
    // console.log(leftCellMinMax[0], leftCellMinMax[1], leftCellMinMax[2], leftCellMinMax[3])
    // console.log(rightCellMinMax[0], rightCellMinMax[1], rightCellMinMax[2], rightCellMinMax[3])
    // console.log("wall height: ", firstHorizontalWallPositionY, secondHorizontalWallPositionY)
    return [leftCell, rightCell]
}

function subdivideTopBottomHorizontalWall(parentCell) {
    // check the right kind of cell was passed into the function. 
    // since the cells are Top / Bottom, we expect the parentCell.splitsHorizontally to be true.
    if (!parentCell.splitsHorizontally) {
        console.log("TOP/BOT split attempted...")
        console.log(parentCell)
        throw "Wrong kind of cell passed into function. Or else you used the wrong function."  // fail early
    }

    // end cell subdivision if .recurse=false
    if (parentCell.recurse === false) {
        console.log(parentCell)
        throw "Recurse was false and you didn't catch it early enough."
    }

    // ### step 1: decide where the wall will go inside of the new cell.
    // generate a different wall position for each of the two new cells.
    let firstVerticalWallPositionX;
    let secondVerticalWallPositionX;
    let counterOne = 0; // use counters to prevent infinite loop
    let counterTwo = 0;
    // random a x value that doesn't touch any of the previous walls
    firstVerticalWallPositionX = parseInt(parseInt(Math.random() * parentCell.xMax).toFixed(0))
    unacceptablePosition =
        firstVerticalWallPositionX < parentCell.xMin + parentCell.offset ||
        firstVerticalWallPositionX > parentCell.xMax - parentCell.offset - 1 ||
        firstVerticalWallPositionX % 2 === 1
    console.log(unacceptablePosition)
    while (unacceptablePosition) {
        console.log("watch me loop... three")
        firstVerticalWallPositionX = parseInt(parseInt(Math.random() * parentCell.xMax).toFixed(0))
        unacceptablePosition =
            firstVerticalWallPositionX < parentCell.xMin + parentCell.offset ||
            firstVerticalWallPositionX > parentCell.xMax - parentCell.offset - 1 ||
            firstVerticalWallPositionX % 2 === 1
        counterOne++;
        if (counterOne == 10) {
            // firstVerticalWallPositionX = parentCell.xMax - 2;
            console.log(parentCell.xMin, parentCell.xMax)
            firstVerticalWallPositionX = parentCell.xMax - 2;
            break
        }
    }
    secondVerticalWallPositionX = parseInt(parseInt(Math.random() * parentCell.xMax).toFixed(0))
    // TODO: Refactor this nasty, repetitive 20 line garbage to this:
    // https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
    unacceptablePosition =
        // i think this should be: position < parentCell.xMin + 1 so 2 > (0 + 1)
        secondVerticalWallPositionX < parentCell.xMin + parentCell.offset ||
        secondVerticalWallPositionX > parentCell.xMax - parentCell.offset - 1 ||
        secondVerticalWallPositionX % 2 === 1
    while (unacceptablePosition) {
        console.log("watch me loop... FOUR")
        secondVerticalWallPositionX = parseInt(parseInt(Math.random() * parentCell.xMax).toFixed(0))
        unacceptablePosition =
            secondVerticalWallPositionX < parentCell.xMin + 1 ||
            secondVerticalWallPositionX > parentCell.xMax - parentCell.offset - 1 ||
            secondVerticalWallPositionX % 2 === 1
        counterTwo++;
        if (counterTwo == 10) {
            // secondVerticalWallPositionX = parentCell.xMax - 2;
            console.log(parentCell.xMin, parentCell.xMax)
            secondVerticalWallPositionX = parentCell.xMax - 2;
            break
        }
    }
    console.log("No infinite loop...")
    console.log(firstVerticalWallPositionX, secondVerticalWallPositionX)
    // ### step two: calculate the min/max x&y values of the new Cells based on the position & orientation of the previous Wall

    //  the previous Wall cuts horizontally, so render Top/Bottom... note, the min/max X vals stay the same here
    // top Cell has a lower max Y value ("the top border stays the same while the bottom border shrinks")
    const topCellMinMax = [parentCell.xMin, parentCell.xMax, parentCell.yMin, parentCell.yMin + parentCell.horizontalWallYCoord]
    // bottom Cell has a higher min Y value ("the bottom border stays the same while toe top border shrinks")
    const bottomCellMinMax = [parentCell.xMin, parentCell.xMax, parentCell.yMin + parentCell.horizontalWallYCoord, parentCell.yMax]

    // ### step three: With the dimensions of the new Cells decided, calculate whether each one will subdivide further, or stop.
    // use these constants to inform the new cells' "subdivideFurther" arguments.
    let verticalGapGreaterThanThree = topCellMinMax[3] - topCellMinMax[2] > 3
    let horizontalGapGreaterThanThree = topCellMinMax[1] - topCellMinMax[0] > 3
    const topCellDivides = verticalGapGreaterThanThree && horizontalGapGreaterThanThree;
    verticalGapGreaterThanThree = bottomCellMinMax[3] - bottomCellMinMax[2] > 3
    horizontalGapGreaterThanThree = bottomCellMinMax[1] - bottomCellMinMax[0] > 3
    const bottomCellDivides = verticalGapGreaterThanThree && horizontalGapGreaterThanThree;

    // ### step four: create the new Cells and return them.
    // constructor(xMin, xMax, yMin, yMax, isHorizontal, isVertical, 
    // newWallXCoord, newWallYCoord, parentCell, cellNumber, subdivideFurther)
    CELL_NUMBER++;
    const topCell =
        new Cell(topCellMinMax[0], topCellMinMax[1], topCellMinMax[2], topCellMinMax[3], false, true,
            firstVerticalWallPositionX, null, parentCell, CELL_NUMBER, topCellDivides)
    CELL_NUMBER++;
    const bottomCell =
        new Cell(bottomCellMinMax[0], bottomCellMinMax[1], bottomCellMinMax[2], bottomCellMinMax[3], false, true,
            secondVerticalWallPositionX, null, parentCell, CELL_NUMBER, bottomCellDivides)

    // console.log("top and bottom: ")
    // console.log(topCell, bottomCell)
    // console.log(topCellMinMax[0], topCellMinMax[1], topCellMinMax[2], topCellMinMax[3])
    // console.log(bottomCellMinMax[0], bottomCellMinMax[1], bottomCellMinMax[2], bottomCellMinMax[3])
    // console.log("wall x position: ", firstVerticalWallPositionX, secondVerticalWallPositionX)
    return [topCell, bottomCell]
}

// FIXME: script.js:137 Uncaught TypeError: Cannot read property 'children' of undefined
// at getLocationByCoordinates(script.js: 137)
// at updateCoordsWithWall(script.js: 463)

function getRandomEvenCoordinate(min, max) {
    // untested. It should generate random even nums between min and max.
    let random;
    let noDecimals;
    do {
        random = Math.random() * (max - min) + min;
        noDecimals = parseInt(random.toFixed(0))
    } while (noDecimals % 2 == 1);

    return noDecimals
}
