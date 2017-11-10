const path = require('path');
module.exports = {
  entry: './tests/webpack-custom/index.js',
  output: {
    "path": path.resolve(process.cwd(), 'tests/webpack-custom/dist'),
    "filename": "test.bundle.js",
    "library": "test",
    "libraryTarget": "umd",
    "umdNamedDefine": true
  },
  module: {
    rules: {
      test: /\.js$/,
      exclude: () => true /*/(node_modules|bower_components)/*/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              forceAllTransforms: true,
              useBuiltIns: true,
              include: ["es6.map"],
              targets: {
                node: "6.10",
                browsers: ["last 2 versions", "safari >= 7"]
              }
            }]
          ]
        }
      }
    }
  },
  devtool: 'source-map'
};