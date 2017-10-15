'use strict'

const { clear } = require('../../src/utils/utils.js')

describe('clear', () => {
  it('should clear all value', (done) => {
		clear([1, 2, 3]).then((tab) => {
			expect(tab).toEqual([undefined, undefined, undefined]);
			done();
		});
	});
})
