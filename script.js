// ### startup... render the page
const mainDiv = document.getElementById("main");

const WALL_SEGMENT = "#";

// generate a n by m grid of .'s
const grid = [];
for (let m = 0; m < 10; m++) {
	const row = [];
	for (let n = 0; n < 20; n++) {
		row.push(".");
	}
	grid.push(row);
}

const numOfColumns = grid[0].length;
const numOfRows = grid.length;
// iterate "number of columns" times, adding numOfColumns column divs which we will later populate with row divs
for (let i = 0; i < numOfColumns; i++) {
	const divToAssign = document.createElement("div");
	divToAssign.id = "column-" + i;
	mainDiv.appendChild(divToAssign);
}

// iterate over every Column div, inserting numOfRows number of Row divs
const columnDivs = mainDiv.querySelectorAll("div");
for (let j = 0; j < numOfColumns; j++) {
	const targetDiv = columnDivs[j];
	for (let k = 0; k < numOfRows; k++) {
		const divToAssign = document.createElement("div");
		divToAssign.id = "row-" + k;
		targetDiv.appendChild(divToAssign);
	}
}

function getLocationByCoordinates(x, y) {
	// NOTES: Remember the columns and rows are Zero Indexed! Cols 0 through 9 and Rows 0 through 7 in the draft version
	const getMainDiv = document.getElementById("main");
	const column = getMainDiv.children[x];
	const target = column.children[y];
	return target;
}

console.log(getLocationByCoordinates(10, 0));

// ### populate the grid of divs with ascii
console.log(numOfColumns, numOfRows);

for (let i = 0; i < numOfRows; i++) {
	for (let j = 0; j < numOfColumns; j++) {
		const targetDiv = getLocationByCoordinates(j, i);

		// console.log(i, j);
		// if (grid[i] === undefined) {
		// 	console.log("Num of columns:" + numOfColumns);
		// 	console.log("Num of rows:" + numOfRows);
		// 	console.log("300:" + grid[i]);
		// }
		// console.log(grid[i][j]);
		targetDiv.innerHTML = grid[i][j];
	}
}

// ### Add event listeners so user can click to add a wall segment.
// Pass div position as an arg to the func so it knows where to do the replacement.
// Replace the Grid's text, then rerender the display. DO NOT just change the text in the DOM w/o re-rendering based on the Grid.
const populatedColumns = mainDiv.children;
for (let x = 0; x < numOfColumns; x++) {
	const targetCol = populatedColumns[x];
	for (let y = 0; y < numOfRows; y++) {
		targetCol.children[y].addEventListener("click", () => {
			// would like to use the replaceWithWall() func here, but can't figure out how to do it.
			grid[y][x] = WALL_SEGMENT;
			rerenderGrid();
		});
	}
}

function replaceWithWall(x, y) {
	// NOTE: Grid coordinates are y, x not x, y like you'd expect

	grid[y][x] = WALL_SEGMENT;
	rerenderGrid();
}

function rerenderGrid() {
	for (let i = 0; i < numOfRows; i++) {
		for (let j = 0; j < numOfColumns; j++) {
			const targetDiv = getLocationByCoordinates(j, i);

			targetDiv.innerHTML = grid[i][j];
		}
	}
}
