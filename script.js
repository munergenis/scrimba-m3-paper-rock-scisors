const rockBtn = document.querySelector("#rock")
const paperBtn = document.querySelector("#paper")
const scisorsBtn = document.querySelector("#scisors")
const gameResult = document.querySelector("#game-result")
let active = null
let opponentHand = null
let playerPoints = 0
let opponentPoints = 0
let gameIsOver = false

const hands = {
  0: "✊",
  1: "🤚",
  2: "✌️"
}

const playBtn = document.querySelector("#btn-play")
const handsEl = document.querySelector("#hands")
const playResultEl = document.querySelector("#play-result")
const htmlEl = document.querySelector("html")
const btnsEl = document.querySelectorAll("button")
const btnCont = document.querySelector(".btn-cont")


rockBtn.addEventListener("click", () => {
  toggleActive(rockBtn)
  removeActive(paperBtn)
  removeActive(scisorsBtn)
  setActive()
})
paperBtn.addEventListener("click", () => {
  toggleActive(paperBtn)
  removeActive(rockBtn)
  removeActive(scisorsBtn)
  setActive()
})
scisorsBtn.addEventListener("click", () => {
  toggleActive(scisorsBtn)
  removeActive(paperBtn)
  removeActive(rockBtn)
  setActive()
})

playBtn.addEventListener("click", function() {
  if (active !== null) {
    opponentHand = getOpponentHand()
    if (!gameIsOver) {
      renderHands()
      computeResult()
      renderResult()
      checkGameStatus()
    } else {
      restartGame()
    }
  } 
})

function toggleActive(btn) {
  btn.classList.toggle("active")
}

function removeActive(btn) {
  btn.classList.remove("active")
}

function setActive() {
  if (rockBtn.classList.contains("active")) {
    active = hands[0]
  } else if (paperBtn.classList.contains("active")) {
    active = hands[1]
  } else if (scisorsBtn.classList.contains("active")) {
    active = hands[2]
  } else {
    active = null
  }
}

function getOpponentHand() {
  const randomIndex = Math.floor(Math.random() * 3)
  return hands[randomIndex]
}

function renderHands() {
  handsEl.textContent = `${active} vs ${opponentHand}`
}

function computeResult() {
  switch (active) {
    case hands[0]:
      if (opponentHand === hands[1])
        opponentPoints++
      else if (opponentHand === hands[2])
        playerPoints++
      break;
    
    case hands[1]:
      if (opponentHand === hands[0])
        playerPoints++
      else if (opponentHand === hands[2])
        opponentPoints++
      break;
    
    case hands[2]:
      if (opponentHand === hands[0])
        opponentPoints++
      else if (opponentHand === hands[1])
        playerPoints++
      break;

    default:
      break;
  }
}

function renderResult() {
  playResultEl.textContent = `${playerPoints} vs ${opponentPoints}`
}

function checkGameStatus() {
  if (playerPoints === 5) {
    htmlEl.classList.add("win")
    gameResult.textContent = "You WIN!"
    endGame()
  } else if (opponentPoints === 5) {
    htmlEl.classList.add("lose")
    gameResult.textContent = "You LOSE!"
    endGame()
  }
}

function endGame() {
  gameIsOver = true
  btnCont.classList.toggle("hidden")
  playBtn.textContent = "PLAY AGAIN?"
}

function restartGame() {
  btnCont.classList.toggle("hidden")
  removeActive(rockBtn)
  removeActive(paperBtn)
  removeActive(scisorsBtn)
  htmlEl.classList.remove("win")
  htmlEl.classList.remove("lose")
  playBtn.textContent = "PLAY"
  gameResult.textContent = ""
  handsEl.textContent = ""
  playResultEl.textContent = ""
  active = null
  opponentHand = null
  playerPoints = 0
  opponentPoints = 0
  gameIsOver = false
}
