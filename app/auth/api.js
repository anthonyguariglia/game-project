'use strict'
const apiUrl = require('../config.js')

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

module.exports = {
  signUp,
  signIn
}
