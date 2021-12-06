
const gameAPI = require('./api.js')
const gameUI = require('./ui.js')
const store = require('../store.js')

let n = 0
let gameArray =
    [['', '', ''],
      ['', '', ''],
      ['', '', '']]

const x = 'X'
const o = 'O'

const player = [
  {
    name: 'PLAYER 1',
    symbol: x,
    playerNumber: 1
  },
  {
    name: 'PLAYER 2',
    symbol: o,
    playerNumber: 2
  }
]

let gameWinner = [false, '']

const onNewGame = function (event) {
  event.preventDefault()
  gameAPI.newGame()
    .then(gameUI.newGameSuccess)
    .catch(gameUI.newGameFailure)
  gameArray = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]
  $('#0-0, #0-1, #0-2, #1-0, #1-1, #1-2, #2-0, #2-1, #2-2').text('')
  gameWinner = [false, '']
  n = 0

  $('#new-game').fadeOut(500)
  $('.game-window').hide()
  $('.game-window').html(`
      <div id="game-text" class="fs-1 ">
          <strong>PLAYER 1, CHOOSE YOUR SYMBOL!</strong><div id="choose-symbol" class="d-flex justify-content-center align-items-center">
            <div id="choose-x" class="game-box symbol choose-symbol">${x}</div>
            <div id="choose-o" class="game-box symbol choose-symbol">${o}</div>
          </div>
      </div>`)
  $('#game-text').html('')
  $('.game-window').fadeIn(500)
  $('#choose-x').on('click', chooseSymbol)
  $('#choose-o').on('click', chooseSymbol)
  $('.new-game').html('')
}

const chooseSymbol = function (event) {
  console.log('chose a symbol')
  player[0].symbol = $(event.target).text()
  if (player[0].symbol === o) {
    player[1].symbol = x
  } else {
    player[1].symbol = o
  }
  $('.game-window').hide()
  $('.game-window').html(`
    <section class="game-window d-flex justify-content-center align-items-center">
        <div class="container d-flex justify-content-center align-content-center mt-40">
            <div class="row row-cols-3 gx-5 text-center">
            <div class="col game-box px-0 border border-start-0 border-top-0 border-2 border-dark" id="0-0">
            </div>
            <div class="col game-box px-0 border border-top-0 border-2 border-dark" id="0-1">
            </div>
            <div class="col game-box px-0 border border-top-0 border-end-0 border-2 border-dark" id="0-2">
            </div>
            <div class="col game-box px-0 border border-start-0 border-2 border-dark" id="1-0">
            </div>
            <div class="col game-box px-0 border border-2 border-dark" id="1-1">
            </div>
            <div class="col game-box px-0 border border-end-0 border-2 border-dark" id="1-2">
            </div>
            <div class="col game-box px-0 border border-start-0 border-bottom-0 border-2 border-dark" id="2-0">
            </div>
            <div class="col game-box px-0 border border-bottom-0 border-2 border-dark" id="2-1">
            </div>
            <div class="col game-box px-0 border border-end-0 border-bottom-0 border-2 border-dark" id="2-2">
            </div>
        </div> 
    </section>
        `)

  $('#game-text').hide()
  $('#game-text').html('PLAYER 1, YOUR TURN')

  $('.game-window').fadeIn(500)
  $('#game-text').fadeIn(500)

  $('#0-0').on('click', onClick)
  $('#0-1').on('click', onClick)
  $('#0-2').on('click', onClick)
  $('#1-0').on('click', onClick)
  $('#1-1').on('click', onClick)
  $('#1-2').on('click', onClick)
  $('#2-0').on('click', onClick)
  $('#2-1').on('click', onClick)
  $('#2-2').on('click', onClick)

  console.log(player)
}

