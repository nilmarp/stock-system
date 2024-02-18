const path = require('path');

module.exports = {
  entry: './src/index.js', // Arquivo de entrada
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'), // Diretório de saída
    filename: 'bundle.js' // Nome do arquivo de saída
  },
  stats: 'verbose',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // Adiciona os estilos ao DOM via tag <style>
          'css-loader'    // Interpreta @import e url() como import/require de módulos e resolve-os
        ]
      }
    ]
  }
};
