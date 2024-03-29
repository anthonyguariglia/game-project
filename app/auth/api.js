'use strict'
const apiUrl = require('../config.js')
const store = require('../store.js')

const signUp = function (data) {
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

const signInButton = function () {

}

module.exports = {
  signUp,
  signIn,
  signOut,
  signInButton
}
