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

const readConfig = require('../../src/read-config.js')
const KarmaConfig = require('../../src/karma/karma-config.js')
jest.setTimeout(30000)

describe('Sharding tests', () => {
	it('should be the same browsers when sharding=false', () => {
    const config = readConfig({ 'foglet-scripts': { browsers: ['Firefox', 'Chrome'], sharding: false }})
    expect(config.browsers).toEqual(['Firefox', 'Chrome']);
  })
  it('should create an array of browsers fitting the number of file tests, all equal to the first browser', () => {
    const config = readConfig({ 'foglet-scripts': { browsers: ['Firefox', 'Chrome'], sharding: true }});
    expect(config.browsers.length).toBeGreaterThan(1);
		expect(config.browsers[0]).toEqual('Firefox');
		const karmaConf = KarmaConfig(config.browsers, config.exclude, config.timeout, config.lint, config.sharding);
		expect(karmaConf.browsers).not.toContain('Chrome');
  });
})
