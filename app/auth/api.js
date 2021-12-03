'use strict'
const apiUrl = require('../config.js')
const store = require('./store.js')

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

module.exports = {
  signUp,
  signIn,
  signOut
}
