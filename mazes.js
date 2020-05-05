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
    console.log("Returning...")
    return buildSequence
}

function buildNewWall(position, start, end, isVertical) {
    const wallNodesSequence = [];
    // choose a random position for the gap in the wall
    const gapPosition = getGap(start, end)

    // if (isVertical) {
    //     console.log("Building vertical wall...")
    // } else {
    //     console.log("insert horizontal wall")
    // }
    // console.log("POSITION: " + position)
    // console.log("start: " + start)
    // console.log("gap position: " + gapPosition)
    // console.log("end: " + end)

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
    const minVal = parentCell.yMin + parentCell.offset
    const maxVal = parentCell.yMax - parentCell.offset - 1
    // random a y value that doesn't touch any of the previous walls
    const firstHorizontalWallPositionY = getRandomEvenCoordinate(minVal, maxVal);
    const secondHorizontalWallPositionY = getRandomEvenCoordinate(minVal, maxVal);

    // ### step two: calculate the min/max x&y values of the new Cells based on the position & orientation of the previous Wall

    const leftCellMinMax = [parentCell.xMin, parentCell.verticalWallXCoord, parentCell.yMin, parentCell.yMax]
    const rightCellMinMax = [parentCell.verticalWallXCoord, parentCell.xMax, parentCell.yMin, parentCell.yMax]

    // this block helps the code "fail early"
    if (leftCellMinMax[0] === leftCellMinMax[1] || leftCellMinMax[2] === leftCellMinMax[3]) {
        console.log(parentCell.xMin, parentCell.xMax, parentCell.verticalWallXCoord)
        throw "Left Cell: Min was equal to max"
    } else if (rightCellMinMax[0] === rightCellMinMax[1] || rightCellMinMax[2] === rightCellMinMax[3]) {
        console.log(parentCell.xMin, parentCell.xMax, parentCell.verticalWallXCoord)
        throw "Right Cell: Min was equal to max"
    } else {
        console.log("Min & Max OK")
    }

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
    const minVal = parentCell.xMin + parentCell.offset;
    const maxVal = parentCell.xMax - parentCell.offset - 1;
    // random a x value that doesn't touch any of the previous walls
    const firstVerticalWallPositionX = getRandomEvenCoordinate(minVal, maxVal);
    const secondVerticalWallPositionX = getRandomEvenCoordinate(minVal, maxVal);

    // ### step two: calculate the min/max x&y values of the new Cells based on the position & orientation of the previous Wall

    //  the previous Wall cuts horizontally, so render Top/Bottom... note, the min/max X vals stay the same here
    // top Cell has a lower max Y value ("the top border stays the same while the bottom border shrinks")
    const topCellMinMax = [parentCell.xMin, parentCell.xMax, parentCell.yMin, parentCell.horizontalWallYCoord]
    // bottom Cell has a higher min Y value ("the bottom border stays the same while toe top border shrinks")
    const bottomCellMinMax = [parentCell.xMin, parentCell.xMax, parentCell.horizontalWallYCoord, parentCell.yMax]

    // this block helps the code "fail early"
    if (topCellMinMax[0] === topCellMinMax[1] || topCellMinMax[2] === topCellMinMax[3]) {
        console.log(parentCell.yMin, parentCell.yMax, parentCell.horizontalWallYCoord)
        throw "Top Cell: Min was equal to max"
    } else if (bottomCellMinMax[0] === bottomCellMinMax[1] || bottomCellMinMax[2] === bottomCellMinMax[3]) {
        console.log(parentCell.yMin, parentCell.yMax, parentCell.horizontalWallYCoord)
        throw "Bottom Cell: Min was equal to max"
    } else {
        console.log("Min & Max OK")
    }

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
        // console.log("Looping: ", min, max)
        random = Math.random() * (max - min) + min;
        noDecimals = parseInt(random.toFixed(0))
    } while (noDecimals % 2 == 1);

    return noDecimals
}

function getGap(min, max) {
    // untested. It should generate random even nums between min and max.
    const oneLessThanEndValue = max - 1 // because the gap can't be the value of the end wall
    const oneMoreThanStartValue = min + 1 // because the gap can't be the value of the start wall
    // TODO: refactor so the values being input into min,max are always OK without the +/- 1
    const gapPosition = Math.floor(Math.random() * (oneLessThanEndValue - oneMoreThanStartValue)) + oneMoreThanStartValue;

    return gapPosition
}
