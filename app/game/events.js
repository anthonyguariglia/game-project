
const gameAPI = require('./api.js')
// const gameUI = require('./ui.js')

let n
let gameArray =
    [[$('#0-0').text(), $('#0-1').text(), $('#0-2').text()],
      [$('#1-0').text(), $('#1-1').text(), $('#1-2').text()],
      [$('#2-0').text(), $('#2-1').text(), $('#2-2').text()]]

const player = [
  {
    symbol: 'x'
  },
  {
    symbol: 'o'
  }
]

let gameWinner
let apiArray = []

const on00Click = function () {
  // get latest game board
  gameArray = gameAPI.getGameBoard()
  // update game board with new data
  gameArray[0][0] = player[n % 2].symbol
  // prep array for api
  apiArray = to1DArray(gameArray)
  // update game board in api
  gameAPI.updateGameBoard(apiArray)
  // check for winner
  gameWinner = evaluate(gameArray)
  if (gameWinner[0]) {
    endGame()
  }
  // increment turn
  nextTurn()
}

const on01Click = function () {
  gameArray = gameAPI.getGameBoard()
  gameArray[0][1] = player[n % 2].symbol
  apiArray = to1DArray(gameArray)
  gameAPI.updateGameBoard(apiArray)
  gameWinner = evaluate(gameArray)
  if (gameWinner[0]) {
    endGame()
  }
  nextTurn()
}

const on02Click = function () {
  gameArray = gameAPI.getGameBoard()
  gameArray[0][2] = player[n % 2].symbol
  apiArray = to1DArray(gameArray)
  gameAPI.updateGameBoard(apiArray)
  gameWinner = evaluate(gameArray)
  if (gameWinner[0]) {
    endGame()
  }
  nextTurn()
}

const on10Click = function () {
  gameArray = gameAPI.getGameBoard()
  gameArray[1][0] = player[n % 2].symbol
  apiArray = to1DArray(gameArray)
  gameAPI.updateGameBoard(apiArray)
  gameWinner = evaluate(gameArray)
  if (gameWinner[0]) {
    endGame()
  }
  nextTurn()
}

const on11Click = function () {
  gameArray = gameAPI.getGameBoard()
  gameArray[1][1] = player[n % 2].symbol
  apiArray = to1DArray(gameArray)
  gameAPI.updateGameBoard(apiArray)
  gameWinner = evaluate(gameArray)
  if (gameWinner[0]) {
    endGame()
  }
  nextTurn()
}

const on12Click = function () {
  gameArray = gameAPI.getGameBoard()
  gameArray[1][2] = player[n % 2].symbol
  apiArray = to1DArray(gameArray)
  gameAPI.updateGameBoard(apiArray)
  gameWinner = evaluate(gameArray)
  if (gameWinner[0]) {
    endGame()
  }
  nextTurn()
}

const on20Click = function () {
  gameArray = gameAPI.getGameBoard()
  gameArray[2][0] = player[n % 2].symbol
  apiArray = to1DArray(gameArray)
  gameAPI.updateGameBoard(apiArray)
  gameWinner = evaluate(gameArray)
  if (gameWinner[0]) {
    endGame()
  }
  nextTurn()
}

const on21Click = function () {
  gameArray = gameAPI.getGameBoard()
  gameArray[2][1] = player[n % 2].symbol
  apiArray = to1DArray(gameArray)
  gameAPI.updateGameBoard(apiArray)
  gameWinner = evaluate(gameArray)
  if (gameWinner[0]) {
    endGame()
  }
  nextTurn()
}

const on22Click = function () {
  gameArray = gameAPI.getGameBoard()
  gameArray[2][2] = player[n % 2].symbol
  apiArray = to1DArray(gameArray)
  gameAPI.updateGameBoard(apiArray)
  gameWinner = evaluate(gameArray)
  if (gameWinner[0]) {
    endGame()
  }
  nextTurn()
}
const nextTurn = function () {
  n++
}

const evaluate = function (player) {
  let winner = false
  for (let row = 0; row < 3; row++) {
    if (gameArray[row][0] === gameArray[row][1] && gameArray[row][1] === gameArray[row][2]) {
      winner = [true, player[n % 2]]
    }
  }
  for (let col = 0; col < 3; col++) {
    if (
      gameArray[0][col] === gameArray[1][col] && gameArray[1][col] === gameArray[2][col]) {
      winner = [true, player[n % 2]]
    }
  }
  if (gameArray[0][0] === gameArray[1][1] && gameArray[1][1] === gameArray[2][2]) {
    winner = [true, player[n % 2]]
  }
  if (gameArray[0][2] === gameArray[1][1] && gameArray[1][1] === gameArray[2][0]) {
    winner = [true, player[n % 2]]
  }
  return winner
}

const to1DArray = function (arr) {
  return arr[0].concat(arr[1].concat(arr[2]))
}

const endGame = function () {
  // add code for end of game
}

module.exports = {
  on00Click,
  on01Click,
  on02Click,
  on10Click,
  on11Click,
  on12Click,
  on20Click,
  on21Click,
  on22Click
}
