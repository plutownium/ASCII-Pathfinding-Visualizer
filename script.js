// <^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^>
// <^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^>
// <^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^>
// ### startup... render the page
const mainDiv = document.getElementById("main");

const START_NODE = "*";
const EMPTY_SPACE = ".";
const WALL_SEGMENT = "#";
const TARGET_NODE = "X";

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

// ### populate the grid of divs with ascii

for (let i = 0; i < numOfRows; i++) {
	for (let j = 0; j < numOfColumns; j++) {
		const targetDiv = getLocationByCoordinates(j, i);

		targetDiv.innerHTML = grid[i][j];
	}
}

// ### Add event listeners so user can click to add a wall segment.
resetEventListeners();

// ### Let user pick a Start point for the algorithm
const moveStartBtn = document.getElementById("moveStartBtn");
moveStartBtn.addEventListener("click", () => {
	nextClickMovesStart();
});

// ### Let user add a Target
const moveTargetBtn = document.getElementById("moveTargetBtn");
moveTargetBtn.addEventListener("click", () => {
	nextClickMovesTarget();
});

// *** FUNCTIONS ***

function getLocationByCoordinates(x, y) {
	// NOTES: Remember the columns and rows are Zero Indexed! Cols 0 through 9 and Rows 0 through 7 in the draft version
	const getMainDiv = document.getElementById("main");
	const column = getMainDiv.children[x];
	const target = column.children[y];
	return target;
}

function replaceWithWall(x, y) {
	// NOTE: Grid coordinates are y, x not x, y like you'd expect
	if (grid[y][x] === EMPTY_SPACE) {
		grid[y][x] = WALL_SEGMENT;
	}
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

function nextClickMovesStart() {
	// function allows the user to move the Start Node around on the grid.
	// First all event listeners are removed so there isn't conflict between "add wall" and "add start node".
	// Then each spot on the grid gets an addStartNode event listener.
	// The "addStartNode" function will take care of replacing all spots on the grid with "add wall" event listeners when finished.

	const columnDivs = mainDiv.children;
	for (let x = 0; x < numOfColumns; x++) {
		// iterate through the columns, getting a list of their children
		const targetColumnRows = columnDivs[x].children;
		for (let y = 0; y < numOfRows; y++) {
			// iterate through the row divs in the columns.
			// To remove all event listeners, clone the node, and replace it with the clone.
			const oldElement = targetColumnRows[y];
			const newElement = oldElement.cloneNode(true);
			oldElement.parentNode.replaceChild(newElement, oldElement);
		}
		for (let y = 0; y < numOfRows; y++) {
			targetColumnRows[y].addEventListener("click", () => {
				addStartNode(x, y);
			});
		}
	}
}

function addStartNode(x, y) {
	// NOTE: Grid coordinates are y, x not x, y like you'd expect
	grid[y][x] = START_NODE;
	rerenderGrid();
	resetEventListeners();
}

function nextClickMovesTarget() {
	// function allows the user to move the Target Node around on the grid.
	// First all event listeners are removed so there isn't conflict between "add wall" and "add target node".
	// Then each spot on the grid gets an addTargetNode event listener.
	// The "addTargetNode" function will take care of replacing all spots on the grid with "add wall" event listeners when finished.

	const columnDivs = mainDiv.children;
	for (let x = 0; x < numOfColumns; x++) {
		// iterate through the columns, getting a list of their children
		const targetColumnRows = columnDivs[x].children;
		for (let y = 0; y < numOfRows; y++) {
			// iterate through the row divs in the columns.
			// To remove all event listeners, clone the node, and replace it with the clone.
			const oldElement = targetColumnRows[y];
			const newElement = oldElement.cloneNode(true);
			oldElement.parentNode.replaceChild(newElement, oldElement);
		}
		for (let y = 0; y < numOfRows; y++) {
			targetColumnRows[y].addEventListener("click", () => {
				addTargetNode(x, y);
			});
		}
	}
}

function addTargetNode(x, y) {
	// NOTE: Grid coordinates are y, x not x, y like you'd expect
	grid[y][x] = TARGET_NODE;
	rerenderGrid();
	resetEventListeners();
}

function resetEventListeners() {
	// general purpose function used to
	// 1) remove all event listeners from grid and
	// 2) add "Replace With Wall" event listeners to each grid pos, which is the default state.

	const columnDivs = mainDiv.children;
	for (let x = 0; x < numOfColumns; x++) {
		// iterate through the columns, getting a list of their children
		const targetColumnRows = columnDivs[x].children;
		for (let y = 0; y < numOfRows; y++) {
			// iterate through the row divs in the columns.
			// To remove all event listeners, clone the node, and replace it with the clone.
			const oldElement = targetColumnRows[y];
			const newElement = oldElement.cloneNode(true);
			oldElement.parentNode.replaceChild(newElement, oldElement);
		}
		for (let y = 0; y < numOfRows; y++) {
			targetColumnRows[y].addEventListener("click", () => {
				replaceWithWall(x, y);
			});
		}
	}
}

// a button for printing the grid's current first 4 values
const testButton = document.getElementById("printGrid");
testButton.addEventListener("click", () => {
	for (i = 0; i < 4; i++) {
		console.log(grid[i]);
	}
});

// <^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^>
// <^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^>
// <^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^><^> <^>
