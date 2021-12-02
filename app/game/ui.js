
const onGetBoardSuccess = function (response) {
  console.log(response)
}

const onGetBoardFailure = function () {
  console.log('failed to get board')
}

const onUpdateBoardSuccess = function (response) {
  console.log(response)
}

const onUpdateBoardFailure = function () {
  console.log('failed to update board')
}

module.exports = {
  onGetBoardSuccess,
  onGetBoardFailure,
  onUpdateBoardSuccess,
  onUpdateBoardFailure
}
