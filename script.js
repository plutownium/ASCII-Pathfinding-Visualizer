// ### startup... render the page
const mainDiv = document.getElementById("main");

const grid = [
	[".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
	[".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
	[".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
	[".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
	[".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
	[".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
	[".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
	[".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
];

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

console.log(getLocationByCoordinates(9, 0));

// ### populate the grid of divs with ascii
for (let i = 0; i < numOfColumns; i++) {
	for (let j = 0; j < numOfRows; j++) {
		const targetDiv = getLocationByCoordinates(i, j);

		console.log(targetDiv);
		targetDiv.innerHTML = grid[i][j];
	}
}

function getLocationByCoordinates(x, y) {
	// NOTES: Remember the columns and rows are Zero Indexed! Cols 0 through 9 and Rows 0 through 7 in the draft version
	const getMainDiv = document.getElementById("main");
	const column = getMainDiv.children[x];
	const target = column.children[y];
	return target;
}
