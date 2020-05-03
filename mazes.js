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

    // ### ### ### ### 
    // now recursion yields FOUR new cells... step 1 is to determine whether they're horizontal or vertical 
    // (based on whether) the prev cycle put vertical or horizontal walls. we alternate.
    // step 2 is to determine their start and end coordinates
    // step 3 is to build the wall.
    // step 4 is to repeat for the next cell.

    // plan: mk func subdivideCell(). it does what it says: takes a cell as an input, returns the two subdivided cells.
    // each Cell has instructions for a Wall and info about the surrounding walls. 
    // after subdivideCell() has been used to create an array of Cells, iterate over the list and extract each Cell's
    // .wallInstructions property, building as you go.

    // Step 1: initialize Room size Cell
    const offset = 2;

    let initWallPosition = parseInt((Math.random() * width).toFixed(0)); // the location of the wall as an x coord
    let startVal = 1 // start at y=1
    let endVal = height - 1 // end at y=height-1

    // *#*#*#*#*#*#***#*#*#*#**#*#*#*#*#*#*#*//
    // HERE BE DRAGONS: Bugs ahead.
    // *#*#*#*#*#*#***#*#*#*#**#*#*#*#*#*#*#*//
    let unacceptableStartPosition = initWallPosition <= offset || initWallPosition >= width - offset || initWallPosition % 2 === 1
    while (unacceptableStartPosition) {
        initWallPosition = parseInt((Math.random() * width).toFixed(0));
        unacceptableStartPosition = initWallPosition <= offset || initWallPosition >= width - offset || initWallPosition % 2 === 1
    }
    // Cell constructor: 
    // constructor(minX, maxX, minY, maxY, isHorizontal, isVertical, newWallXCoord, newWallYCoord, prevWallCoords, previousCellObj)
    const initCell = new Cell(0, width, 0, height, false, true, initWallPosition, null, null, null, CELL_NUMBER)
    let wallNodes = buildNewWall(initCell.newWallXCoord, initCell.yMin, initCell.yMax, true)
    for (const k in wallNodes) {
        buildSequence.push(k)
    }

    console.log(initCell)
    let splitCells = subdivideCell(initCell)
    // console.log(splitCells)
    // for (const cell in splitCells) {
    //     console.log(splitCells[cell].newWallYCoord, splitCells[cell].minX, splitCells[cell].maxX)
    //     wallNodes = buildNewWall(splitCells[cell].newWallYCoord, splitCells[cell].minX, splitCells[cell].maxX, false)
    //     console.log("wall nodes: ")
    //     console.log(wallNodes)
    //     // FIXME: wallNodes is coming out []
    // }

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

function subdivideCell(cell) {
    // use properties from one cell to inform the properties of the subdivided cells. One Cell becomes two.

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

    // step two: calculate the min/max x&y values of the new Cells based on the position & orientation of the new Wall
    let leftCellMinMax;
    let rightCellMinMax;
    let topCellMinMax;
    let bottomCellMinMax;
    let left = null;
    let right = null;
    let top = null;
    let bottom = null;
    if (verticalWallPositionX) { // if the new Wall cuts vertically, render Left/Right... note, the min/max Y vals stay the same
        leftCellMinMax = [cell.xMin, cell.xMax - verticalWallPositionX, cell.yMin, cell.yMax]
        left = true;        // right Cell has a higher min X value
        rightCellMinMax = [cell.xMin + verticalWallPositionX, cell.xMax, cell.yMin, cell.yMax]
        right = false;
    } else if (horizontalWallPositionY) { // if the new Wall cuts horizontally, render Top/Bottom... note, the min/max X vals stay the same here
        // top Cell has a lower max Y value ("the top border stays the same while the bottom border shrinks")
        topCellMinMax = [cell.xMin, cell.xMax, cell.yMin, cell.yMax - horizontalWallPositionY]
        top = true
        // bottom Cell has a higher min Y value ("the bottom border stays the same while toe top border shrinks")
        bottomCellMinMax = [cell.xMin, cell.xMax, cell.yMin + horizontalWallPositionY, cell.yMax]
        bottom = false;
    }

    console.log("+++++++++++++++++++++++++++++++++++")
    console.log(leftCellMinMax, rightCellMinMax, topCellMinMax, bottomCellMinMax) // want [x, y, undef, undef]
    // Cell constructor: 
    // constructor(minX, minY, maxX, maxY, isHorizontal, isVertical, newWallXCoord, newWallYCoord, prevWallCoords, previousCellObj)
    // FIXME: top, left, bottom, right bools are probably messed... I didn't think too hard about how I was placing them
    let firstCell;
    let secondCell;
    if (leftCellMinMax && rightCellMinMax) {
        CELL_NUMBER++;
        firstCell = new Cell(leftCellMinMax[0], leftCellMinMax[1], leftCellMinMax[2], leftCellMinMax[3], nextWallIsHorizontal, nextWallIsVertical,
            verticalWallPositionX, horizontalWallPositionY, cell.wallInstructions, cell, top, left, CELL_NUMBER);
        CELL_NUMBER++;
        secondCell = new Cell(rightCellMinMax[0], rightCellMinMax[1], rightCellMinMax[2], rightCellMinMax[3], nextWallIsHorizontal, nextWallIsVertical,
            verticalWallPositionX, horizontalWallPositionY, cell.wallInstructions, cell, bottom, right, CELL_NUMBER);
    }
    if (topCellMinMax && bottomCellMinMax) {
        CELL_NUMBER++;
        firstCell = new Cell(topCellMinMax[0], topCellMinMax[1], topCellMinMax[2], topCellMinMax[3], nextWallIsHorizontal, nextWallIsVertical,
            verticalWallPositionX, horizontalWallPositionY, cell.wallInstructions, cell, top, left, CELL_NUMBER);
        CELL_NUMBER++;
        secondCell = new Cell(bottomCellMinMax[0], bottomCellMinMax[1], bottomCellMinMax[2], bottomCellMinMax[3], nextWallIsHorizontal, nextWallIsVertical,
            verticalWallPositionX, horizontalWallPositionY, cell.wallInstructions, cell, bottom, right, CELL_NUMBER);
    }

    console.log(firstCell, secondCell)

    return [firstCell, secondCell]
}