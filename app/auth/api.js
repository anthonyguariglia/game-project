'use strict'
const apiUrl = require('../config.js')

const signUp = function (data) {
  return $.ajax({
    method: 'POST',
    url: apiUrl + '/sign-up',
    data
  })
}

const signIn = function (data) {
  return $.ajax({
    method: 'POST',
    url: apiUrl + '/sign-in',
    data
  })
}

module.exports = {
  signUp,
  signIn
}
