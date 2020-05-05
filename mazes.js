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

    let unacceptableStartPosition = initWallPosition <= offset || initWallPosition >= width - offset || initWallPosition % 2 === 1
    while (unacceptableStartPosition) {
        initWallPosition = parseInt((Math.random() * width).toFixed(0));
        unacceptableStartPosition = initWallPosition <= offset || initWallPosition >= width - offset || initWallPosition % 2 === 1
    }
    // Cell constructor: 
    // constructor(xMin, xMax, yMin, yMax, isHorizontal, isVertical, newWallXCoord, newWallYCoord, parentCell, cellNumber, 
    // subdivideFurther) {
    const initCell = new Cell(0, width, 0, height, false, true, initWallPosition, null, null, CELL_NUMBER, true)
    console.log("TEST 3000: ")
    console.log(initCell.newWallXCoord, initCell.yMin, initCell.yMax, true)
    let wallNodes = buildNewWall(initCell.newWallXCoord, initCell.yMin, initCell.yMax, true)
    for (const coord in wallNodes) {
        buildSequence.push(wallNodes[coord])
    }
    cellStorage.push(initCell)
    let startingCell = 0;
    let endingCell = cellStorage.length

    // summary: for each division, I need to...
    // 1) iterate over the last batch of cells, dividing each one, adding the newly divided cells to an array 'cellStorage'
    // 2) walk thru the array repeating:
    //          - build wall for each cell 
    //                 * NOTE: Alternate between | and - inputs. newWallYcoord, xmin, xmax, false; .newWallXcoord, ymin, ymax, true
    //          - push the wall for each cell to the BuildSequence
    // 3) figure out how to indicate the starting and ending index of the cellStorage array for the next division

    // step 2: recursively divide Cells... (these ones have a horizontal wall)
    // 2 cells
    for (let i = startingCell; i < endingCell; i++) {
        const subdividedCells = seriesSubdivideCells(cellStorage[i])
        cellStorage.push(subdividedCells[0])
        cellStorage.push(subdividedCells[1])
        console.log("TEST (TOP AND BOTTOM): ")
        console.log(cellStorage[i])
        // FIXME: null 0 40 false <--- null should be an int
        console.log(cellStorage[i].newWallYCoord, cellStorage[i].xMin, cellStorage[i].xMax, false)
    }
    // update start & end indices to loop over cellStorage, building walls out of those new cells
    startingCell = endingCell
    endingCell = cellStorage.length
    for (let i = startingCell; i < endingCell; i++) {
        wallNodes = buildNewWall(cellStorage[i].newWallYCoord, cellStorage[i].xMin, cellStorage[i].xMax, false)
        // FIXME: cellStorage[i].newWallYCoord is null.
        for (const coord in wallNodes) {
            buildSequence.push(wallNodes[coord])
        }
    }
    // step 3: subdivide again, repeat process... (these ones have a vertical wall)
    // 4 cells;
    for (let i = startingCell; i < endingCell; i++) {
        const subdividedCells = seriesSubdivideCells(cellStorage[i])
        cellStorage.push(subdividedCells[0])
        cellStorage.push(subdividedCells[1])
    }
    startingCell = endingCell
    endingCell = cellStorage.length
    for (let i = startingCell; i < endingCell; i++) {
        wallNodes = buildNewWall(cellStorage[i].newWallXCoord, cellStorage[i].yMin, cellStorage[i].yMax, true)
        // FIXME: cellStorage[i].newWallYCoord is null.
        for (const coord in wallNodes) {
            buildSequence.push(wallNodes[coord])
        }
    }



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
    console.log("POSITION: " + position)
    console.log("start: " + start)
    console.log("gap position: " + gapPosition)
    console.log("end: " + endValWasOneTooLongForThis)

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

// FIXME: subdivideCell fails to rotate between x and y. inspection:    
// FIXME: saw a wall appear adjacent to the bottom wall, no gap between the two like ## instead of #.#

