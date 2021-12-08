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
  $('.sign-up-button').on('click', authEvents.onSignUpButton)
  $('.sign-out-button').on('click', authEvents.onSignOut)

  $('#new-game').on('click', gameEvent.onNewGame)

  $('#orange').on('click', gameEvent.onChangeTheme)
  $('#green').on('click', gameEvent.onChangeTheme)
  $('#blue').on('click', gameEvent.onChangeTheme)
})
