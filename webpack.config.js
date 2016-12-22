module.exports = {
  entry: {
    'components/Item.js': './js/components/Item.js',
    'components/Stats.js': './js/components/Stats.js',
    'views/app-view.js': './js/views/app-view.js',
    'views/todo-view.js': './js/views/todo-view.js'
  },
  output: {
    path: `${__dirname}/dist`,
    filename: '[name]'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['react']
        }
      }
    ]
  }
};
