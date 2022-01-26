'use strict'


const NOARMAL = '😃';
const LOSE = '🤯';
const MINE = '💣'

var gNeighborsCount;
var gElSelectedPlace = null;
var gBoard;

var gLevel = {
    SIZE: 4,
    mine: 2
};


var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};

function initGame() {

    gBoard = buildBoard();
    renderBoard();

}

function buildBoard() {

    var board = [];

    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {

            var currCell = {
                minesAroundCount: 4,
                isShown: false,
                isMine: false,
                isMarked: true
            };
            //maybe another if
            board[i][j] = currCell;
        }
    }
    gNeighborsCount++

    // board[1][2].isMine = true;
    // board[3][2].isMine = true;


    return board;
}

function renderBoard() {
    countNeMines();
    var strHTML = '';

    for (var i = 0; i < gBoard.length; i++) {
        strHTML += `<tr class="board-row" >\n`
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j];
            // For cell of type square add square class
            var className = '';
            if (currCell.isShown) {
                className = 'currentCellSquare'
                // For cell that is booked add booked class
                if (currCell.isMine) {
                    currCell = MINE;
                } else {
                    currCell = currCell.gNeighborsCount;
                }
            }
            var cellCurrTitle = `square: i-${i} j-${j} `

            strHTML += `\t<td id="${className}" 
                            onclick="cellClicked(this, ${i}, ${j})"
                            title="${cellCurrTitle}" > 
                            
                         </td>\n`
        }
        strHTML += `</tr>\n`
    }

    console.table(gBoard)
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}



function cellClicked(elCurrCell, i, j) {
    var currCell = gBoard[i][j];

    currCell.isShown = true;

    if (currCell.isMine) {
        currCell = MINE;
    } else {
        currCell = currCell.gNeighborsCount;
    }
    // if (currCell.isShown === false) {
    //     currCell.isShown = countNeighbors(gBoard, i, j);
    //     console.log('currCell', currCell.isShown);

    // }

    elCurrCell.innerHTML = currCell;
}
// – randomize mines' location:
// 1. Randomly locate the 2 mines on the board
// 2. Present the mines using renderBoard() function.

// function randomMines() {
//     var currCell = gBoard[i][j];
//     var shuffleMine = shuffle(gLevel.mine)


// }
function getEmptyCells() {
    var res = []
    for (var i = 0; i < gLevel.SIZE.length; i++) {
        for (var j = 0; j < gLevel.SIZE.length; j++) {
            var currCell = gBoard[i][j]
            console.log('currCell', currCell);
            if (currCell === gElSelectedPlace) {
                res.push({ i, j })
                console.log('res', res);
            }
        }
    }

    return res
}

// function addMine() {
//     var emptyCells = getEmptyCells();
//     var idx = getRandomInt(1, emptyCells.length);
//     var currCell = emptyCells[idx];
//     gBoard[currCell.i][currCell.j] = MINE;
//     renderCell(currCell, MINE);

// }

// function placeElement(element, content) {
//     var emptyCells = getEmptyCells() // array of empty cells
//     var randomIdx = getRandomInt(0, emptyCells.length) // random index
//     var currPos = emptyCells[randomIdx] // position of one empty cell
//     gBoard[currPos.i][currPos.j].gameElement = element // update the model 
//     renderCell(currPos, content) // update the DOM
//     if (element === BALL) {
//         gBallsOnBoard++;
//     }


// }

// function getEmptyCells() {
//     var emptyCells = []
//     for (var i = 0; i < gBoard.length; i++) {
//         for (var j = 0; j < gBoard.length; j++) {
//             var currCell = gBoard[i][j]
//             if (currCell.gLevel.SIZE === gElSelectedPlace && !currCell.gameElement) {
//                 emptyCells.push({ i, j })
//             }
//         }
//     }
//     return emptyCells
// }

function countNeMines() {

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {

            gBoard[i][j].gNeighborsCount = countNeighbors(gBoard, i, j);
            console.log(' gBoard', gBoard);
        }
    }
}


function cellMarked(elCell) {

}

function checkGameOver(params) {

}

function expandShown(board, elCell, i, j) {

}