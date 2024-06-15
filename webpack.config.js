odule.exports = {
    module: {
      rules: [
        {
          test: /\.css$/, // Regex to identify CSS files
          use: ['style-loader', 'css-loader'], // Loaders to handle CSS
        },
      ],
    },
  };