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



function buildBoard() {
    var SIZE = 6;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            var cell = {
                // minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            };
            board[i][j] = cell;
        }
    }
    // board[1][1].isMine = true;
    // board[0][0].isMine = true;
    // board[2][3].isMine = true;

    return board;
}








function renderCell(i, j, value) {
    // console.log(i, j);
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
        var delta = Date.now() - timestamp;

        elTimer.innerText = delta / 1000;
    }, 41);
}