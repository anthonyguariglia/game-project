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
  $('.modal-body')
    .html(`<form id="sign-up-form" class="d-flex justify-content-center align-items-center flex-wrap">
                <input type="email" name="credentials[email]" placeholder="john@appleseed.com" class="input-group-lg input-sign-in m-1">
                <input type="password" name="credentials[password]" placeholder="password" class="input-group-lg input-sign-in m-1">
                <input type="password" name="credentials[password_confirmation" placeholder="confirm password" class="input-group-lg input-sign-in m-1">
                <button type="submit" class="sign-in-button btn btn-success btn-sm m-1">Submit</button>
              </form>
              <br>
              <div class="d-grid gap-2 col-8 mx-auto">
                <button class="sign-in-button-return btn btn-dark col">Back to Sign In</button>
              </div>`)
  $('#sign-up-form').on('submit', onSignUp)
  $('.sign-in-button-return').on('click', onSignInButton)
}

const onSignInButton = function (event) {
  console.log('return to sign in triggered')
  event.preventDefault()
  $('.modal-title').html('Sign In')
  $('.modal-body')
    .html(`<form id="sign-in-form" class="d-flex justify-content-center align-items-center">
                <input type="email" name="credentials[email]" placeholder="john@appleseed.com" class="input-group-lg input-sign-in mx-1">
                <input type="password" name="credentials[password]" placeholder="password" class="input-group-lg input-sign-in mx-1">
                <button type="submit" class="sign-in-button btn btn-success btn-sm mx-1">Submit</button>
              </form>
              <br>
              <div class="d-grid gap-2 col-8 mx-auto">
                  <button class="sign-up-button btn btn-dark col">Don't have an account? Sign up here!</button>
                  <div class="col"></div>
              </div>`)
  $('#sign-in-form').on('submit', onSignIn)
  $('.sign-up-button').on('click', onSignUpButton)
}

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut,
  onSignUpButton,
  onSignInButton
}
