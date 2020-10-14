function dijkstras(finishedGrid) {
    // step 1: confirm there is both a Start Node and a Target Node & get start coordinates
    let startNodeExists = false;
    let targetNodeExists = false;
    let startCoordinates;
    let origin;
    for (let x = 0; x < finishedGrid[0].length; x++) {
        for (let y = 0; y < finishedGrid.length; y++) {
            if (finishedGrid[y][x] === START_NODE) {
                startNodeExists = true;
                startCoordinates = [x, y];
                origin = [x, y];
            }
            if (finishedGrid[y][x] === TARGET_NODE) {
                targetNodeExists = true;
            }
        }
    }
    if (startNodeExists === false || targetNodeExists === false) {
        console.log("Place both the start node & the target node.");
        // TODO: install new method of updating user
        // const messageBarParagraphTag = document.getElementById("messageBar").children[0]
        // messageBarParagraphTag.innerHTML = "Place both the start node & the target node."
        // return "Place both the start node & the target node";
    }

    // step 2: get list of adjacent nodes that have not yet been visited.
    // Adjacent nodes have the form: [x + 1, y] | [x - 1, y] | [x, y + 1], | [x, y - 1] AND have not yet been visited

    // define params for grid coordinates being valid (used in a conditional check later)
    const maxXValue = finishedGrid[0].length - 1;
    const maxYValue = finishedGrid.length - 1;
    const minXValue = 0;
    const minYValue = 0;

    let startValueX; // initialize these outside of the while loop because they are also used after it
    let startValueY;

    // store arrays of visited node coords here so your program can check values... helps w/ "and have not yet been visited" check
    let nextVisitsList = []; // go to these nodes
    // note: nextVisitsList contains values [x,y,a,b] where [a,b] is the node that was Current when node [x,y] was added to the list.
    let visitedNodesList = []; // don't go to these nodes

    // for tracking previousNodeCoordinates
    let visitsWithPathList = [];

    let potentialPaths = []; // an array of Path objects...

    let content;
    let iteration = 0;

    // [cycle start] start cycling through adjacent nodes
    // removed while(nodeContent !== TARGET_NODE) because there is an if/break block at the end that takes care of exiting loop
    while (true) {
        // sub out iteration < 30 to test
        // see https://docs.google.com/document/d/1kJzkln9Ye40Btx5OwGsN23HQ26TX3rjfpbJIDXeUg7g/edit for loop documentation
        // summary: one loop thru this while loop will scan the nodes in all cardinal directions and act on them...
        // console.log("[[[starting loop...]]]")

        let index;
        // for the first iteration, startValueX and startValueY were already given values up on the previous lines.
        if (iteration > 0) {
            index = iteration - 1;
            startCoordinates = nextVisitsList[index];
            if (typeof startCoordinates == "undefined") {
                console.log("ERROR");
                const messageBarParagraphTag = document.getElementById(
                    "messageBar"
                ).children[0];
                messageBarParagraphTag.innerHTML =
                    "No path available! Remove a Wall Segment and try again!";
                return false;
                // TODO: while noPathAvailable, removeRandomWall, until finally tryPathAgain
                // (this todo is here because Recursive Divison Maze sometimes has no path available)
            }
            // try {
            // 	startCoordinates = nextVisitsList[index]
            // } catch (err) {
            // 	console.log("ERROR: " + err)
            // 	const messageBarParagraphTag = document.getElementById("messageBar").children[0]
            // 	messageBarParagraphTag.innerHTML = "No path available! Remove a Wall Segment and try again!"
            // 	return
            // }
        }

        startValueX = startCoordinates[0];
        startValueY = startCoordinates[1];

        // Step 3 in documentation...
        // ### get the node directly to the right
        let adjacentNode = [startValueX + 1, startValueY];
        // confirm the adjacentNode is on the grid and therefore will exist.
        let isOnTheGrid =
            adjacentNode[0] <= maxXValue &&
            adjacentNode[0] >= minXValue &&
            adjacentNode[1] <= maxYValue &&
            adjacentNode[1] >= minYValue;
        // don't put a node on nextVisitsList twice.
        let notPlanningToVisit = !isArrayInArray(nextVisitsList, adjacentNode);
        if (isOnTheGrid && notPlanningToVisit) {
            // use finishedGrid[y-coord][x-coord] as arg because we're pulling out the # symbol if it is there
            content = updateNextVisitsList(
                adjacentNode,
                nextVisitsList,
                finishedGrid[adjacentNode[1]][adjacentNode[0]],
                visitedNodesList,
                startCoordinates,
                visitsWithPathList
            );
            if (content.length !== 2) {
                throw Error("something messed up");
            }
            nextVisitsList = content[0];
            visitsWithPathList = content[1];
        }

        // ### get the node directly to the left
        adjacentNode = [startValueX - 1, startValueY];
        isOnTheGrid =
            adjacentNode[0] <= maxXValue &&
            adjacentNode[0] >= minXValue &&
            adjacentNode[1] <= maxYValue &&
            adjacentNode[1] >= minYValue;
        notPlanningToVisit = !isArrayInArray(nextVisitsList, adjacentNode);
        if (isOnTheGrid && notPlanningToVisit) {
            content = updateNextVisitsList(
                adjacentNode,
                nextVisitsList,
                finishedGrid[adjacentNode[1]][adjacentNode[0]],
                visitedNodesList,
                startCoordinates,
                visitsWithPathList
            );
            nextVisitsList = content[0];
            visitsWithPathList = content[1];
        }

        // ### get the node directly above
        adjacentNode = [startValueX, startValueY + 1];
        isOnTheGrid =
            adjacentNode[0] <= maxXValue &&
            adjacentNode[0] >= minXValue &&
            adjacentNode[1] <= maxYValue &&
            adjacentNode[1] >= minYValue;
        notPlanningToVisit = !isArrayInArray(nextVisitsList, adjacentNode);
        if (isOnTheGrid && notPlanningToVisit) {
            content = updateNextVisitsList(
                adjacentNode,
                nextVisitsList,
                finishedGrid[adjacentNode[1]][adjacentNode[0]],
                visitedNodesList,
                startCoordinates,
                visitsWithPathList
            );
            nextVisitsList = content[0];
            visitsWithPathList = content[1];
        }

        // ### get the node directly below
        adjacentNode = [startValueX, startValueY - 1];
        isOnTheGrid =
            adjacentNode[0] <= maxXValue &&
            adjacentNode[0] >= minXValue &&
            adjacentNode[1] <= maxYValue &&
            adjacentNode[1] >= minYValue;
        notPlanningToVisit = !isArrayInArray(nextVisitsList, adjacentNode);
        if (isOnTheGrid && notPlanningToVisit) {
            content = updateNextVisitsList(
                adjacentNode,
                nextVisitsList,
                finishedGrid[adjacentNode[1]][adjacentNode[0]],
                visitedNodesList,
                startCoordinates,
                visitsWithPathList
            );
            nextVisitsList = content[0];
            visitsWithPathList = content[1];
        }

        // Step 4 in documentation...
        // add Current Node to the list of Visited Nodes so the program knows to not go back here...
        // but only add Current Node if it ISN'T already on the list...
        const currentNodeIsInVisitedNodesList = isArrayInArray(
            visitedNodesList,
            [startCoordinates[0], startCoordinates[1]]
        );
        if (!currentNodeIsInVisitedNodesList) {
            visitedNodesList.push(startCoordinates);
        }

        // Step 5... Record the distance from the Starting Node to the Current node & record the path used to get there...
        if (iteration == 0) {
            // while iteration==0, STARTING_NODE===CurrentNode, so it's unique: There is no path to get there.
            const firstEntry = [startValueX, startValueY];
            const initPath = new Path(0, [], firstEntry, false);

            potentialPaths.push(initPath);
        } else {
            // block summary: generate a new Path to add to potentialPaths
            const previousNodeCoordinates = [
                visitsWithPathList[index][2],
                visitsWithPathList[index][3],
            ];

            const pathToNode = locatePathToCurrentNode(
                potentialPaths,
                previousNodeCoordinates
            );
            const isTarget =
                finishedGrid[startValueY][startValueX] === TARGET_NODE;
            const currentPath = [...pathToNode.path];
            const newPath = new Path(
                pathToNode.distance + 1,
                currentPath,
                [startValueX, startValueY],
                isTarget
            );
            potentialPaths.push(newPath);
        }

        // Step 6: if the CurrentNode is not the TargetNode, change it from . to o in the Grid, then cycle back to step 2
        if (finishedGrid[startValueY][startValueX] === TARGET_NODE) {
            break;
        } else {
            if (finishedGrid[startValueY][startValueX] !== START_NODE) {
                // replace empty space with "VISITED" marker
                finishedGrid[startValueY][startValueX] = VISITED_NODE;
            }
            iteration = iteration + 1;
        }
    }

    // after while loop, which *scans* for TARGET_NODE, use this following step to select teh shortest path to TARGET_NODE
    // step 7: Select the shortest path from the START_NODE to the TARGET_NODE & animate that path...
    const shortestPathObject = potentialPaths[potentialPaths.length - 1]; // shortestPathObject should be the last 1...
    const scanningOrderForAnimation = nextVisitsList.slice(0, iteration); // return only the scanned nodes from nextVisitsList

    return [shortestPathObject, scanningOrderForAnimation];
}

