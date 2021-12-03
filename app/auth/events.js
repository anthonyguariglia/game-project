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

  authApi
    .signIn(authData)
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

module.exports = {
  onSignUp,
  onSignIn,
  onSignOut
}
