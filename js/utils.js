'use strict'
function countNeighbors(gBoard, rowIdx, colIdx) {
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

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffle(items) {
    console.log('items', items);
    var randIdx, keep, i;
    for (i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(1, items.length - 1);

        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}


// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.currCell-${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

function presentTimer() {
    var currTime = (Date.now() - gStartTime) / 1000;
    const elTimer = document.querySelector('.timer');
    elTimer.innerText = `Timer: ${currTime}`;
}

function startTimer() {
    gIsFirstClick = false;
    console.log('gIsFirstClick', gIsFirstClick);
    gStartTime = Date.now();
    gTimerInterval = setInterval(presentTimer, 1);
}
