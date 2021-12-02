
const gameAPI = require('./api.js')
const gameUI = require('./ui.js')
const store = require('../store.js')

let n = 0
const gameArray =
    [['', '', ''],
      ['', '', ''],
      ['', '', '']]

const player = [
  {
    symbol: 'x'
  },
  {
    symbol: 'o'
  }
]

let gameWinner

const onNewGame = function () {
  gameAPI.newGame()
    .then(gameUI.newGameSuccess)
    .catch(gameUI.newGameFailure)
}

const onClick = function (event) {
  event.preventDefault()
  // Pull 2D cell location from ID
  const positionIn2DArray = event.target.id
  console.log(event.target)
  const row = parseInt(positionIn2DArray.split('-')[0])
  const col = parseInt(positionIn2DArray.split('-')[1])
  // get latest game board
  //   gameAPI.getGameBoard(store.game._id)
  //     .then(gameUI.onGetBoardSuccess)
  //     .catch(gameUI.onGetBoardFailure)
  // Update game array with new value
  console.log(player[n % 2])
  console.log(row, col)
  gameArray[row][col] = player[n % 2].symbol
  // check for winner
  gameWinner = evaluate(gameArray)
  // Compute 1D array cell value for API
  const cell = 3 * row + col
  gameAPI.updateGameBoard(cell, player[n % 2].symbol, gameWinner[0], store.game._id)
    .then(gameUI.onUpdateBoardSuccess)
    .catch(gameUI.onUpdateBoardFailure)
  // End game if winner exists
  if (gameWinner[0]) {
    endGame()
  }
  // increment turn
  nextTurn()
}

const nextTurn = function () {
  n++
}

const evaluate = function (player) {
  let winner = false
  for (let row = 0; row < 3; row++) {
    if (gameArray[row][0]) {
      if (
        gameArray[row][0] === gameArray[row][1] && gameArray[row][1] === gameArray[row][2]
      ) {
        winner = [true, player[n % 2]]
      }
    }
  }
  for (let col = 0; col < 3; col++) {
    if (gameArray[0][col]) {
      if (
        gameArray[0][col] === gameArray[1][col] && gameArray[1][col] === gameArray[2][col]) {
        winner = [true, player[n % 2]]
      }
    }
  }
  if (gameArray[0][0]) {
    if (gameArray[0][0] === gameArray[1][1] && gameArray[1][1] === gameArray[2][2]) {
      winner = [true, player[n % 2]]
    }
  }
  if (gameArray[0][2]) {
    if (gameArray[0][2] === gameArray[1][1] && gameArray[1][1] === gameArray[2][0]) {
      winner = [true, player[n % 2]]
    }
  }
  return winner
}

const endGame = function () {
  // add code for end of game
}

module.exports = {
  onNewGame,
  onClick
}
