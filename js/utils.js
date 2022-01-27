'use strict'

function countNeighbors(rowIdx, colIdx) {
    var neighborsCount = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue;
            if (i === rowIdx && j === colIdx) continue;
            if (gBoard[i][j].isMine) neighborsCount++;

        }
    }

    return neighborsCount;
}

function shownNeighbors(rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue;
            if (gBoard[i][j].isMine) continue;
            if (gBoard[i][j].isShown || gBoard[i][j].isMarked) continue;


            var cellCurrId = `#spot-${i}-${j}`
            var elCurrCell = document.querySelector(cellCurrId)
            gBoard[i][j].isShown = true
            gGame.shownCount++
            console.log(' gGame.shownCount++', gGame.shownCount);
            elCurrCell.innerHTML = gBoard[i][j].minesAroundCount;
        }
    }
}

function randomMines() {
    for (var i = 0; i < gLevel.MINES;) {
        var randomPlace = gBoard[getRandomInt(0, gLevel.SIZE - 1)]
        [getRandomInt(0, gLevel.SIZE - 1)]
        if (randomPlace.isMine !== true) {
            randomPlace.isMine = true
            i++
        }
    }
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}




// // location such as: {i: 2, j: 7}
// function renderCell(location, value) {
//     // Select the elCell and set the value
//     var elCell = document.querySelector(`.currCell-${location.i}-${location.j}`);
//     elCell.innerHTML = value;
// }

// function presentTimer() {
//     var currTime = (Date.now() - gStartTime) / 1000;
//     const elTimer = document.querySelector('.timer');
//     elTimer.innerText = `Timer: ${currTime}`;
// }

// function startTimer() {
//     gIsFirstClick = false;
//     console.log('gIsFirstClick', gIsFirstClick);
//     gStartTime = Date.now();
//     gTimerInterval = setInterval(presentTimer, 1);
// }