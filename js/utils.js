'use strict';



function printMat(mat) {
    var elBoard = document.querySelector('.board');
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {

            strHTML += `<td class ="c${i}-${j}" onclick="clicked(this)" oncontextmenu="mark(this)" ></td>`;
        }
        strHTML += '</tr>';
    }
    strHTML += '</tbody></table>';
    elBoard.innerHTML = strHTML;
}

function buildBoard(size, mines) {
    var board = [];
    for (var i = 0; i < size; i++) {
        board.push([]);
        for (var j = 0; j < size; j++) {
            var cell = {

                isShown: false,
                isMine: false,
                isMarked: false
            };
            board[i][j] = cell;
        }
    }
    createMines(board, mines);

    return board;
}

function createMines(board) {
    var cells = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        for (var j = 0; j < gLevel.SIZE; j++) {
            cells.push({ i: i, j: j });
        }
    }
    cells = shuffleArray(cells);

    for (var i = 0; i < gLevel.MINES; i++) {
        board[cells[i].i][cells[i].j].isMine = true;
    }
    // var randomI = getRandomInt(1, gLevel.SIZE - 1);
    // var randomJ = getRandomInt(1, gLevel.SIZE - 1);
    // board[randomJ][randomI].isMine = true;
}

function renderCell(i, j, value) {
    var elCell = document.querySelector(`.c${i}-${j}`);
    elCell.innerText = value;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function timer() {
    var timestamp = Date.now();
    var elTimer = document.querySelector('.timer');
    gInterval = setInterval(function() {
        var delta = (Date.now() - timestamp) / 1000;

        // switch (delta) {
        //     case delta < 10:
        //         delta = delta.toString()
        //         delta = delta.substring(0, 3);
        //         elTimer.innerText = delta
        //         break;
        //     case delta > 10:
        //         delta = delta.toString()
        //         delta = delta.substring(0, 2);
        //         break;
        //     }
        elTimer.innerText = delta
    }, 41);
}


function shuffleArray(cells) {
    for (var i = cells.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = cells[i];
        cells[i] = cells[j];
        cells[j] = temp;
    }
    return cells;
}