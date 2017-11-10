module.exports = {
  browsers: [],
  exclude: [],
  timeout: 5000,
  lint: true,
  build: {
    entry: './foglet-default.js',
    output: {
      "path": require('path').resolve(process.cwd(), 'dist'),
      "filename": "default.bundle.js",
      "library": "default",
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
