function generateRandomMaze() {

}

function recursiveDivisionMaze() {

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

    console.log(grid)
    return buildSequence
}
