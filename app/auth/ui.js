'use strict'

const store = require('../store.js')

const onSignUpSuccess = function () {
  $('signin-response-message').text('Successfully Signed Up')
  $('form').trigger('reset')
}

const onSignUpFailure = function () {
  $('.response-message').text('Failed to Sign Up')
}

const onSignInSuccess = function (response) {
  $('.signin-response-message').text('Successfully Signed In')
  $('.signin-response-message').css('color', 'black')
  $('form').trigger('reset')
  store.user = response.user
  $('.login').text(`${store.user.email}`)
  $('#new-game').text('NEW GAME')
  $('.input-sign-in').css('display', 'none')
  $('.sign-in-button').css('display', 'none')
  $('#sign-out-form').css('display', 'unset')
  $('#game-text').html('')
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
  $('.input-sign-in').css('display', 'unset')
  $('.sign-in-button').css('display', 'unset')

  $('#new-game').css('display', 'none')

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
