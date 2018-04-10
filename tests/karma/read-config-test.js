/*
MIT License

Copyright (c) 2017 Thomas Minier

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the 'Software'), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
'use strict'

const fs = require('fs')
const path = require('path')
const readConfig = require('../../src/read-config.js')

describe('Configuration reader', () => {
  it('should use default config values', () => {
    const config = readConfig({})
    const expected = {
      browsers: [],
      exclude: [],
      timeout: 5000,
      lint: true,
      build: {
        entry: './index.js',
        output: {
          'path': require('path').resolve(process.cwd(), 'dist'),
          'filename': 'index.bundle.js',
          'library': 'index',
          'libraryTarget': 'umd',
          'umdNamedDefine': true
        },
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['env']
                }
              }
            }
          ]
        },
        devtool: 'source-map'
      }
    }
    expect(config).toEqual(expected)
  })
  it('should read a config from a package.json file', () => {
    const packagePath = path.resolve(__dirname, '../samples/config.json')
    const packageInfos = JSON.parse(fs.readFileSync(packagePath, { encoding: 'utf-8' }))
    const config = readConfig(packageInfos)
    const expected = {
      browsers: [
        'Firefox'
      ],
      exclude: [
        'tests/karma/*.js',
        'tests/utils/*.js'
      ],
      timeout: 5000,
      lint: false,
      build: {
        entry: './index.js',
        output: {
          'path': require('path').resolve(process.cwd(), 'dist'),
          'filename': 'index.bundle.js',
          'library': 'index',
          'libraryTarget': 'umd',
          'umdNamedDefine': true
        },
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['env']
                }
              }
            }
          ]
        },
        devtool: 'source-map'
      }
    }
    expect(config).toEqual(expected)
  })
  it('should read a config from a config.js file (package.json config is override by the config.js file)', () => {
    const packagePath = path.resolve(__dirname, '../samples/config.json')
    const packageInfos = JSON.parse(fs.readFileSync(packagePath, { encoding: 'utf-8' }))
    const configObject = require(path.resolve(__dirname, '../samples/default-config.js'))
    // our config file will completely override package.json foglet-scripts informations
    const config = readConfig(packageInfos, configObject)
    const expected = {
      browsers: [],
      exclude: [],
      timeout: 5000,
      lint: true,
      build: {
        entry: './foglet-default.js',
        output: {
          'path': require('path').resolve(process.cwd(), 'dist'),
          'filename': 'default.bundle.js',
          'library': 'default',
          'libraryTarget': 'umd',
          'umdNamedDefine': true
        },
        module: {
          rules: [
            {
              test: /\.js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: 'babel-loader',
                options: {
                  presets: ['env']
                }
              }
            }
          ]
        },
        devtool: 'source-map'
      }
    }
    expect(config).toEqual(expected)
  })
})
