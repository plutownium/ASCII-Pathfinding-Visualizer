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
    console.log("* * * * Building wall one")
    let newWallPosition = parseInt((Math.random() * width).toFixed(0));
    let startVal = 1 // start at y=1
    let endVal = height - 1 // end at y=height-1
    let unacceptableStartPosition = newWallPosition <= offset || newWallPosition >= width - offset || newWallPosition % 2 === 1
    while (unacceptableStartPosition) {
        console.log("watch me loop")
        newWallPosition = parseInt((Math.random() * width).toFixed(0));
        unacceptableStartPosition = newWallPosition <= offset || newWallPosition >= width - offset || newWallPosition % 2 === 1
    }
    console.log(newWallPosition, startVal, endVal, true);
    let wallNodes = buildNewWall(newWallPosition, startVal, endVal, true); // "position, startLocation, endLocation, isVertical"
    let prevWallNodes = wallNodes; // exists so later code can update the val of "wallNodes" w/o overwriting useful info
    console.log("wallNodes 1: " + wallNodes)
    for (let i = 0; i < wallNodes.length; i++) {
        buildSequence.push(wallNodes[i])
    }
    let biggerSegmentIsOnRightSide = newWallPosition >= (width / 2) // TESTED: this seems to pass 100% of the time



    // make a horizontal(?!) wall in the bigger cell
    console.log("* * * * Building wall 2")
    newWallPosition = parseInt((Math.random() * height).toFixed(0));
    unacceptableStartPosition = newWallPosition <= offset || newWallPosition >= height - offset || newWallPosition % 2 === 1
    while (unacceptableStartPosition) {
        console.log("watch me loop")
        newWallPosition = parseInt((Math.random() * height).toFixed(0))
        unacceptableStartPosition = newWallPosition <= offset || newWallPosition >= height - offset || newWallPosition % 2 === 1
    }
    if (biggerSegmentIsOnRightSide) { // decide whether to build in the left or right cell
        // get the y value where the wall starts (if the bigger segment is on the top, this is zero)
        // startVal = prevWallNodes.filter(node => node[1] === newWallPosition)[0][0]
        startVal = prevWallNodes.filter(node => node[1] === newWallPosition)[0][0]
        // get the y value where the wall ends (if the bigger segment is on the bottom, this is the height of the prev. wall)
        endVal = width - 1
    } else { // 
        startVal = 1
        // Uncaught TypeError: Cannot read property '0' of undefined at recursiveDivisionMaze (mazes.js:112)
        console.log("value check:")
        console.log(prevWallNodes)
        console.log(newWallPosition)
        // endVal = prevWallNodes.filter(node => node[1] === newWallPosition)[0][0]
        endVal = prevWallNodes.filter(node => node[1] === newWallPosition)[0][0]
    }
    console.log(newWallPosition, startVal, endVal, false);
    wallNodes = buildNewWall(newWallPosition, startVal, endVal, false);
    console.log("wallNodes 2: ")
    console.log(wallNodes)
    for (let i = 0; i < wallNodes.length; i++) {
        buildSequence.push(wallNodes[i])
    }

    // make a horizontal wall in the smaller cell
    console.log("* * * * Building wall three")
    // use a new random newWallPosition
    newWallPosition = parseInt((Math.random() * height).toFixed(0))
    unacceptableStartPosition = newWallPosition <= offset || newWallPosition >= height - offset || newWallPosition % 2 === 1
    while (unacceptableStartPosition) {
        newWallPosition = parseInt((Math.random() * height).toFixed(0))
        unacceptableStartPosition = newWallPosition <= offset || newWallPosition >= height - offset || newWallPosition % 2 === 1
    }
    console.log(prevWallNodes)
    console.log("...................................")
    // reverse the values in the if/else blocks from before because we are doing the other side of the wall (use !)
    if (!biggerSegmentIsOnRightSide) { // build in the cell opposite to the previous one
        console.log(prevWallNodes, newWallPosition)
        startVal = prevWallNodes.filter(node => node[1] === newWallPosition)[0][0]
        endVal = width - 1
        console.log("Left: " + startVal)
    } else {
        console.log(prevWallNodes, newWallPosition)
        startVal = 1
        endVal = prevWallNodes.filter(node => node[1] === newWallPosition)[0][0]
        console.log("Right: " + endVal)
    }
    console.log(newWallPosition, startVal, endVal, false);
    wallNodes = buildNewWall(newWallPosition, startVal, endVal, false);
    console.log("wallNodes three: ")
    console.log(wallNodes)
    for (let i = 0; i < wallNodes.length; i++) {
        buildSequence.push(wallNodes[i])
    }

    // todo: mk walls land on even numbered index values CHECK
    // fixme: buildNewWall() occasionally removes the same value used by newWallPosition in the .filter()ing check.
    // solution: insert a step that iterates over prevWallNodes, generating a list of potential values for startVal/endVal. select @ random

    // TODO: add: "if cell height or width is = 3, in other words, if there is a 1 node trail to follow, stop recursion"

    return buildSequence
}

function buildNewWall(position, start, end, isVertical) {
    const wallNodesSequence = [];
    // choose a random position for the gap in the wall
    const rangeOfPotentialPositions = end - start;
    const gapPosition = start + parseInt((Math.random() * rangeOfPotentialPositions).toFixed(0))

    for (let i = start; i < end; i++) {
        // this if block creates the wall's 1 unit gap
        if (i === gapPosition) {
            console.log("start: " + start)
            console.log("end: " + end)
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
