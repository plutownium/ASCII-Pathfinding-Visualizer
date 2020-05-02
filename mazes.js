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
    while (newWallPosition <= offset || newWallPosition >= width - offset) {
        newWallPosition = parseInt((Math.random() * width).toFixed(0));
    }
    console.log(newWallPosition, startVal, endVal, true);
    let wallNodes = buildNewWall(newWallPosition, startVal, endVal, true); // "position, startLocation, endLocation, isVertical"
    console.log("wallNodes 1: " + wallNodes)
    for (let i = 0; i < wallNodes.length; i++) {
        buildSequence.push(wallNodes[i])
    }
    let biggerSegmentIsOnRightSide = newWallPosition >= (width / 2) // TESTED: this seems to pass 100% of the time



    // make a horizontal(?!) wall in the bigger cell
    console.log("* * * * Building wall 2")
    newWallPosition = parseInt((Math.random() * height).toFixed(0));
    while (newWallPosition <= offset || newWallPosition >= height - offset) {
        newWallPosition = parseInt((Math.random() * height).toFixed(0))
    }
    if (biggerSegmentIsOnRightSide) { // decide whether to build in the left or right cell
        // get the y value where the wall starts (if the bigger segment is on the top, this is zero)
        startVal = wallNodes.filter(node => node[1] === newWallPosition)[0][0]
        // get the y value where the wall ends (if the bigger segment is on the bottom, this is the height of the prev. wall)
        console.log("inspect:")
        console.log(newWallPosition)
        console.log(wallNodes)
        // NOTE: when building a vertical wall, [0][0] => [0][1], i think
        endVal = width - 1
    } else { // 
        startVal = 1
        endVal = wallNodes.filter(node => node[1] === newWallPosition)[0][0]
    }
    console.log(newWallPosition, startVal, endVal, false);
    wallNodes = buildNewWall(newWallPosition, startVal, endVal, false);
    console.log("wallNodes 2: ")
    console.log(wallNodes)
    for (let i = 0; i < wallNodes.length; i++) {
        buildSequence.push(wallNodes[i])
        console.log("pushing...")
        console.log(wallNodes[i])
    }

    // // make a horizontal wall in the smaller cell
    // console.log("* * * * Building wall three")
    // // use a new random newWallPosition
    // newWallPosition = parseInt((Math.random() * height).toFixed(0))
    // while (newWallPosition <= offset || newWallPosition >= height - offset) {
    //     newWallPosition = parseInt((Math.random() * height).toFixed(0))
    // }
    // // reverse the values in the if/else blocks from before because we are doing the other side of the wall
    // if (biggerSegmentIsOnRightSide) { // build in the cell opposite to the previous one
    //     startVal = wallNodes.filter(node => node[1] === newWallPosition)[0][1]
    //     endVal = 1
    // } else {
    //     startVal = 1
    //     endVal = wallNodes.filter(node => node[1] === newWallPosition)[0][1]
    // }
    // console.log(newWallPosition, startVal, endVal, false);
    // wallNodes = buildNewWall(newWallPosition, startVal, endVal, false);
    // console.log("wallNodes three: ")
    // console.log(wallNodes)
    // for (let i = 0; i < wallNodes.length; i++) {
    //     console.log("PUSH")
    //     console.log(wallNodes[i])
    //     buildSequence.push(wallNodes[i])
    // }


    // TODO: add: "if cell height or width is = 3, in other words, if there is a 1 node trail to follow, stop recursion"

    return buildSequence
}

function buildNewWall(position, start, end, isVertical) {
    const wallNodesSequence = [];
    for (let i = start; i < end; i++) {
        if (isVertical) {
            grid[i][position] = WALL_SEGMENT
            wallNodesSequence.push([position, i])
        } else {
            grid[position][i] = WALL_SEGMENT
            wallNodesSequence.push([i, position])
        }
    }
    return wallNodesSequence
}