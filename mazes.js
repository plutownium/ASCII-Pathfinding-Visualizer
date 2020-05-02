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

    // make a horizontal wall at a random height
    let newWallPosition = (Math.random() * height).toFixed(0);
    let startVal = 1 // start at x=1
    let endVal = height - 1 // end at x=height-1
    while (newWallPosition <= offset || newWallPosition >= height - offset) {
        newWallPosition = (Math.random() * height).toFixed(0);
    }
    let wallNodes = buildNewWall(newWallPosition, startVal, endVal, true); // "position, startLocation, endLocation, isHorizontal"
    for (let i = 0; i < wallNodes.length; i++) {
        buildSequence.push(wallNodes[i])
    }
    let biggerSegmentIsOnTop = newWallPosition >= height / 2

    // make a vertical wall in the bigger cell
    newWallPosition = (Math.random() * width).toFixed(0);
    while (newWallPosition <= offset || newWallPosition >= height - offset) {
        newWallPosition = (Math.random() * width).toFixed(0);
    }
    if (biggerSegmentIsOnTop) { // decide whether to build in the top cell or bottom cell
        // get the y value where the wall starts (if the bigger segment is on the top, this is zero)
        startVal = 0
        // get the y value where the wall ends (if the bigger segment is on the bottom, this is the height of the prev. wall)
        endVal = wallNodes.filter(node => node[1] === newWallPosition)[0]
    } else { // 
        startVal = wallNodes.filter(node => node[1] === newWallPosition)[0]
        endVal = 0
    }
    wallNodes = buildNewWall(newWallPosition, startVal, endVal, false);
    for (let i = 0; i < wallNodes.length; i++) {
        buildSequence.push(wallNodes[i])
    }

    // make a vertical wall in the smaller cell
    // reverse the values in the if/else blocks from before because we are doing the other side of the wall
    if (biggerSegmentIsOnTop) {
        startVal = wallNodes.filter(node => node[1] === newWallPosition)[0]
        endVal = 0
    } else {
        startVal = 0
        endVal = wallNodes.filter(node => node[1] === newWallPosition)[0]
    }
    wallNodes = buildNewWall(newWallPosition, startVal, endVal, false);
    for (let i = 0; i < wallNodes.length; i++) {
        buildSequence.push(wallNodes[i])
    }


    return buildSequence
}

function buildNewWall(position, start, end, isHorizontal) {
    const wallNodesSequence = [];
    for (let i = start; i < end; i++) {
        if (isHorizontal) {
            grid[position][i] = WALL_SEGMENT
            wallNodesSequence.push([i, position])
        } else {
            grid[i][position] = WALL_SEGMENT
            wallNodesSequence.push([position, i])
        }
    }
    return wallNodesSequence
}