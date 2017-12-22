// webpack 을 불러온다
// import webpack from webpack
var webpack = require('webpack');

module.exports = {
  // webpack 의 핵심적인 기능은
  // require 기능을 클라이언트 사이드에서도 사용할 수 있고,
  // 코드를 한 파일로 합치는 것
  // entry 파일부터 시작해서 그 파일에 require 된 것, 그 파일에 require 된 것, ...
  // 재귀적으로 불러오면서 필요한 모든 모듈들을 불러온다.
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],

  output: {
    path: __dirname + '/public/',
    filename: 'bundle.js'
  },

  // 개발 서버의 설정
  devServer: {
    // 파일이 수정될 때마다 reload 한다는 것
    hot: true,
    // hot-reloading 에 필요한 webpack-dev-server 를 bundle 에 같이 넣어주는 것
    inline: true,
    // 서버를 listen 할 주소, default 는 로컬
    // 클라우드 IDE나 Remote 서버를 사용할 경우 host 를 아래와 같이 추가할 것
    host: '0.0.0.0',
    port: 4000,
    // index 파일의 위치
    contentBase: __dirname + '/public/'
  },

  // 또다른 webpack 의 핵심기능
  // 다양한 loader 를 통하여 es6, react 의 jsx 형식 등을 일반 javascript 로 변환할 수 있다
  module: {
    loaders: [
      {
        test: /\.js$/,
        // react-hot-loader 를 추가한다.
        // 기존의 babel-loader 에 전달되던 query 는 stringify 메소드로 전달한다.
        /*
        loader: ['babel-loader'],
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react']
        }
        */
        loaders: ['react-hot-loader/webpack', 'babel-loader?' + JSON.stringify({
          cacheDirectory: true,
          presets: ['es2015', 'stage-0', 'react']
        })],
        exclude: /node_modules/
        /*
        loader: ['babel-loader'],
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react'],
          plugins: ['react-hot-loader/babel']
        }
        */
      }
    ]
  },

  // 또다른 webpack 의 핵심기능
  // 자동으로 reload 를 해주는 hot-reload 기능도 plugins 를 통해서 할 수 있다
  // grunt, gulp 를 대체할 수도 있다
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
