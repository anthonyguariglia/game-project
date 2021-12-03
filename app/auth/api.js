'use strict'
const apiUrl = require('../config.js')
const store = require('../store.js')

const signUp = function (data) {
  console.log(apiUrl)
  return $.ajax({
    method: 'POST',
    url: apiUrl.apiUrl + '/sign-up',
    data
  })
}

const signIn = function (data) {
  return $.ajax({
    method: 'POST',
    url: apiUrl.apiUrl + '/sign-in',
    data
  })
}
const signOut = function (data) {
  return $.ajax({
    method: 'DELETE',
    url: apiUrl.apiUrl + '/sign-out',
    headers: {
      Authorization: 'Bearer ' + store.user.token
    }
  })
}

const signUpButton = function () {
  $('.modal-body').html(`<h3>Sign Up</h3>
              <form id="sign-up-form">
                <input type="email" name="credentials[email]" placeholder="john@appleseed.com">
                <input type="password" name="credentials[password]" placeholder="password">
                <input type="password" name="credentials[password_confirmation" placeholder="confirm password">
                <button type="submit">Submit</button>
              </form>`)
}

module.exports = {
  signUp,
  signIn,
  signOut,
  signUpButton
}
