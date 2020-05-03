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

    if (false) { // zombie code
        // // recursively divide rooms by building a wall with a path through it
        // let offset = 2
        // const cells = [];

        // // make a vertical(?!) wall at a random height
        // // NOTE: I originally believed this code would build a *horizontal* wall... a vertical one is just as good but...
        // // ...why did it turn out that way?
        // console.log("...................................")
        // console.log("* * * * Building wall one")
        // let newWallXCoord = parseInt((Math.random() * width).toFixed(0)); // the horizontal location of the wall
        // let startVal = 1 // start at y=1
        // let endVal = height - 1 // end at y=height-1

        // let unacceptableStartPosition = newWallXCoord <= offset || newWallXCoord >= width - offset || newWallXCoord % 2 === 1
        // while (unacceptableStartPosition) {
        //     newWallXCoord = parseInt((Math.random() * width).toFixed(0));
        //     unacceptableStartPosition = newWallXCoord <= offset || newWallXCoord >= width - offset || newWallXCoord % 2 === 1
        // }
        // let wallNodes = buildNewWall(newWallXCoord, startVal, endVal, true); // "position, startLocation, endLocation, isVertical"
        // let prevWallNodes = wallNodes; // exists so later code can update the val of "wallNodes" w/o overwriting useful info
        // for (let i = 0; i < wallNodes.length; i++) {
        //     buildSequence.push(wallNodes[i])
        // }
        // let biggerSegmentIsOnRightSide = newWallXCoord >= (width / 2) // TESTED: this seems to pass 100% of the time
        // cells.push()

        // // ### ### ### ### 
        // // now recursion yields 2 new cells

        // // make a horizontal(?!) wall in the bigger cell
        // console.log("...................................")
        // console.log("* * * * Building wall 2")
        // let newWallYCoord = parseInt((Math.random() * height).toFixed(0)); // the vertical location of the wall

        // unacceptableStartPosition = newWallYCoord <= offset || newWallYCoord >= height - offset || newWallYCoord % 2 === 1
        // while (unacceptableStartPosition) {
        //     newWallYCoord = parseInt((Math.random() * height).toFixed(0))
        //     unacceptableStartPosition = newWallYCoord <= offset || newWallYCoord >= height - offset || newWallYCoord % 2 === 1
        // }

        // // NOTE: EXPLANATION FOR "prevWallNodes.filter(node => node[1] === newWallYCoord)[0][0]" IS AS FOLLOWS...
        // // the code searches thru prevWallNodes, a list of coordinates for the previous wall, for the entry where the Y coordinate 
        // // (the height) is equal to the height of the next wall. It returns the entry where those two match.
        // // Then it extracts the X coordinate's value ("[0][0]", since .filter returns a 1 entry list e.g. "[[2, 3]]")
        // // and sets that X value equal to either the start value or the end value of the new wall, depending on whether
        // // the new wall will be on the left or the right of the previous wall.
        // let gapIsAtHeightOfNewWall = prevWallNodes.filter(node => node[1] === newWallYCoord).length === 0

        // if (biggerSegmentIsOnRightSide) { // decide whether to build in the left or right cell
        //     // get the x value where the wall starts (this is the x value of the prev vertical wall)
        //     // startVal = prevWallNodes.filter(node => node[1] === newWallYCoord)[0][0]
        //     console.log(prevWallNodes, newWallYCoord)
        //     if (gapIsAtHeightOfNewWall) {
        //         startVal = prevWallNodes[0][0] + 2
        //         console.log("status code: 1")
        //     } else {
        //         startVal = prevWallNodes[0][0]
        //     }
        //     // get the x value where the wall ends (this is equal to the width of the grid because we end adjacent to the right wall)
        //     endVal = width - 1
        // } else { // 
        //     // get the x value where the wall starts (this is 1 because we are starting adjacent to the left wall)
        //     startVal = 1
        //     // Uncaught TypeError: Cannot read property '0' of undefined at recursiveDivisionMaze (mazes.js:112)
        //     // get the x value where the wall ends (this is the x value of the prev vertical wall)
        //     // endVal = prevWallNodes.filter(node => node[1] === newWallYCoord)[0][0]
        //     if (gapIsAtHeightOfNewWall) {
        //         endVal = prevWallNodes[0][0] - 1
        //         console.log("status code: 2")
        //     } else {
        //         endVal = prevWallNodes[0][0]
        //     }
        // }
        // wallNodes = buildNewWall(newWallYCoord, startVal, endVal, false);
        // for (let i = 0; i < wallNodes.length; i++) {
        //     buildSequence.push(wallNodes[i])
        // }

        // // make a horizontal wall in the smaller cell
        // console.log("* * * * Building wall three")
        // // use a new random newWallYCoord
        // // newWallYCoord is the y coord here, the vertical location of the wall
        // newWallYCoord = parseInt((Math.random() * height).toFixed(0))

        // unacceptableStartPosition = newWallYCoord <= offset || newWallYCoord >= height - offset || newWallYCoord % 2 === 1
        // while (unacceptableStartPosition) {
        //     newWallYCoord = parseInt((Math.random() * height).toFixed(0))
        //     unacceptableStartPosition = newWallYCoord <= offset || newWallYCoord >= height - offset || newWallYCoord % 2 === 1
        // }
        // console.log("...................................")

        // gapIsAtHeightOfNewWall = prevWallNodes.filter(node => node[1] === newWallYCoord).length === 0
        // // reverse the values in the if/else blocks from before because we are doing the other side of the wall (use !)
        // if (!biggerSegmentIsOnRightSide) { // build in the cell opposite to the previous one
        //     console.log(prevWallNodes, newWallYCoord)
        //     if (gapIsAtHeightOfNewWall) {
        //         console.log("status code: 3")
        //         startVal = prevWallNodes[0][0] + 2
        //     } else {
        //         startVal = prevWallNodes[0][0]
        //     }
        //     endVal = width - 1
        // } else {
        //     console.log(prevWallNodes, newWallYCoord)
        //     startVal = 1
        //     if (gapIsAtHeightOfNewWall) {
        //         console.log("status code: 4")
        //         endVal = prevWallNodes[0][0] - 1 // success for 1 test, i think
        //     } else {
        //         endVal = prevWallNodes[0][0]
        //     }
        // }
        // wallNodes = buildNewWall(newWallYCoord, startVal, endVal, false);

        // for (let i = 0; i < wallNodes.length; i++) {
        //     buildSequence.push(wallNodes[i])
        // }
    }

    // plan: mk func subdivideCell(). it does what it says: takes a cell as an input, returns the two subdivided cells.
    // each Cell has instructions for a Wall and info about the surrounding walls. 
    // after subdivideCell() has been used to create an array of Cells, iterate over the list and extract each Cell's
    // .wallInstructions property, building as you go.

    // recursion of cell division, total cells: 1, 2, 4, 8, 16, 32, 64...

    // Step 1: initialize Room size Cell
    const offset = 2;

    let initWallPosition = parseInt((Math.random() * width).toFixed(0)); // the location of the wall as an x coord

    let unacceptableStartPosition = initWallPosition <= offset || initWallPosition >= width - offset || initWallPosition % 2 === 1
    while (unacceptableStartPosition) {
        initWallPosition = parseInt((Math.random() * width).toFixed(0));
        unacceptableStartPosition = initWallPosition <= offset || initWallPosition >= width - offset || initWallPosition % 2 === 1
    }
    // Cell constructor: 
    // constructor(minX, maxX, minY, maxY, isHorizontal, isVertical, newWallXCoord, newWallYCoord, prevWallCoords, previousCellObj)
    const initCell = new Cell(0, width, 0, height, false, true, initWallPosition, null, null, null, CELL_NUMBER, true)
    let wallNodes = buildNewWall(initCell.newWallXCoord, initCell.yMin, initCell.yMax, true)
    for (const coord in wallNodes) {
        buildSequence.push(wallNodes[coord])
    }

    // step 2: recursively divide Cells...
    let splitCells = seriesSubdivideCells(initCell)
    for (const cell in splitCells) {
        wallNodes = buildNewWall(splitCells[cell].newWallYCoord, splitCells[cell].xMin, splitCells[cell].xMax, false)
        for (const coord in wallNodes) {
            buildSequence.push(wallNodes[coord])
        }
    }

    // step 3: subdivide again, repeat process...
    for (const cell in splitCells) {
        console.log("SUBDIVIDING! magic is happening!")
        let dividedCells = seriesSubdivideCells(splitCells[cell])
        for (const cell in dividedCells) { // flip values in buildNewWall since we are alternating between vertical and horizontal
            // e.g. .newWallYCoord => .newWallXCoord, xMin&xMax => yMin&yMax, false => true
            wallNodes = buildNewWall(dividedCells[cell].newWallXCoord, dividedCells[cell].yMin, dividedCells[cell].yMax, true)
            for (const node in wallNodes) {
                buildSequence.push(wallNodes[node])
            }
        }
    }


    // TODO: figure out how to recursively call subdivideCell() and buildNewWall() until either:
    // a) a cell has a height or width of 3 (only 1 space for a path)
    // ... wait doesn't that take care of all of it?

    // // TODO: add: "if cell height or width is = 3, in other words, if there is a 1 node trail to follow, stop recursion"
    // console.log(grid)

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
            // console.log("start: " + start)
            // console.log("gap position: " + gapPosition)
            // console.log("end: " + endValWasOneTooLongForThis)
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
    // constructor(minX, maxX, minY, maxY, isHorizontal, isVertical, newWallXCoord, newWallYCoord, prevWallCoords, previousCellObj)
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

    // step 0: check if this is the end of the cell's subdivision
    if (cell.recurse === false) {
        return // stop recursion
    }

    const verticalSplit = cell.prevWallIsVertical;
    const horizontalSplit = cell.prevWallIsHorizontal;

    let horizontalWallPositionY;
    let verticalWallPositionX;

    // form new cells separately instead of in parallel
    if (verticalSplit) { // yields a left & right cell
        // ### step one: figure out where the new Wall will go based on the dimensions of the current Cell.

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
        // NOTE: TESTING DISABLING SOME CELL ARGUMENTS. // indicates they are disabled in the classes.js file. supply 'em w/ null.
        // constructor(xMin, xMax, yMin, yMax, //isHorizontal, //isVertical, newWallXCoord, newWallYCoord, //prevWallCoords, parentCell,
        // isTop, isLeft, cellNumber, subdivideFurther) 
        CELL_NUMBER++;
        const leftCell =
            new Cell(leftCellMinMax[0], leftCellMinMax[1], leftCellMinMax[2], leftCellMinMax[3], null, null, verticalWallPositionX,
                horizontalWallPositionY, null, cell, left, null, CELL_NUMBER, leftCellDivides)
            )
        CELL_NUMBER++;
        const rightCell =
            new Cell(rightCellMinMax[0], rightCellMinMax[1], rightCellMinMax[2], rightCellMinMax[3], null, null, verticalWallPositionX,
                horizontalWallPositionY, null, cell, right, null, CELL_NUMBER, rightCellDivides)

        return [leftCell, rightCell]
    } else if (horizontalSplit) { // yields a top & bottom cell
        // ### step one: figure out where the new Wall will go based on the dimensions of the current Cell.

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
        // NOTE: TESTING DISABLING SOME CELL ARGUMENTS. // indicates they are disabled in the classes.js file. supply 'em w/ null.
        // constructor(xMin, xMax, yMin, yMax, //isHorizontal, //isVertical, newWallXCoord, newWallYCoord, //prevWallCoords, parentCell,
        // isTop, isLeft, cellNumber, subdivideFurther)
        CELL_NUMBER++;
        const topCell =
            new Cell(topCellMinMax[0], topCellMinMax[1], topCellMinMax[2], topCellMinMax[3], null, null, verticalWallPositionX,
                horizontalWallPositionY, null, cell, top, null, CELL_NUMBER, topCellDivides)
            )
        CELL_NUMBER++;
        const bottomCell =
            new Cell(bottomCellMinMax[0], bottomCellMinMax[1], bottomCellMinMax[2], bottomCellMinMax[3], null, null, verticalWallPositionX,
                horizontalWallPositionY, null, cell, bottom, null, CELL_NUMBER, bottomCellDivides)

        return [topCell, bottomCell]
    } else {
        throw "This should never happen"
    }
}
