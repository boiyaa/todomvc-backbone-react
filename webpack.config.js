module.exports = {
  entry: {
    'app.js': './js/app.js'
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name]'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'latest']
        }
      }
    ]
  }
};