function locatePathToCurrentNode(paths, previousNodeCoords) {
    // searches list of Paths for the right Path object and returns it.
    // the right path should be the one where the .lastEntry property is === previousNodeCoords as a string.

    // this conditional retrieves the init Path if it is the only one in the paths argument
    if (paths[paths.length - 1].lastEntry === null) {
        return paths[0]; // actually pull out the Path object from the array...
    }
    // TODO: More thoroughly explore why paths.filter() sometimes yields two Path objects. Understand what is meant to happen
    const correctPath = paths.filter(
        (entry) =>
            JSON.stringify(entry.lastEntry) ===
            JSON.stringify(previousNodeCoords)
    );

    return correctPath[correctPath.length - 1]; // pretty sure when there's two potential correctPaths, you take the last one...
}

function updateNextVisitsList(
    adjacentNode,
    nextVisitsArray,
    adjNodeContent,
    visitedNodesArray,
    currentNode,
    vWithPathList
) {
    const alreadyVisited = isArrayInArray(visitedNodesArray, adjacentNode);
    const newNextVisits = [...nextVisitsArray];
    const visitsWithPath = [...vWithPathList];

    // if the adjacent node is already in the list of Visited Nodes, do not add the adjacent node to the Next Visits List.

    if (alreadyVisited) {
        return [newNextVisits, visitsWithPath]; // exit early because the adjacentNode is already visited and doesn't need to be added again
    } else {
        // don't put Wall segments on the nextVisitsList.
        const nodeIsWall = adjNodeContent === WALL_SEGMENT;
        if (nodeIsWall === false) {
            // see "the potentialPaths Data Structure" in Google Docs documentation for more info...
            const nextVisitsInfo = [
                adjacentNode[0],
                adjacentNode[1],
                currentNode[0],
                currentNode[1],
            ];
            visitsWithPath.push(nextVisitsInfo);
            newNextVisits.push([adjacentNode[0], adjacentNode[1]]);
        }
        return [newNextVisits, visitsWithPath];
    }
}

// https://stackoverflow.com/questions/41661287/how-to-check-if-an-array-contains-another-array
function isArrayInArray(arr, item) {
    var item_as_string = JSON.stringify(item);

    var contains = arr.some(function (ele) {
        return JSON.stringify(ele) === item_as_string;
    });
    return contains;
}

function replaceEmptySpaceWithVisitedMarker(emptyXCoord, emptyYCoord) {
    grid[emptyYCoord][emptyXCoord] = VISITED_NODE;
}
