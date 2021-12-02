// use require with a reference to bundle the file and use it in this file
// const example = require('./example')
const authEvents = require('./auth/events.js')
const gameEvent = require('./game/events.js')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // your JS code goes here
  $('#sign-up-form').on('submit', authEvents.onSignUp)
  $('#sign-in-form').on('submit', authEvents.onSignIn)

  $('#new-game').on('click', gameEvent.onNewGame)

  $('#0-0').on('click', gameEvent.onClick)
  $('#0-1').on('click', gameEvent.onClick)
  $('#0-2').on('click', gameEvent.onClick)
  $('#1-0').on('click', gameEvent.onClick)
  $('#1-1').on('click', gameEvent.onClick)
  $('#1-2').on('click', gameEvent.onClick)
  $('#2-0').on('click', gameEvent.onClick)
  $('#2-1').on('click', gameEvent.onClick)
  $('#2-2').on('click', gameEvent.onClick)
})
