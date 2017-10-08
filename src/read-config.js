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

const DEFAULT_CONFIG = {
  browsers: [],
  exclude: [],
  timeout: 5000,
  lint: true,
  build: {
    entry: 'index.js',
    output: {
      path: 'dist',
      filename: 'main.js'
    },
    webpack: null
  }
}

/**
 * Read config from a package.json file
 * @param  {Object} packageInfos - Package informations (i.e. package.json)
 * @return {Object} Configuration file
 */
const readConfig = packageInfos => {
  const config = DEFAULT_CONFIG
  if (!('foglet-scripts' in packageInfos)) return config
  packageInfos = packageInfos['foglet-scripts']
  for (let prop in DEFAULT_CONFIG) {
    if (!(prop in packageInfos)) packageInfos[prop] = DEFAULT_CONFIG[prop]
  }
  return packageInfos
}

module.exports = readConfig
