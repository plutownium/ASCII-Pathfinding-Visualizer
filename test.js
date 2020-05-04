// const maxXValue = 10;
// const maxYValue = 10;
// const minXValue = 0;
// const minYValue = 0;

// const failureTestValues = [[-1, 0], [0, -1], [11, 0], [0, 11]]
// const successfulTestValues = [[0, 0], [1, 1], [5, 10], [10, 5]]

// for (let i = 0; i < failureTestValues.length; i++) {
//     const nextXCoord = successfulTestValues[i][0];
//     const nextYCoord = successfulTestValues[i][1];

//     console.log(nextXCoord, nextYCoord)
//     let coordsAreOnTheGrid = nextYCoord >= minYValue && nextXCoord >= minXValue && nextYCoord <= maxYValue && nextXCoord <= maxXValue;
//     if (coordsAreOnTheGrid) {
//         console.log(true)
//     } else {
//         console.log(nextYCoord >= minYValue)
//         console.log(nextXCoord >= minXValue)
//         console.log(nextYCoord >= maxYValue)
//         console.log(nextXCoord >= maxXValue)
//     }
// }

// test 2:

// function isArrayInArray(arr, item) {
//     var item_as_string = JSON.stringify(item);

//     var contains = arr.some(function (ele) {
//         return JSON.stringify(ele) === item_as_string;
//     });
//     return contains;
// }

// const twoDee = [[2, 3, 1], [4, 5, 6], [7, 8, 9], [11, 10, 12]]
// const sample = [4, 5, 6]
// const sample2 = [11, 10, 12]

// console.log(isArrayInArray(twoDee, sample2))

// test 3:

let verticalSplit;
let horizontalSplit;
if (true) {
    verticalSplit = true;
    horizontalSplit = false;
} else {
    verticalSplit = false
    horizontalSplit = true
}
console.log("W.T.FFFFFFFFFFFF")
console.log(verticalSplit, horizontalSplit)