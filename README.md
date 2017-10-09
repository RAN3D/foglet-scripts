# foglet-scripts
[![Build Status](https://travis-ci.org/RAN3D/foglet-scripts.svg?branch=master)](https://travis-ci.org/RAN3D/foglet-scripts)

Build and test foglet applications with minimal configuration

# Installation

```
npm i --save-dev foglet-scripts
```

# Getting started

## Building foglet applications

## Testing foglet applications

Install some Karma launchers to execute tests against browsers

```
npm i --save-dev karma-firefox-launcher
```

Then, add the following configuration to your `package.json`

```json
"scripts": {
  "test": "foglet-scripts test"
},
...
"foglet-scripts": {
    "browsers": [
      "Firefox"
    ]
  }
```

Now, let's write a tiny test and put it in a file in the **tests/** directory at the root of your project
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

# Usage

```
Usage: foglet-scripts [options] [command]

 Build and test foglet applications with minimal configuration


 Options:

   -V, --version  output the version number
   -h, --help     output usage information


 Commands:

   build       Build foglet application using Webpack
   test        Run tests with Karma using the specified browsers
   start       Start signaling server at http://localhost:3000
   help [cmd]  display help for [cmd]
```

# Testing environment

This package runs tests using [Karma](https://karma-runner.github.io/1.0/index.html) with:

* [Mocha](https://mochajs.org/) as the testing framework.
* [Chai](http://chaijs.com/), with the [assert API](http://chaijs.com/api/assert/), as the assertion library.
* [Webpack](https://webpack.js.org/) as a build tool.
* [Babel](https://babeljs.io/) with the [env preset](https://github.com/babel/babel-preset-env) for transpilling tests scripts.
* [Standard](https://standardjs.com/) to lint files.
