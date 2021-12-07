
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

const playHTML = '<img src="https://i.imgur.com/4RI44bT.png" title="player" style="height: 170px;" />'
const compHTML = '<img src="https://i.imgur.com/iN79bav.png" title="computer" style="height: 170px;" />'

const easyHTML = '<img src="https://i.imgur.com/ezAhqaM.png" title="easy" style="height: 170px;" />'
const diffHTML = '<img src="https://i.imgur.com/o7ghFJH.png" title="hard" style="height: 170px;" />'

const player = [
  {
    name: 'PLAYER 1',
    symbol: x,
    playerNumber: 1,
    opponent: 'player',
    hardDifficulty: false
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
  gameWinner = [false, '', 0]
  n = 0

  $('#new-game').fadeOut(500)
  $('.game-window').hide()
  $('.game-window').html(`
      <div id="game-text" class="fs-1 ">
          <strong>PLAYER 1, CHOOSE YOUR OPPONENT!</strong><div id="choose-opp" class="d-flex justify-content-center align-items-center">
            <div id="player" class="game-box symbol choose-symbol mx-2">${playHTML}</div>
            <div id="computer" class="game-box symbol choose-symbol mx-2">${compHTML}</div>
          </div>
      </div>`)
  $('#game-text').html('')
  $('.game-window').fadeIn(500)
  $('#player').on('click', chooseOpponent)
  $('#computer').on('click', chooseOpponent)
  $('.new-game').html('')
}

const chooseOpponent = function (event) {
  player[0].opponent = event.target.title
  if (player[0].opponent === 'computer') {
    $('.game-window').html(`<div id="game-text" class="fs-1 ">
            <strong>PLAYER 1, CHOOSE DIFFICULTY!</strong><div id="choose-symbol" class="d-flex justify-content-center align-items-center">
                <div id="difficulty-easy" class="game-box symbol choose-opp">${easyHTML}</div>
                <div id="difficulty-hard" class="game-box symbol choose-opp">${diffHTML}</div>
            </div>
        </div>`)
    $('#difficulty-easy').on('click', chooseDifficulty)
    $('#difficulty-hard').on('click', chooseDifficulty)
  } else {
    $('.game-window').html(`<div id="game-text" class="fs-1 ">
          <strong>PLAYER 1, CHOOSE YOUR SYMBOL!</strong><div id="choose-symbol" class="d-flex justify-content-center align-items-center">
            <div id="choose-x" class="game-box symbol choose-opp">${x}</div>
            <div id="choose-o" class="game-box symbol choose-opp">${o}</div>
          </div>
      </div>`)
    $('#choose-x').on('click', chooseSymbol)
    $('#choose-o').on('click', chooseSymbol)
  }
}

const chooseDifficulty = function (event) {
  const difficulty = event.target.title
  if (difficulty === 'hard') {
    player[0].hardDifficulty = true
  } else {
    player[0].hardDifficulty = false
  }
  $('.game-window').html(`<div id="game-text" class="fs-1 ">
          <strong>PLAYER 1, CHOOSE YOUR SYMBOL!</strong><div id="choose-symbol" class="d-flex justify-content-center align-items-center">
            <div id="choose-x" class="game-box symbol choose-opp">${x}</div>
            <div id="choose-o" class="game-box symbol choose-opp">${o}</div>
          </div>
      </div>`)
  $('#choose-x').on('click', chooseSymbol)
  $('#choose-o').on('click', chooseSymbol)
}

const chooseSymbol = function (event) {
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
}

const onClick = function (event) {
  if (!gameWinner[0] && store.game._id) {
    event.preventDefault()
    // Pull 2D cell location from ID
    const positionIn2DArray = event.target.id
    const row = parseInt(positionIn2DArray.split('-')[0])
    const col = parseInt(positionIn2DArray.split('-')[1])
    if (gameArray[row][col] === '') {
      // Update game array with new player value
      gameArray[row][col] = player[n % 2].symbol
      // Update game board on screen
      $(event.target).html(`<div class="symbol">${player[n % 2].symbol}</div>`)

      // check for winner
      gameWinner = evaluate()
      // Compute 1D array cell value for API
      const cell = 3 * row + col
      // Update API with new board values
      gameAPI.updateGameBoard(cell, player[n % 2].symbol, gameWinner[0], store.game._id)
        .then(gameUI.onUpdateBoardSuccess)
        .then(logComputerChoice)
        .catch(gameUI.onUpdateBoardFailure)

      if (gameWinner[0]) {
        endGame(gameWinner)
      } else if (!store.game.over && store.game.__v === 8) {
        tieGame()
      } else if (n % 2 === 0) {
        const nextPlayer = player[(n + 1) % 2].playerNumber
        $('#game-text').hide()
        $('#game-text').html(`PLAYER ${nextPlayer}, YOUR TURN`)
        $('#game-text').fadeIn()

        // increment turn
        nextTurn()
      } else {
        // increment turn
        nextTurn()
      }
    }
  }
}

function logComputerChoice () {
  if (player[0].opponent === 'computer' && n % 2 === 1) {
    const aiChoice = findBestMove(getBoard(gameArray))
    const row = aiChoice.row
    const col = aiChoice.col

    gameArray[row][col] = player[1].symbol
    // Update game board on screen
    $(`#${row}-${col}`).hide()
    $(`#${row}-${col}`).html(`<div class="symbol">${player[n % 2].symbol}</div>`)
    $(`#${row}-${col}`).fadeIn(250)
    // Compute 1D array cell value for API
    const cell = 3 * row + col
    // Update API with new board values
    gameAPI
      .updateGameBoard(
        cell,
        player[n % 2].symbol,
        gameWinner[0],
        store.game._id
      )
      .then(gameUI.onUpdateBoardSuccess)
      .catch(gameUI.onUpdateBoardFailure)
      // check for winner
    gameWinner = evaluate()
    if (gameWinner[0]) {
      endGame(gameWinner)
    } else if (!store.game.over && store.game.__v === 8) {
      tieGame()
    } else {
      const nextPlayer = player[(n + 1) % 2].playerNumber
      $('#game-text').html(`PLAYER ${nextPlayer}, YOUR TURN`)
      $('#game-text').fadeIn()

      // increment turn
      nextTurn()
    }
  }
}

const getBoard = function (board) {
  return [...board]
}

const nextTurn = function () {
  n++
}

function isMovesLeft (board) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === '') { return true }
    }
  }

  return false
}

