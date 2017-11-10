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

const readConfig = require('../../src/read-config.js');
const KarmaRunner = require('../../src/karma/karma-runner.js')
jest.setTimeout(30000)
describe('Karma test runner', () => {
  it('should start without crashing using default configuration', done => {
    const config = readConfig({
      "foglet-scripts": {
        "browsers": [
          "Firefox"
        ],
        "exclude": [
          "tests/karma/*.js",
          "tests/utils/*.js"
        ]
      }
    }, false);
    const runner = new KarmaRunner(config, exitCode => {
      expect(exitCode).toBe(0)
      done()
    })
    runner.on('browser_error', done)
    runner.on('run_complete', (browsers, results) => {
      expect(results.error).toBeFalsy()
      expect(results.failed).toBe(0)
      expect(results.success).toBeGreaterThan(0)
    })
    runner.run()
  })
})
