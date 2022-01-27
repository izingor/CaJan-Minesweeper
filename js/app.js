'use strict';

console.log('app');

var gInterval;
var gBoard;
var gLevel;
var gGame;



gLevel = {
    SIZE: 5,
    MINES: 3,
    LIVES: 3
};

gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};

function init() {

    gBoard = buildBoard(gLevel.SIZE, gLevel.MINES);
    printMat(gBoard);
    // console.table(gBoard);
}

function restart() {
    clearInterval(gInterval);
    document.querySelector('.smiley').classList.remove('scaling');
    document.querySelector('.msg').classList.add('hide');
    gGame.isOn = true;
    gGame.markedCount = 0;
    init();
    timer();
    gLevel.LIVES = 3;
    for (var i = 1; i <= gLevel.LIVES; i++) {
        document.querySelector(`.life-${i}`).innerText = '💚';
    }
    document.querySelector('.marked').innerText = gGame.markedCount;
    document.querySelector('.smiley').innerText = '🤠';
    // document.querySelector('.msg').innerText = '';
}

function clicked(ev) {
    if (!gGame.isOn) return;

    var idx = +ev.className.charAt(1);
    var jdx = +ev.className.charAt(3);
    var cell = gBoard[idx][jdx];

    if (cell.isShown === true) return;
    if (cell.isMarked) return
    if (cell.isMine) {
        document.querySelector(`.life-${gLevel.LIVES}`).innerText = '';
        gLevel.LIVES--;
        renderCell(idx, jdx, '💣');
        cell.isMarked = true;

        document.querySelector('.board').classList.add('shake-effect');
        document.querySelector('.smiley').classList.add('shake-effect');

        setTimeout(() => {
            document.querySelector('.smiley').classList.remove('shake-effect');
            document.querySelector('.board').classList.remove('shake-effect');
        }, 750);

        checkVictory();
        if (gLevel.LIVES === 0) gameOver();
        return;
    }

    var minesCount = setMinesNegsCount(idx, jdx, gBoard);
    if (minesCount === 0) {
        renderCell(idx, jdx, minesCount);
        gBoard[idx][jdx].isShown = true;
        openArea(idx, jdx, gBoard);
        return;
    }
    gBoard[idx][jdx].isShown = true;
    renderCell(idx, jdx, minesCount);
    checkVictory();
}

function openArea(idx, jdx, gBoard) {
    for (var i = idx - 1; i <= idx + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = jdx - 1; j <= jdx + 1; j++) {
            var minesCount = setMinesNegsCount(i, j, gBoard);
            if (i === idx && j === jdx) continue;
            if (j < 0 || j >= gBoard[i].length) continue;
            if (gBoard[i][j].isShown) continue;

            renderCell(i, j, minesCount);
            gBoard[i][j].isShown = true;
            gGame.shownCount++;
            checkVictory();
            if (minesCount === 0) {
                gBoard[i][j].isShown = true;
                openArea(i, j, gBoard);
            }
        }
    }

}

function setMinesNegsCount(idx, jdx, mat) {
    var minesCount = 0;
    for (var i = idx - 1; i <= idx + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = jdx - 1; j <= jdx + 1; j++) {
            if (i === idx && j === jdx) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j].isShown) continue;
            if (mat[i][j].isMine) {
                minesCount++;
            }
        }
    }
    return minesCount;
}


function mark(ev) {
    var idx = +ev.className.charAt(1);
    var jdx = +ev.className.charAt(3);
    var cell = gBoard[idx][jdx];
    if (!gGame.isOn) return;
    if (gBoard[idx][jdx].isShown) return;
    if (cell.isMarked) {
        cell.isMarked = false;
        renderCell(idx, jdx, '');
        gGame.markedCount--;
        document.querySelector('.marked').innerText = gGame.markedCount;
        return;
    };
    cell.isMarked = true;
    renderCell(idx, jdx, '📍');
    gGame.markedCount++;
    // console.log(gGame.markedCount);
    document.querySelector('.marked').innerText = gGame.markedCount;
    checkVictory();
}

function difficulty(ev) {

    gGame.isOn = false;
    switch (ev.id) {
        case 'one':
            gLevel.SIZE = 5;
            gLevel.MINES = 3;
            break;
        case 'two':
            gLevel.SIZE = 7;
            gLevel.MINES = 8;
            break;
        case 'three':
            gLevel.SIZE = 9;
            gLevel.MINES = 15;
            break;
    }
    console.log(gLevel.SIZE);
    clearInterval(gInterval);
    init();
}


function checkVictory() {
    var flaggedCount = 0;
    var shownCount = 0;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isShown === true) shownCount++;
            if (gBoard[i][j].isMarked && gBoard[i][j].isMine) flaggedCount++;
        }
    }
    if (flaggedCount === gLevel.MINES &&
        shownCount === (gLevel.SIZE ** 2) - gLevel.MINES)
        victory();


    console.log('flagged:', flaggedCount, 'shownCount:', shownCount);
    // console.table(gBoard);
}

function victory() {
    clearInterval(gInterval);
    gGame.isOn = false;
    document.querySelector('.smiley').innerText = '😎';
    document.querySelector('.smiley').classList.add('scaling');
}

function gameOver() {
    gGame.isOn = false;
    clearInterval(gInterval);
    document.querySelector('.smiley').innerText = '☹️';
    document.querySelector('.msg').classList.remove('hide');
    document.querySelector('.smiley').classList.add('scaling');
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine) renderCell(i, j, '💣');
        }
    }
}