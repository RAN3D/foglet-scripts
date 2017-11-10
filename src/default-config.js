module.exports = {
  browsers: [],
  exclude: [],
  timeout: 5000,
  lint: true,
  build: {
    entry: './index.js',
    output: {
      "path": require('path').resolve(process.cwd(), 'dist'),
      "filename": "index.bundle.js",
      "library": "index",
      "libraryTarget": "umd",
      "umdNamedDefine": true
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
};