function subdivideCell(cell) {
    console.log("Subdivision start... On cell: " + cell.cellNumber)
    console.log(cell)
    // use properties from one cell to inform the properties of the subdivided cells. One Cell becomes two.

    // step zero: if cell's .recurse property is false, do not subdivide further, as the cell is already small enough
    if (cell.recurse === false) {
        return // stop recursion
    }

    let nextWallIsHorizontal;
    let nextWallIsVertical;
    // if init cell:
    if (cell.prevWallIsHorizontal === null && cell.prevWallIsVertical === null) {
        nextWallIsHorizontal = true;
        nextWallIsVertical = false;
    } else {
        // switch horizontal & vertical bools
        nextWallIsHorizontal = cell.prevWallIsVertical;
        nextWallIsVertical = cell.prevWallIsHorizontal;
    }
    console.log("init cell booleans: ")
    console.log(cell.prevWallIsHorizontal, cell.prevWallIsVertical)
    console.log("these values should alternate: ")
    console.log(nextWallIsHorizontal, nextWallIsVertical)
    // step one: figure out where the new Wall will go based on the dimensions of the current Cell.
    let verticalWallPositionX;
    let horizontalWallPositionY;
    let unacceptableStartPosition;
    // console.log("TESTING: ", nextWallIsHorizontal, nextWallIsVertical)
    if (nextWallIsHorizontal) {
        // random a y value that doesn't touch any of the previous walls
        horizontalWallPositionY = parseInt(Math.random() * cell.yMax).toFixed(0)
        unacceptableStartPosition =
            horizontalWallPositionY < cell.yMin + cell.offset ||
            horizontalWallPositionY > cell.yMax - cell.offset ||
            horizontalWallPositionY % 2 === 1
        while (unacceptableStartPosition) { // reroll if the start position is unacceptable
            horizontalWallPositionY = parseInt(Math.random() * cell.yMax).toFixed(0)
            unacceptableStartPosition =
                horizontalWallPositionY < cell.yMin + cell.offset ||
                horizontalWallPositionY > cell.yMax - cell.offset ||
                horizontalWallPositionY % 2 === 1
        }
    } else {
        // random a x value that doesn't touch any of the previous walls
        verticalWallPositionX = parseInt(Math.random() * cell.xMax).toFixed(0)
        unacceptableStartPosition =
            verticalWallPositionX < cell.xMin + cell.offset ||
            verticalWallPositionX > cell.xMax - cell.offset ||
            verticalWallPositionX % 2 === 1
        console.log(unacceptableStartPosition)
        while (unacceptableStartPosition) {
            verticalWallPositionX = parseInt(Math.random() * cell.xMax).toFixed(0)
            unacceptableStartPosition =
                verticalWallPositionX < cell.xMin + cell.offset ||
                verticalWallPositionX > cell.xMax - cell.offset ||
                verticalWallPositionX % 2 === 1
        }
    }

    if (verticalWallPositionX) { // because newWallXCoord was coming out as string in the two new cells...
        verticalWallPositionX = parseInt(verticalWallPositionX)
    } else {
        horizontalWallPositionY = parseInt(horizontalWallPositionY)
    }
    console.log("POS Y: " + horizontalWallPositionY)
    console.log("POS X: " + verticalWallPositionX)

    // step two: calculate the min/max x&y values of the new Cells based on the position & orientation of the previous Wall
    let leftCellMinMax;
    let rightCellMinMax;
    let topCellMinMax;
    let bottomCellMinMax;
    let left = null;
    let right = null;
    let top = null;
    let bottom = null;
    // note: imagine a 10 x 10 box. it has x vals 0 to 10 and y vals 0 to 10.
    // now draw a vertical line along x = 7. how do you calculate the dimensions of the new left & right box?
    // the dimensions of the left box are: 
    // xMin = originalBox.xMin, 
    // xMax = originalBox.xMax - xPos of the wall. (yMin & max stay same)
    // the dimensions  of the right box are:
    // xMin = originalBox.xMin + xPos of the wall. (not the only way to calculate it...)
    if (cell.prevWallIsVertical) { // if the previous Wall cuts vertically, render Left/Right... note, the min/max Y vals stay the same
        leftCellMinMax = [cell.xMin, cell.xMax - cell.newWallXCoord, cell.yMin, cell.yMax]
        left = true;        // right Cell has a higher min X value
        rightCellMinMax = [cell.xMax - cell.newWallXCoord, cell.xMax, cell.yMin, cell.yMax]
        right = false;
    } else if (cell.prevWallIsHorizontal) { // if the previous Wall cuts horizontally, render Top/Bottom... note, the min/max X vals stay the same here
        // top Cell has a lower max Y value ("the top border stays the same while the bottom border shrinks")
        topCellMinMax = [cell.xMin, cell.xMax, cell.yMin, cell.yMax - cell.newWallYCoord]
        top = true
        // bottom Cell has a higher min Y value ("the bottom border stays the same while toe top border shrinks")
        bottomCellMinMax = [cell.xMin, cell.xMax, cell.yMax - cell.newWallYCoord, cell.yMax]
        bottom = false;
    } else if (cell.prevWallIsVertical === null) { // handle the first cell, which has no previous wall
        leftCellMinMax = [cell.xMin, cell.xMax - cell.newWallXCoord, cell.yMin, cell.yMax]
        left = true;        // right Cell has a higher min X value
        rightCellMinMax = [cell.xMax - cell.newWallXCoord, cell.xMax, cell.yMin, cell.yMax]
        right = false;
    } else {
        throw "Unexpected situation occurred in subdivideCell"
    }

    console.log("+++++++++++++++++++++++++++++++++++")
    console.log(leftCellMinMax, rightCellMinMax, topCellMinMax, bottomCellMinMax) // want [x, y, undef, undef]

    // FIXME: this step definitely has some bugs in it. I just know it.
    // step three: With the dimensions of the new Cells decided, calculate whether each one will subdivide further, or stop.
    let firstDividesFurther; // top or left cell
    let secondDividesFurther; // bottom or right cell
    // xMax - xMin <= 3 || yMax - yMin <= 3
    if (leftCellMinMax) {
        if (leftCellMinMax[1] - leftCellMinMax[0] <= 3 || leftCellMinMax[3] - leftCellMinMax[2] <= 3) {
            firstDividesFurther = false;
        }
    } else if (topCellMinMax) {
        if (topCellMinMax[1] - topCellMinMax[0] <= 3 || topCellMinMax[3] - topCellMinMax[2] <= 3) {
            firstDividesFurther = false;
        }
    } else {
        firstDividesFurther = true;
    }

    if (rightCellMinMax) {
        if (rightCellMinMax[1] - rightCellMinMax[0] <= 3 || rightCellMinMax[3] - rightCellMinMax[2] <= 3) {
            secondDividesFurther = false;
        }
    } else if (bottomCellMinMax) {
        if (bottomCellMinMax[1] - bottomCellMinMax[0] <= 3 || bottomCellMinMax[3] - bottomCellMinMax[2] <= 3) {
            secondDividesFurther = false;
        }
    } else {
        secondDividesFurther = true;
    }

    // step four: create the new Cells.
    // Cell constructor: 
    // constructor(xMin, xMax, yMin, yMax, isHorizontal, isVertical, newWallXCoord, newWallYCoord, parentCell, cellNumber,
    // subdivideFurther)
    // FIXME: top, left, bottom, right bools are probably messed... I didn't think too hard about how I was placing them
    let firstCell;
    let secondCell;
    if (leftCellMinMax && rightCellMinMax) {
        CELL_NUMBER++;
        // left cell
        firstCell = new Cell(leftCellMinMax[0], leftCellMinMax[1], leftCellMinMax[2], leftCellMinMax[3], nextWallIsHorizontal, nextWallIsVertical,
            verticalWallPositionX, horizontalWallPositionY, cell.wallInstructions, cell, top, left, CELL_NUMBER, firstDividesFurther);
        CELL_NUMBER++;
        // right cell
        secondCell = new Cell(rightCellMinMax[0], rightCellMinMax[1], rightCellMinMax[2], rightCellMinMax[3], nextWallIsHorizontal, nextWallIsVertical,
            verticalWallPositionX, horizontalWallPositionY, cell.wallInstructions, cell, bottom, right, CELL_NUMBER, secondDividesFurther);
    }
    if (topCellMinMax && bottomCellMinMax) {
        CELL_NUMBER++;
        // top cell
        firstCell = new Cell(topCellMinMax[0], topCellMinMax[1], topCellMinMax[2], topCellMinMax[3], nextWallIsHorizontal, nextWallIsVertical,
            verticalWallPositionX, horizontalWallPositionY, cell.wallInstructions, cell, top, left, CELL_NUMBER, firstDividesFurther);
        CELL_NUMBER++;
        // bottom cell
        secondCell = new Cell(bottomCellMinMax[0], bottomCellMinMax[1], bottomCellMinMax[2], bottomCellMinMax[3], nextWallIsHorizontal, nextWallIsVertical,
            verticalWallPositionX, horizontalWallPositionY, cell.wallInstructions, cell, bottom, right, CELL_NUMBER, secondDividesFurther);
    }

    console.log("Subdivision Yield:")
    console.log([firstCell, secondCell])

    return [firstCell, secondCell]
}

