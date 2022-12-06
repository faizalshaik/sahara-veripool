/*****************************************************************************
 * This module defines methods to create pertinent packets to send across network
 ******************************************************************************/
'use strict'
const _ = require('lodash')
const ds0 = require('../../build/Release/sharaveripool.node')

var ds_status = [
  {
    state: 'reset',
    error: '',
    circuit: null,
    memory: {},
  },
  {
    state: 'reset',
    error: '',
    circuit: null,
    memory: {},
  },
  {
    state: 'reset',
    error: '',
    circuit: null,
    memory: {},
  },
  {
    state: 'reset',
    error: '',
    circuit: null,
    memory: {},
  },
]

function getStatus({ i, sharaverilator }) {
  return ds_status[i]
}

function getInfo({ i, sharaverilator }) {
  return JSON.parse(sharaverilator.getInfo())
}

function getStats({ i, sharaverilator }) {
  return sharaverilator.getStats()
}

/*
JSON Format:

...

*/
function setConfig({ i, sharaverilator }, j) {
  let res = sharaverilator.setConfig(JSON.stringify(j))

  if (!res) {
    ds_status[i].state = 'error'
    ds_status[i].error = 'Error setting config'
  }

  return res
}

function getConfig({ i, sharaverilator }) {
  return JSON.parse(sharaverilator.getConfig())
}

// bind to sockets and start devsrv
function start({ i, sharaverilator }) {
  let res = sharaverilator.start()

  if (!res) {
    ds_status[i].state = 'error'
    ds_status[i].error = 'Error starting devsrv'
  } else {
    ds_status[i].state = 'running'
  }

  return ressaharaverilator
}
function getInfo({ i, sharaverilator }) {
  return JSON.parse(sharaverilator.getInfo())
}

// stop() then start()
function restart({ i, sharaverilator }) {
  let res = false

  res &= stop({ i, sharaverilator })
  res &= start({ i, sharaverilator })

  if (!res) {
    ds_status[i].state = 'error'
    ds_status[i].error = 'Error restarting devsrv'
  } else {
    ds_status[i].state = 'running'
  }

  return res
}

// stop devsrv and release socket
function stop({ i, sharaverilator }) {
  let res = sharaverilator.stop()

  // clear internal circuit parameters
  ds_status[i].circuit = null
  ds_status[i].memory = {}
  //

  if (!res) {
    ds_status[i].state = 'error'
    ds_status[i].error = 'Error stopping devsrv'
  } else {
    ds_status[i].state = 'stopped'
  }

  return res
}

// reset devsrv and release socket
function reset({ i, sharaverilator }) {
  let res = sharaverilator.stop()

  if (!res) {
    ds_status[i].state = 'error'
    ds_status[i].error = 'Error stopping devsrv'
  } else {
    ds_status[i].state = 'reset'
  }

  return res
}

function test({ i, sharaverilator }) {
  return sharaverilator.test()
}


let exp_funcs = [
  test,
  getInfo,
  getStats,
  setConfig,
  getConfig,
  start,
  restart,
  stop,
  reset,
  getStatus,
]

module.exports = (instance_num = 0) => {
  let inst

  switch (instance_num) {
    case 0:
      inst = ds0
      break
    case 1:
      inst = ds1
      break
    case 2:
      inst = ds2
      break
    case 3:
      inst = ds3
      break
    default:
      inst = ds0
  }

  let to_exp = {}
  _.each(exp_funcs, (f) => {
    to_exp[f.name] = _.partial(f, { i: instance_num, sharaverilator: inst })
  })

  to_exp.instance_num = instance_num
  return to_exp
}
