/*
MIT License

Copyright (c) 2017 Thomas Minier

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
'use strict'

const { Server, stopper } = require('karma')
const getConfig = require('../../src/karma/karma-config.js')
jest.setTimeout(30000)
describe('Karma test runner', () => {
  it('should start without crashing using default configuration', done => {
    const config = getConfig([ 'Firefox' ], [ 'tests/karma/*' ])
    const server = new Server(config, exitCode => {
      expect(exitCode).toBe(0)
      stopper.stop({ port: config.port })
      done()
    })
    server.on('browser_error', done)
    server.on('run_complete', (browsers, results) => {
      expect(results.error).toBeFalsy()
      expect(results.failed).toBe(0)
      expect(results.success).toBeGreaterThan(0)
    })
    server.start()
  })
})
