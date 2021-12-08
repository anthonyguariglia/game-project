const store = require('../store.js')

const onGetBoardSuccess = function (response) {
  store.game = response.game
}

const onGetBoardFailure = function () {
  console.log('failed to get board')
}

const onUpdateBoardSuccess = function (response) {
  store.game = response.game
}

const onUpdateBoardFailure = function () {
  console.log('failed to update board')
}

const newGameSuccess = function (response) {
  store.game = response.game
}

const newGameFailure = function () {
  console.log('failed to create game')
}

module.exports = {
  onGetBoardSuccess,
  onGetBoardFailure,
  onUpdateBoardSuccess,
  onUpdateBoardFailure,
  newGameSuccess,
  newGameFailure
}
