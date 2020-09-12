const X = 'x'
const CIRCLE = 'circle'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn
let xCount = document.getElementById('xCount').innerHTML
let circleCount = document.getElementById('circleCount').innerHTML

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(X)
        cell.classList.remove(CIRCLE)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE : X
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'Empate!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "Circulo" : "X"} Ganhou!`

        if (circleTurn) {
            var addCircle = parseInt(document.getElementById('circleCount').innerHTML);
            addCircle = addCircle + 1;
            document.getElementById('circleCount').innerHTML = addCircle;
        } else {
            var addX = parseInt(document.getElementById('xCount').innerHTML);
            addX = addX + 1;
            document.getElementById('xCount').innerHTML = addX;
        }

    }
    winningMessageElement.classList.add('show')

}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X) || cell.classList.contains(CIRCLE)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X)
    board.classList.remove(CIRCLE)
    if (circleTurn) {
        board.classList.add(CIRCLE)
    } else {
        board.classList.add(X)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}