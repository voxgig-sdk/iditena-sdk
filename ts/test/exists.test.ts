
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { IditenaSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = IditenaSDK.test()
    equal(testsdk instanceof IditenaSDK, true,
      'IditenaSDK.test() must return a client synchronously')
  })

})
