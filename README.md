# basic-redux-project

## About
Velopert 님의 React 예제 프로젝트, Contact(주소록) 을 학습한 프로젝트입니다.  
실습하면서 최신 버전의 모듈과의 호환성 문제들을 해결하였습니다.

### babel-loader 와 react-hot-loader 오류 문제
이제 babel 은 webpack 용으로 제공되는 플러그인 [babel-loader](https://github.com/babel/babel-loader) 을 적용하여 사용할 수 있다.  
react-hot-loader 역시 webpack 용으로 제공되는 플러그인을 적용하여 사용할 수 있다.
* webpack.config.js
```
var webpack = require('webpack');
module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js'
  ],

  ...

  loaders: [
    {
      ...

      loaders: ['react-hot-loader/webpack', 'babel-loader?' + JSON.stringify({
        cacheDirectory: true,
        presets: ['es2015', 'react']
      })],

      ...
    }
  ]
};

...
```
* index.js
```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

...

if(module.hot) {
  module.hot.accept();
}
```
### PropTypes 관련 오류
React 는 최근 [official Note](https://reactjs.org/docs/typechecking-with-proptypes.html) 에서 React.PropTypes 기능을 prop-types 라는 라이브러리로 분리했다고 한다.
```
React.PropTypes has moved into a different package since React v15.5.
Please use the prop-types library instead.
```
따라서, 이것을 설치해서 사용하면 된다.
```
npm install --save prop-types
```
* ContactCreate.js
```
import React from 'react';
import PropTypes from 'prop-types';

...

ContactCreate.propTypes = {
  // onCreate: React.PropTypes.func
  onCreate: PropTypes.func
};
```

## Velopert 님의 강좌 보기
https://www.youtube.com/playlist?list=PL9FpF_z-xR_GMujql3S_XGV2SpdfDBkeC
