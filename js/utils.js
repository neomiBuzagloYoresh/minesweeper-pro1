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

function setMinesNegsCount() {

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            gBoard[i][j].minesAroundCount = countNeighbors(i, j);
        }
    }
}

function shownNeighbors(rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue;
            if (gBoard[i][j].isMine) continue;
            if (gBoard[i][j].isShown || gBoard[i][j].isMarked) continue;

            var cellCurrId = `#spot-${i}-${j}`
            var elCurrCell = document.querySelector(cellCurrId);

            gBoard[i][j].isShown = true;
            gGame.shownCount++
            elCurrCell.classList.add('cellColor');
            if (gBoard[i][j].minesAroundCount === 0) elCurrCell.innerText = '';

            else elCurrCell.innerText = gBoard[i][j].minesAroundCount;


        }
    }
}


function randomMines(rowIndex, colIndex) {
    for (var i = 0; i < gLevel.MINES; i++) {
        var randomPlace = gBoard[getRandomInt(0, gLevel.SIZE - 1)][getRandomInt(0, gLevel.SIZE - 1)]
        if (randomPlace === gBoard[rowIndex][colIndex]) continue;
        if (randomPlace.isMine !== true) {
            randomPlace.isMine = true

            setMinesNegsCount()
        }
    }
}


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}



function presentTimer() {
    var currTime = (Date.now() - gStartTime) / 1000;
    const elTimer = document.querySelector('#timer span');
    elTimer.innerText = `${currTime.toFixed(2)}`;
}

function startTimer() {
    gFirstClick = false;

    gStartTime = Date.now();
    gTimerInterval = setInterval(presentTimer, 1);
}
