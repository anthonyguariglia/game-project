'use strict'

const store = require('../store.js')

const onSignUpSuccess = function () {
  $('.response-message').text('Successfully Signed Up')
  $('form').trigger('reset')
}

const onSignUpFailure = function () {
  $('.response-message').text('Failed to Sign Up')
}

const onSignInSuccess = function (response) {
  $('.signin-response-message').text('Successfully Signed In')
  $('form').trigger('reset')
  store.user = response.user
  console.log(store.user.email)
  console.log($('.login').text())
  $('.login').text(`${store.user.email}`)
  $('#sign-out-form').css('display', 'unset')
  $('#game-text').html('')
  $('#sign-in-form').css('display', 'none')
  $('#new-game').css('display', 'unset')
}

const onSignInFailure = function () {
  $('.signin-response-message').text('Incorrect Username or Password')
  $('.signin-response-message').css('color', 'red')
}

const onSignOutSuccess = function () {
  $('.signin-response-message').text('Successfully Signed Out')
  $('form').trigger('reset')
  $('.login').text('Log In')

  $('#sign-out-form').css('display', 'none')
  $('#game-text').html('SIGN IN TO PLAY')
  $('#sign-in-form').css('display', 'unset')

  $('#new-game').css('display', 'none')
}

const onSignOutFailure = function () {
  $('.signin-response-message').text('Something went wrong...')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure
}
