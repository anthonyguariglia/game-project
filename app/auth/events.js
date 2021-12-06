'use strict'
const getFormFields = require('../../lib/get-form-fields.js')
const authApi = require('./api.js')
const authUi = require('./ui.js')

const onSignUp = function (event) {
  event.preventDefault()

  const form = event.target
  const authData = getFormFields(form)

  authApi
    .signUp(authData)
    .then(authUi.onSignUpSuccess)
    .catch(authUi.onSignUpFailure)
}

const onSignIn = function (event) {
  event.preventDefault()

  const form = event.target
  const authData = getFormFields(form)

  authApi.signIn(authData)
    .then(authUi.onSignInSuccess)
    .catch(authUi.onSignInFailure)
}

const onSignOut = function (event) {
  event.preventDefault()
  authApi
    .signOut()
    .then(authUi.onSignOutSuccess)
    .catch(authUi.onSignOutFailure)
}

const onSignUpButton = function (event) {
  event.preventDefault()
  $('.modal-title').html('Sign Up')
  $('.modal-body').html(`<form id="sign-up-form">
                <input type="email" name="credentials[email]" placeholder="john@appleseed.com">
                <input type="password" name="credentials[password]" placeholder="password">
                <input type="password" name="credentials[password_confirmation" placeholder="confirm password">
                <button type="submit">Submit</button>

                <button class="sign-in-button">Sign In</button>
              </form>`)
  $('#sign-up-form').on('submit', onSignUp)
  $('.sign-in-button').on('click', onSignInButton)
}

const onSignInButton = function (event) {
  console.log('return to sign in triggered')
  event.preventDefault()
  $('.modal-title').html('Sign In')
  $('.modal-body').html(`<form id="sign-in-form">
                <input type="email" name="credentials[email]" placeholder="john@appleseed.com">
                <input type="password" name="credentials[password]" placeholder="password">
                <button type="submit">Submit</button>
              </form>`)
  $('#sign-in-form').on('submit', onSignIn)
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onSignUpButton,
  onSignInButton
}
