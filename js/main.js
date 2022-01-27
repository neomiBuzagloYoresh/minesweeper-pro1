'use strict'


const NORMAL = '😃';
const LOSE = '🤯';
const MINE = '💣';
const FLAG = '🚩';
const LIVE = '❤️';
var lives = 3;
var gFirstClick = true;
var gBoard;

var gLevel = {
    SIZE: 4,
    MINES: 2
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
    randomMines()
    setMinesNegsCount()
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
        gFirstClick = false
        // interval
    }
    var currCell = gBoard[i][j];
    if (currCell.isShown || currCell.isMarked) return
    currCell.isShown = true;

    var cellText = '';

    if (currCell.isMine) {
        cellText = MINE;
        lives--
        setLives(lives)
    } else {
        cellText = currCell.minesAroundCount;
        gGame.shownCount++
    }

    if (currCell.minesAroundCount === 0) {
        shownNeighbors(i, j);

    }

    console.log('gGame', gGame);
    elCurrCell.innerHTML = cellText;
    checkGameOver(i, j)
}

function setLives() {
    var newLive = ''
    for (let index = 0; index < lives; index++) {
        newLive += LIVE
    }
    document.querySelector('#live').innerHTML = newLive
}


function setMinesNegsCount() {

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            gBoard[i][j].minesAroundCount = countNeighbors(i, j);

        }
    }
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

    initGame()
}


function checkGameOver(i, j) {

    var resetButton = document.getElementById('reset-button');

    var cellAmount = gLevel.SIZE ** 2;

    if (lives === 0 && gBoard[i][j].isMine === true) {
        alert('game over');
        resetButton.style.display = 'block'
        resetButton.innerHTML = LOSE

    }
    console.log(gGame.shownCount + gGame.markedCount);
    if ((cellAmount === gGame.shownCount + gLevel.MINES) || (gGame.shownCount + gGame.markedCount === cellAmount)) {
        alert('win')
        resetButton.style.display = 'block'
        resetButton.innerHTML = NORMAL
    }


    gGame.isOn = false
}

function resetGame() {
    lives = 3
    initGame()
}