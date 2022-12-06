// mocha/chai cheatsheet - https://gist.github.com/yoavniran/1e3b0162e1545055429e

let { expect, done } = require('chai')

const SaharaverilatorLibrary = require('../index.js')
const SaharaVerilatorFactory = SaharaverilatorLibrary.SaharaVerilatorFactory

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

describe('sharaverilator', () => {
  // basic tests
  describe('simple conpile& build test', () => {
    // let configJson_mac0 = {
    //   options: {
    //     verbose: 0,
    //   },
    // }

    // grab an instance
    let SaharaVerilator = SaharaVerilatorFactory(0)

    // it('set configs', async function () {
    //   SaharaSpice_mac0.setConfig(configJson_mac0)
    //   SaharaSpice_mac0.start()
    // })

    //
    it('call test', async function () {
      this.timeout(10000) // no more than 10 seconds
      let res
      res = SaharaVerilator.test()
      //res = SaharaVerilator.getInfo()
    })
  })

})
