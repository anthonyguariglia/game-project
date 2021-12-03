
const gameAPI = require('./api.js')
const gameUI = require('./ui.js')
const store = require('../store.js')

let n = 0
let gameArray =
    [['', '', ''],
      ['', '', ''],
      ['', '', '']]

const player = [
  {
    name: 'Player 1',
    symbol: 'x'
  },
  {
    name: 'Player 2',
    symbol: 'o'
  }
]

let gameWinner = [false, '']

const onNewGame = function () {
  gameAPI.newGame()
    .then(gameUI.newGameSuccess)
    .catch(gameUI.newGameFailure)
  gameArray = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]
  $('#0-0, #0-1, #0-2, #1-0, #1-1, #1-2, #2-0, #2-1, #2-2').text('')
}

const onClick = function (event) {
  if (!gameWinner[0]) {
    event.preventDefault()
    // Pull 2D cell location from ID
    const positionIn2DArray = event.target.id
    console.log(event.target)
    const row = parseInt(positionIn2DArray.split('-')[0])
    const col = parseInt(positionIn2DArray.split('-')[1])
    console.log(gameArray[row][col])
    if (gameArray[row][col] === '') {
      // Update game array with new player value
      gameArray[row][col] = player[n % 2].symbol
      // Update game board on screen
      $(event.target).text(player[n % 2].symbol)

      // check for winner
      gameWinner = evaluate()
      // Compute 1D array cell value for API
      const cell = 3 * row + col
      // Update API with new board values
      gameAPI.updateGameBoard(cell, player[n % 2].symbol, gameWinner[0], store.game._id)
        .then(gameUI.onUpdateBoardSuccess)
        .catch(gameUI.onUpdateBoardFailure)
      if (gameWinner[0]) {
        endGame(gameWinner)
      }

      // increment turn
      nextTurn()
    }
  }
}

const nextTurn = function () {
  n++
}

const evaluate = function () {
  let winner = [false, '']
  for (let row = 0; row < 3; row++) {
    if (gameArray[row][0]) {
      if (
        gameArray[row][0] === gameArray[row][1] && gameArray[row][1] === gameArray[row][2]
      ) {
        winner = [true, player[n % 2].name]
      }
    }
  }
  for (let col = 0; col < 3; col++) {
    if (gameArray[0][col]) {
      if (
        gameArray[0][col] === gameArray[1][col] && gameArray[1][col] === gameArray[2][col]) {
        winner = [true, player[n % 2].name]
      }
    }
  }
  if (gameArray[0][0]) {
    if (gameArray[0][0] === gameArray[1][1] && gameArray[1][1] === gameArray[2][2]) {
      winner = [true, player[n % 2].name]
    }
  }
  if (gameArray[0][2]) {
    if (gameArray[0][2] === gameArray[1][1] && gameArray[1][1] === gameArray[2][0]) {
      winner = [true, player[n % 2].name]
    }
  }
  return winner
}

const endGame = function (winner) {
  console.log(`Game over! ${winner[1]} wins!`)
}

module.exports = {
  onNewGame,
  onClick
}
