// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

const gameEvent = require('./game/events.js')
// use require without a reference to ensure a file is bundled
// require('./example')

$(() => {
  // your JS code goes here
  $('#0-0').on('click', gameEvent.on00Click)
  $('#0-1').on('click', gameEvent.on01Click)
  $('#0-2').on('click', gameEvent.on02Click)
  $('#1-0').on('click', gameEvent.on10Click)
  $('#1-1').on('click', gameEvent.on11Click)
  $('#1-2').on('click', gameEvent.on12Click)
  $('#2-0').on('click', gameEvent.on20Click)
  $('#2-1').on('click', gameEvent.on21Click)
  $('#2-2').on('click', gameEvent.on22Click)
})
