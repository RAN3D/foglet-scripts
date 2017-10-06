# foglet-scripts
[![Build Status](https://travis-ci.org/RAN3D/foglet-scripts.svg?branch=master)](https://travis-ci.org/RAN3D/foglet-scripts)

Build and test foglet applications with minimal configuration

# Installation

```
npm i --save-dev foglet-scripts
```

# Getting started

Install some Karma laucnhers to execute tests against browsers

```
npm i --save-dev karma-firefox-launcher
```

Then, add the following configuration to your `package.json`

```json
"scripts: {
  "test": "foglet-scripts test"
},
...
"foglet-scripts": {
    "browsers": [
      "Firefox"
    ]
  }
```

Now, let's write a tiny test and put it in a **tests/** directory at the root of your project
```javascript
describe('some awesome test', () => {
  it('should work great!', () => {
    assert.isOk(true)
  })
})
```

Finally, let's test!
```
npm test
```

# Testing environment

This package runs tests using [Karma](https://karma-runner.github.io/1.0/index.html) with:

* [Mocha](https://mochajs.org/) as the testing farmework 
* [Chai](http://chaijs.com/), with the [assert API](http://chaijs.com/api/assert/), as the assertion library.
* [Webpack](https://webpack.js.org/) as a build tool. 
* [Babel](https://babeljs.io/) with the [env preset](https://github.com/babel/babel-preset-env) for transpilling tests scripts
* [Standard](https://standardjs.com/) to lint files