function minimax (board, depth, isMax) {
  const score = evaluateAI(board)
  // If Maximizer has won the game
  // return his/her evaluated score
  if (score === 10) {
    return score - depth
  }
  // If Minimizer has won the game
  // return his/her evaluated score
  if (score === -10) {
    return score + depth
  }
  // If there are no more moves and
  // no winner then it is a tie
  if (player[0].hardDifficulty ? !isMovesLeft(board) : store.game.over) {
    return 0
  }
  // If this maximizer's move
  if (isMax) {
    let best = -1000

    // Traverse all cells
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Check if cell is empty
        if (board[i][j] === '') {
          // Make the move
          board[i][j] = player[1].symbol
          // Call minimax recursively
          // and choose the maximum value
          best = Math.max(best, minimax(board, depth + 1, !isMax))
          // Undo the move
          board[i][j] = ''
        }
      }
    }
    return best
  } else {
    let best = 1000

    // Traverse all cells
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Check if cell is empty
        if (board[i][j] === '') {
          // Make the move
          board[i][j] = player[0].symbol
          // Call minimax recursively and
          // choose the minimum value
          best = Math.min(best, minimax(board, depth + 1, !isMax))

          // Undo the move
          board[i][j] = ''
        }
      }
    }
    return best
  }
}

class Move {
  constructor () {
    // eslint-disable-next-line no-unused-vars
    let row, col
  }
}

