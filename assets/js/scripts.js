const classX = "x";
const classC = "circle";
const Combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let Turn = false;
const xCount = document.getElementById("xCount");
const circleCount = document.getElementById("circleCount");

const resetCount = document.getElementById("resetButton");

const cellElements = document.querySelectorAll(".empty");
const board = document.getElementById("board");
const restartButton = document.getElementById("restartButton");

const winningContainer = document.getElementById("winningContainer");
const message = document.getElementById("message");

getValue("all");
startGame();

restartButton.addEventListener("click", startGame);
resetCount.addEventListener("click", reset);

function startGame() {
  cellElements.forEach((cell) => {
    cell.classList.remove(classX);
    cell.classList.remove(classC);
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  winningContainer.classList.remove("show");
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = Turn ? classC : classX;
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function endGame(draw) {
  if (draw) {
    message.innerText = "Empate!";
  } else {
    message.innerText = `${Turn ? "Círculo" : "X"} ganhou!`;

    if (Turn) {
      let circle = Number(circleCount.innerHTML);
      circle += 1;
      localStorage.setItem("JDV-circle", JSON.stringify(circle));
      getValue("circle");
    } else {
      let x = Number(xCount.innerHTML);
      x += 1;
      localStorage.setItem("JDV-x", JSON.stringify(x));
      getValue("x");
    }
  }
  Turn = Turn ? false : true;
  winningContainer.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(classX) || cell.classList.contains(classC);
  });
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  Turn = !Turn;
}

function setBoardHoverClass() {
  board.classList.remove(classX);
  board.classList.remove(classC);
  if (Turn) {
    board.classList.add(classC);
  } else {
    board.classList.add(classX);
  }
}

function checkWin(currentClass) {
  return Combinations.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

function getValue(cell) {
  if (cell == "circle" || cell == "all") {
    circleCount.innerHTML = JSON.parse(localStorage.getItem("JDV-circle")) || 0;
  }

  if (cell == "x" || cell == "all") {
    xCount.innerHTML = JSON.parse(localStorage.getItem("JDV-x")) || 0;
  }
}

function reset() {
  localStorage.setItem("JDV-circle", "0");
  localStorage.setItem("JDV-x", "0");
  getValue("all");
}
