
// const gameAPI = require('./api.js')
// const gameUI = require('./ui.js')

let n
const gameArray =
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
// let apiArray = []

const on00click = function () {
  gameArray[0][0] = player[n % 2].symbol
  gameWinner = evaluate()
  nextTurn()
}

const on01click = function () {
  gameArray[0][1] = player[n % 2].symbol
  gameWinner = evaluate()
  nextTurn()
}

const on02click = function () {
  gameArray[0][2] = player[n % 2].symbol
  gameWinner = evaluate()
  nextTurn()
}

const on10click = function () {
  gameArray[1][0] = player[n % 2].symbol
  gameWinner = evaluate()
  nextTurn()
}

const on11click = function () {
  gameArray[1][1] = player[n % 2].symbol
  gameWinner = evaluate()
  nextTurn()
}

const on12click = function () {
  gameArray[1][2] = player[n % 2].symbol
  gameWinner = evaluate()
  nextTurn()
}

const on20click = function () {
  gameArray[2][0] = player[n % 2].symbol
  gameWinner = evaluate()
  nextTurn()
}

const on21click = function () {
  gameArray[2][1] = player[n % 2].symbol
  gameWinner = evaluate()
  nextTurn()
}

const on22click = function () {
  gameArray[2][2] = player[n % 2].symbol
  gameWinner = evaluate()
  nextTurn()
}
const nextTurn = function () {
  n++
}

const evaluate = function (player) {
  let winner
  for (let row = 0; row < 3; row++) {
    if (gameArray[row][0] === gameArray[row][1] && gameArray[row][1] === gameArray[row][2]) {
      winner = player[n % 2]
    }
  }
  for (let col = 0; col < 3; col++) {
    if (
      gameArray[0][col] === gameArray[1][col] && gameArray[1][col] === gameArray[2][col]) {
      winner = player[n % 2]
    }
  }
  if (gameArray[0][0] === gameArray[1][1] && gameArray[1][1] === gameArray[2][2]) {
    winner = player[n % 2]
  }
  if (gameArray[0][2] === gameArray[1][1] && gameArray[1][1] === gameArray[2][0]) {
    winner = player[n % 2]
  }
  return winner
}

module.exports = [
  on00click,
  on01click,
  on02click,
  on10click,
  on11click,
  on12click,
  on20click,
  on21click,
  on22click
]
