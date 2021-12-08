const apiUrl = require('../config.js')
const store = require('../store.js')

const data = {}
const newGame = function () {
  return $.ajax({
    method: 'POST',
    url: apiUrl.apiUrl + '/games/',
    data,
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

const getGameBoard = function (id) {
  return $.ajax({
    method: 'GET',
    url: apiUrl.apiUrl + '/games/' + id,
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

const updateGameBoard = function (cell, symbol, result, id) {
  const data = {
    game: {
      cell: {
        index: cell,
        value: symbol
      },
      over: result
    }
  }
  return $.ajax({
    method: 'PATCH',
    url: apiUrl.apiUrl + '/games/' + id,
    data,
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

module.exports = {
  newGame,
  getGameBoard,
  updateGameBoard
}