function seriesSubdivideCells(cell) {
    // in this function we split the logic of division up into series instead of as parallel.
    console.log("CELL:", cell)

    // step 0: check if this is the end of the cell's subdivision
    if (cell.recurse === false) {
        return // stop recursion
    }

    // "are we going to split the cell vertically or horizontally?"
    let verticalSplit;
    let horizontalSplit;
    if (cell.cellNumber === 0) {
        verticalSplit = true;
        horizontalSplit = false;
    } else {
        verticalSplit = cell.prevWallIsVertical;
        horizontalSplit = cell.prevWallIsHorizontal;
    }

    let horizontalWallPositionY;
    let verticalWallPositionX;

    // form new cells separately instead of in parallel
    if (verticalSplit) { // yields a left & right cell
        // ### step one: figure out where the new Wall will go based on the dimensions of the current Cell.

        // random a y value that doesn't touch any of the previous walls
        horizontalWallPositionY = parseInt(parseInt(Math.random() * cell.yMax).toFixed(0))
        unacceptableStartPosition =
            horizontalWallPositionY < cell.yMin + cell.offset ||
            horizontalWallPositionY > cell.yMax - cell.offset ||
            horizontalWallPositionY % 2 === 1
        while (unacceptableStartPosition) { // reroll if the start position is unacceptable
            horizontalWallPositionY = parseInt(parseInt(Math.random() * cell.yMax).toFixed(0))
            unacceptableStartPosition =
                horizontalWallPositionY < cell.yMin + cell.offset ||
                horizontalWallPositionY > cell.yMax - cell.offset ||
                horizontalWallPositionY % 2 === 1
        }


        // ### step two: calculate the min/max x&y values of the new Cells based on the position & orientation of the previous Wall

        // note: imagine a 10 x 10 box. it has x vals 0 to 10 and y vals 0 to 10.
        // now draw a vertical line along x = 7. how do you calculate the dimensions of the new left & right box?
        // the dimensions of the left box are: 
        // xMin = originalBox.xMin, 
        // xMax = originalBox.xMax - xPos of the wall. (yMin & max stay same)
        // the dimensions  of the right box are:
        // xMin = originalBox.xMin + xPos of the wall. (not the only way to calculate it...)

        // the previous Wall cuts vertically, so render Left/Right... note, the min/max Y vals stay the same
        const leftCellMinMax = [cell.xMin, cell.xMax - cell.newWallXCoord, cell.yMin, cell.yMax]
        const left = true;        // right Cell has a higher min X value
        const rightCellMinMax = [cell.xMax - cell.newWallXCoord, cell.xMax, cell.yMin, cell.yMax]
        const right = false;

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
        console.log("WALL POSITIONS in L/R cells ")
        console.log(verticalWallPositionX, horizontalWallPositionY)
        CELL_NUMBER++;
        const leftCell =
            new Cell(leftCellMinMax[0], leftCellMinMax[1], leftCellMinMax[2], leftCellMinMax[3], horizontalSplit, verticalSplit,
                verticalWallPositionX, horizontalWallPositionY, cell, CELL_NUMBER, leftCellDivides)
        CELL_NUMBER++;
        const rightCell =
            new Cell(rightCellMinMax[0], rightCellMinMax[1], rightCellMinMax[2], rightCellMinMax[3], horizontalSplit, verticalSplit,
                verticalWallPositionX, horizontalWallPositionY, cell, CELL_NUMBER, rightCellDivides)
        console.log(leftCell, rightCell)
        return [leftCell, rightCell]
    } else if (horizontalSplit) { // yields a top & bottom cell
        // ### step one: figure out where the new Wall will go based on the dimensions of the current Cell.

        // random a x value that doesn't touch any of the previous walls
        verticalWallPositionX = parseInt(parseInt(Math.random() * cell.xMax).toFixed(0))
        unacceptableStartPosition =
            verticalWallPositionX < cell.xMin + cell.offset ||
            verticalWallPositionX > cell.xMax - cell.offset ||
            verticalWallPositionX % 2 === 1
        console.log(unacceptableStartPosition)
        while (unacceptableStartPosition) {
            verticalWallPositionX = parseInt(parseInt(Math.random() * cell.xMax).toFixed(0))
            unacceptableStartPosition =
                verticalWallPositionX < cell.xMin + cell.offset ||
                verticalWallPositionX > cell.xMax - cell.offset ||
                verticalWallPositionX % 2 === 1
        }


        // ### step two: calculate the min/max x&y values of the new Cells based on the position & orientation of the previous Wall

        //  the previous Wall cuts horizontally, so render Top/Bottom... note, the min/max X vals stay the same here
        // top Cell has a lower max Y value ("the top border stays the same while the bottom border shrinks")
        const topCellMinMax = [cell.xMin, cell.xMax, cell.yMin, cell.yMax - cell.newWallYCoord]
        const top = true
        // bottom Cell has a higher min Y value ("the bottom border stays the same while toe top border shrinks")
        const bottomCellMinMax = [cell.xMin, cell.xMax, cell.yMax - cell.newWallYCoord, cell.yMax]
        const bottom = false;

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
        console.log("WALL POSITIONS in TOP/BOTTOM cells")
        console.log(verticalWallPositionX, horizontalWallPositionY)
        CELL_NUMBER++;
        const topCell =
            new Cell(topCellMinMax[0], topCellMinMax[1], topCellMinMax[2], topCellMinMax[3], horizontalSplit, verticalSplit,
                verticalWallPositionX, horizontalWallPositionY, cell, CELL_NUMBER, topCellDivides)
        CELL_NUMBER++;
        const bottomCell =
            new Cell(bottomCellMinMax[0], bottomCellMinMax[1], bottomCellMinMax[2], bottomCellMinMax[3], horizontalSplit, verticalSplit,
                verticalWallPositionX, horizontalWallPositionY, cell, CELL_NUMBER, bottomCellDivides)

        console.log(topCell, bottomCell)
        return [topCell, bottomCell]
    } else {
        console.log(verticalSplit, horizontalSplit)
        throw "This should never happen"
    }
}

    // TODO: figure out how to recursively call subdivideCell() and buildNewWall() until either:
    // a) a cell has a height or width of 3 (only 1 space for a path)
    // ... wait doesn't that take care of all of it?
    // // TODO: add: "if cell height or width is = 3, in other words, if there is a 1 node trail to follow, stop recursion"
    // console.log(grid)