function findBestMove (board) {
  let bestVal = -1000
  const bestMove = new Move()
  bestMove.row = -1
  bestMove.col = -1

  // Traverse all cells, evaluate
  // minimax function for all empty
  // cells. And return the cell
  // with optimal value.
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Check if cell is empty
      if (board[i][j] === '') {
        // Make the move
        board[i][j] = player[1].symbol

        // compute evaluation function
        // for this move.
        const moveVal = minimax(board, 0, false)

        // Undo the move
        board[i][j] = ''

        // If the value of the current move
        // is more than the best value, then
        // update best
        if (moveVal > bestVal) {
          bestMove.row = i
          bestMove.col = j
          bestVal = moveVal
        }
      }
    }
  }

  return bestMove
}

const evaluateAI = function (b) {
  // Checking for Rows for X or O victory.
  for (let row = 0; row < 3; row++) {
    if (b[row][0] === b[row][1] && b[row][1] === b[row][2]) {
      if (b[row][0] === player[1].symbol) {
        return +10
      } else if (b[row][0] === player[0].symbol) {
        return -10
      }
    }
  }

  // Checking for Columns for X or O victory.
  for (let col = 0; col < 3; col++) {
    if (b[0][col] === b[1][col] && b[1][col] === b[2][col]) {
      if (b[0][col] === player[1].symbol) {
        return +10
      } else if (b[0][col] === player[0].symbol) {
        return -10
      }
    }
  }

  // Checking for Diagonals for X or O victory.
  if (b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
    if (b[0][0] === player[1].symbol) {
      return +10
    } else if (b[0][0] === player[0].symbol) {
      return -10
    }
  }

  if (b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
    if (b[0][2] === player[1].symbol) {
      return +10
    } else if (b[0][2] === player[0].symbol) {
      return -10
    }
  }

  // Else if none of them have
  // won then return 0
  return 0
}

const evaluate = function () {
  let winner = [false, '']
  for (let row = 0; row < 3; row++) {
    if (gameArray[row][0]) {
      if (
        gameArray[row][0] === gameArray[row][1] && gameArray[row][1] === gameArray[row][2]
      ) {
        if (gameArray[row][0] === player[0].symbol) {
          winner = [true, player[n % 2].name, -10]
        } else if (gameArray[row][0] === player[1].symbol) {
          winner = [true, player[n % 2].name, 10]
        }

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
        if (gameArray[0][col] === player[0].symbol) {
          winner = [true, player[n % 2].name, -10]
        } else if (gameArray[0][col] === player[1].symbol) {
          winner = [true, player[n % 2].name, 10]
        }
        $(`#${0}-${col}`).css('color', '#98e698')
        $(`#${1}-${col}`).css('color', '#98e698')
        $(`#${2}-${col}`).css('color', '#98e698')
      }
    }
  }
  if (gameArray[0][0]) {
    if (gameArray[0][0] === gameArray[1][1] && gameArray[1][1] === gameArray[2][2]) {
      if (gameArray[0][0] === player[0].symbol) {
        winner = [true, player[n % 2].name, -10]
      } else if (gameArray[0][0] === player[1].symbol) {
        winner = [true, player[n % 2].name, 10]
      }
      $(`#${0}-${0}`).css('color', '#98e698')
      $(`#${1}-${1}`).css('color', '#98e698')
      $(`#${2}-${2}`).css('color', '#98e698')
    }
  }
  if (gameArray[0][2]) {
    if (gameArray[0][2] === gameArray[1][1] && gameArray[1][1] === gameArray[2][0]) {
      if (gameArray[0][2] === player[0].symbol) {
        winner = [true, player[n % 2].name, -10]
      } else if (gameArray[0][2] === player[1].symbol) {
        winner = [true, player[n % 2].name, 10]
      }
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
