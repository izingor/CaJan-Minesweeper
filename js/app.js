'use strict';

console.log('app');

var gInterval;
var gBoard;
var gLevel = {
    SIZE: 6,
    MINES: 2
};
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
};




function init() {

    gBoard = buildBoard();
    printMat(gBoard);
    console.table(gBoard);
}





function restart() {
    gGame.isOn = true;
    clearInterval(gInterval);
    init();
    timer();
}


function gameOver() {
    gGame.isOn = false;
    // stop timer
    clearInterval(gInterval);
    // sad smiley
    document.querySelector('.smiley').innerText = 'SAD';
    document.querySelector('.headline').innerText = 'GAME OVER';
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            if (gBoard[i][j].isMine) renderCell(i, j, 'BO');
        }
    }
}


function victory() {

}



function clicked(ev) {
    if (!gGame.isOn) return;
    var idx = +ev.className.charAt(1);
    var jdx = +ev.className.charAt(3);
    var cell = gBoard[idx][jdx];
    if (cell.isShown) return;
    if (cell.isMine) {
        gameOver();
        return;
    }
    var minesCount = setMinesNegsCount(idx, jdx, gBoard);
    if (minesCount === 0) {
        openArea(idx, jdx, gBoard);
        return;
    }
    gBoard[idx, jdx].isShown = true;
    gGame.shownCount++;
    renderCell(idx, jdx, minesCount);
    console.log(gGame.shownCount);
}



function openArea(cellI, cellJ, gBoard) {
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            var minesCount = setMinesNegsCount(i, j, gBoard);
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= gBoard[i].length) continue;
            if (gBoard[i][j].isShown) continue;
            renderCell(i, j, minesCount);
            gBoard[i][j].isShown = true;
            gGame.shownCount++;
            if (minesCount === 0) openArea(i, j, gBoard);
        }
    }
    // console.log(gGame.shownCount);
}

function setMinesNegsCount(cellI, cellJ, mat) {
    var minesCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
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
    gBoard[idx][jdx].isMarked = true;
    renderCell(idx, jdx, '+');

}