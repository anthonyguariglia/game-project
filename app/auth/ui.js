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
  $('.response-message').text('Successfully Signed In')
  $('form').trigger('reset')
  store.user = response.user
}

const onSignInFailure = function () {
  $('.response-message').text('Incorrect Username or Password')
  $('.response-message').css('color', 'red')
}

const onSignOutSuccess = function () {
  $('.response-message').text('Successfully Signed Out')
}

const onSignOutFailure = function () {
  $('.response-message').text('Something went wrong...')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure
}
