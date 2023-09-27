const x_class = 'x';
const o_class = 'o';
const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('#cell-board');
const turnText = document.querySelector("#turn")
const resultMsgEl = document.querySelector("#result-message")
const resultMsgTextEl = document.querySelector('[result-message]')
const restartBtn = document.querySelector("#restart-button")
let oTurn, xTurn;

startGame()

restartBtn.addEventListener('click', startGame)

function startGame() {

    oTurn = false
    cellElements.forEach(cell => {
        //////////////////for restart-btn///////////////////////////
        cell.classList.remove(x_class);
        cell.classList.remove(o_class);
        cell.removeEventListener("click", handleClick);
        //////////////////////////////////////////////////////////
        cell.addEventListener('click', handleClick, { once: true })
    })
    setCellBoardHoverClass()
    resultMsgEl.classList.remove("show")
    
}

function handleClick(a) {
    const cell = a.target
    const currentClass = oTurn ? o_class : x_class;
    placeMark(cell, currentClass)
    //checkForWin
    if (checkWin(currentClass)) {
        endGame(false)
    }
    //checkForDraw
    else if (isDraw()) {
        endGame(true)
    }
    //switchTurns
    else {
        swapTurns()
        setCellBoardHoverClass()
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    oTurn = !oTurn
    turnText.innerText = `${oTurn ? "O" : "X"}'s turn`;
}

function setCellBoardHoverClass() {
    board.classList.remove(x_class);
    board.classList.remove(o_class);
    if (oTurn) {
        board.classList.add(o_class)
    } else {
        board.classList.add(x_class)
    }
}

function checkWin(currentClass) {
    return winningCombination.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function endGame(draw) {
    if (draw) {
        resultMsgTextEl.innerText = "Draw!"
    } else {
        resultMsgTextEl.innerText = `${oTurn ? "O's win" : "X's win"}!`

    }
    resultMsgEl.classList.add('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(x_class) || cell.classList.contains(o_class)
    })
}