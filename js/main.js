'use strict'

const NORMAL = '😃';
const LOSE = '🤯';
const MINE = '💣';
const FLAG = '🚩';
const LIVE = '❤️';
var lives = 3;
var gFirstClick;
var gBoard;
var gTimerInterval;
var gStartTime;

var gLevel = {
    SIZE: 4,
    MINES: 3
};

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};


function initGame() {
    document.getElementById('reset-button').style.display = 'none'
    gGame.shownCount = 0;
    gGame.markedCount = 0;
    gGame.secsPassed = 0;
    gFirstClick = true
    gGame.isOn = true;
    gBoard = buildBoard(gLevel.SIZE);
    renderBoard();

}

function buildBoard() {

    var board = [];

    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {

            var currCell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            };

            board[i][j] = currCell;
        }
    }
    return board;
}

function renderBoard() {

    var strHTML = '';
    setLives(3)

    for (var i = 0; i < gBoard.length; i++) {
        strHTML += `<tr class="board-row" >\n`
        for (var j = 0; j < gBoard[0].length; j++) {


            var cellCurrTitle = `square: i-${i} j-${j} `

            strHTML += `\t<td 
                            id="spot-${i}-${j}" 
                            onclick="cellClicked(this, ${i}, ${j})"
                            title="${cellCurrTitle}"
                            row="${i}"
                            column="${j}">
                         </td>\n`
        }
        strHTML += `</tr>\n`
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHTML;
}


function cellClicked(elCurrCell, i, j) {

    if (gFirstClick) {
        randomMines(i, j);
        gFirstClick = false;
        startTimer();
    }

    var cellCurrId = `#spot-${i}-${j}`
    var elCurrCell = document.querySelector(cellCurrId);
    var currCell = gBoard[i][j];
    if (currCell.isShown || currCell.isMarked) return;
    currCell.isShown = true;

    var cellText = '';
    elCurrCell.classList.add('cellColor');

    if (currCell.isMine) {
        elCurrCell.style.backgroundColor = '#c0464675';
        elCurrCell.innerText = MINE;
        gGame.shownCount++

        lives--;

        setLives(lives);

    } else {
        cellText = currCell.minesAroundCount;
        elCurrCell.innerText = cellText;

        if (currCell.minesAroundCount === 0) {
            cellText = '';
            shownNeighbors(i, j);
            elCurrCell.innerText = cellText;
        }
    }

    checkGameOver(i, j);
}

function setLives() {
    var newLive = '';
    for (var i = 0; i < lives; i++) {
        newLive += LIVE;
    }
    document.querySelector('#live').innerHTML = newLive;
}



window.addEventListener('contextmenu', function (e) {
    e.preventDefault()

    var element = e.target

    var row = element.getAttribute('row')
    var column = element.getAttribute('column')
    if (!row) return
    if (!gBoard[row][column].isShown) {

        if (!gBoard[row][column].isMarked) {
            element.innerHTML = FLAG

            gBoard[row][column].isMarked = true

            gGame.markedCount++
        } else {
            element.innerHTML = ''
            gBoard[row][column].isMarked = false
            gGame.markedCount--

        }
    }
})

function getLevel(size, mines) {
    lives = 3
    gLevel.SIZE = size;
    gLevel.MINES = mines;
    document.querySelector('.modal').style.visibility = 'hidden';
    clearInterval(gTimerInterval);
    gTimerInterval = null
    document.querySelector('#timer span').innerText = '00.000';
    initGame()
}



function checkGameOver(i, j) {
    var modal = document.querySelector('.modal');
    var elResetButton = document.getElementById('reset-button');


    var cellAmount = gLevel.SIZE ** 2;

    if (lives === 0 && gBoard[i][j].isMine === true) {
        document.querySelector('.modal').style.visibility = 'visible';
        modal.innerText = "💀Try Again💀";
        elResetButton.style.display = 'block';
        elResetButton.innerHTML = LOSE;
        getMinesList()
        clearInterval(gTimerInterval);

    }

    if ((cellAmount === gGame.shownCount + gLevel.MINES) || (gGame.shownCount + gGame.markedCount === cellAmount)) {

        document.querySelector('.modal').style.visibility = 'visible';
        modal.innerText = "🏆Victory!!!🏆";
        elResetButton.style.display = 'block';
        elResetButton.innerHTML = NORMAL;
        clearInterval(gTimerInterval);

    }

    gGame.isOn = false
}

function resetGame() {
    lives = 3
    clearInterval(gTimerInterval);
    gTimerInterval = null;
    document.querySelector('.modal').style.visibility = 'hidden';
    document.querySelector('#timer span').innerText = '00.000';
    initGame()
}




function getMinesList() {

    var cellText = '';

    for (var i = 0; i < gBoard.length; i++) {

        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine) {
                var cellCurrId = `#spot-${i}-${j}`
                var elCurrCell = document.querySelector(cellCurrId);

                cellText = MINE;
                elCurrCell.innerText = cellText;
            }
        }
    }

}





