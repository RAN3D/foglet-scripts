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

const signaling = require('foglet-signaling-server')

/**
 * Get configuration settings for Karma test runner
 * @param {string[]} browsers - Browsers to tests against (see Karma doc for possible values)
 * @param {string[]} exclude - Files to exclude from tests
 * @return {Object} Karma configuration
 */
const getKarmaConfig = (browsers = [], exclude = []) => {
  return {
    hostname: 'localhost',
    basePath: './',
    frameworks: [ 'browserify', 'mocha', 'chai', 'express-http-server' ],
    files: [
      'tests/*test.js',
      'tests/**/*test.js'
    ],
    preprocessors: {
      'tests/*test.js': [ 'browserify' ],
      'tests/**/*test.js': [ 'browserify' ]
    },
    exclude,
    browserify: {
      debug: true,
      transform: [
        [ 'babelify',
          { presets: [ 'env' ] }
        ]
      ]
    },
    extensions: [ '.js' ],
    proxies: {
      './': 'http://localhost:3000'
    },
    port: 3001,
    expressHttpServer: {
      port: 4001,
      appVisitor: signaling
    },
    reporters: [ 'mocha' ],
    autoWatch: true,
    browserNoActivityTimeout: 50000,
    colors: true,
    browsers,
    singleRun: true,
    concurrency: Infinity
  }
}

module.exports = getKarmaConfig