const onClick = function (event) {
  if (!gameWinner[0] && store.game._id) {
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
      $(event.target).html(`<div class="symbol">${player[n % 2].symbol}</div>`)

      // check for winner
      gameWinner = evaluate(row, col)
      // Compute 1D array cell value for API
      const cell = 3 * row + col
      // Update API with new board values
      gameAPI.updateGameBoard(cell, player[n % 2].symbol, gameWinner[0], store.game._id)
        .then(gameUI.onUpdateBoardSuccess)
        .catch(gameUI.onUpdateBoardFailure)

      console.log(store.game.over, store.game.__v)
      if (gameWinner[0]) {
        endGame(gameWinner)
      } else if (!store.game.over && store.game.__v === 8) {
        tieGame()
      } else {
        const nextPlayer = player[(n + 1) % 2].playerNumber
        console.log(nextPlayer, n)
        $('#game-text').hide()
        $('#game-text').html(`PLAYER ${nextPlayer}, YOUR TURN`)
        $('#game-text').fadeIn()
      }
      // increment turn
      nextTurn()
    }
  }
}

const nextTurn = function () {
  n++
}

const evaluate = function (a, b) {
  let winner = [false, '']
  for (let row = 0; row < 3; row++) {
    if (gameArray[row][0]) {
      if (
        gameArray[row][0] === gameArray[row][1] && gameArray[row][1] === gameArray[row][2]
      ) {
        winner = [true, player[n % 2].name]
        $(`#${row}-${0}`).css('color', '#98e698')
        $(`#${row}-${1}`).css('color', '#98e698')
        $(`#${row}-${2}`).css('color', '#98e698')
      }
    }
  }
  for (let col = 0; col < 3; col++) {
    if (gameArray[0][col]) {
      if (
        gameArray[0][col] === gameArray[1][col] && gameArray[1][col] === gameArray[2][col]) {
        winner = [true, player[n % 2].name]
        $(`#${0}-${col}`).css('color', '#98e698')
        $(`#${1}-${col}`).css('color', '#98e698')
        $(`#${2}-${col}`).css('color', '#98e698')
      }
    }
  }
  if (gameArray[0][0]) {
    if (gameArray[0][0] === gameArray[1][1] && gameArray[1][1] === gameArray[2][2]) {
      winner = [true, player[n % 2].name]
      $(`#${0}-${0}`).css('color', '#98e698')
      $(`#${1}-${1}`).css('color', '#98e698')
      $(`#${2}-${2}`).css('color', '#98e698')
    }
  }
  if (gameArray[0][2]) {
    if (gameArray[0][2] === gameArray[1][1] && gameArray[1][1] === gameArray[2][0]) {
      winner = [true, player[n % 2].name]
      $(`#${0}-${2}`).css('color', '#98e698')
      $(`#${1}-${1}`).css('color', '#98e698')
      $(`#${2}-${0}`).css('color', '#98e698')
    }
  }
  return winner
}

const tieGame = function () {
  $('#game-text').html('TIE GAME! TRY AGAIN!')

  $('.new-game').html('<button class="btn btn-success" id="new-game">PLAY AGAIN</button>')

  $('#new-game').on('click', onNewGame)
  $('#new-game').css('display', 'unset')
  $(`#${0}-${0}`).css('color', 'grey')
  $(`#${0}-${1}`).css('color', 'grey')
  $(`#${0}-${2}`).css('color', 'grey')
  $(`#${1}-${0}`).css('color', 'grey')
  $(`#${1}-${1}`).css('color', 'grey')
  $(`#${1}-${2}`).css('color', 'grey')
  $(`#${2}-${0}`).css('color', 'grey')
  $(`#${2}-${1}`).css('color', 'grey')
  $(`#${2}-${2}`).css('color', 'grey')
}

const endGame = function (winner) {
  $('#game-text').html(`GAME OVER! ${winner[1]} WINS!`)
  $('.new-game').html('<button class="btn btn-success" id="new-game">PLAY AGAIN</button>')

  $('#new-game').on('click', onNewGame)
  $('#new-game').css('display', 'unset')
}

module.exports = {
  onNewGame,
  onClick,
  chooseSymbol
}
