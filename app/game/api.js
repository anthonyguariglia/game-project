const apiUrl = require('../config.js')

const getGameBoard = function () {
  const gameObject = $.ajax({
    method: 'GET',
    url: apiUrl
  })
  return gameObject.game.cells
}

const updateGameBoard = function (cell, symbol, result) {
  const data = {
    game: {
      cell: {
        index: cell,
        value: symbol
      },
      over: result
    }
  }
  const gameObject = $.ajax({
    method: 'PATCH',
    url: apiUrl,
    data
  })
  return gameObject.game.cells
}

module.exports = {
  getGameBoard,
  updateGameBoard
}
