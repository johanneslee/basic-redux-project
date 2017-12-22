'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _router = require('./routes/router');

var _router2 = _interopRequireDefault(_router);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import db from './db_init.js';
var app = (0, _express2.default)();
var debug = (0, _debug2.default)('react-basic-project:server');

app.set('port', process.env.PORT || '3000');
app.set('devPort', process.env.PORT || '3001');

app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');
app.engine('html', _ejs2.default.renderFile);

// 경로 '/' 로 들어오는 요청들은 public 폴더로 정적 라우팅 된다.
app.use('/', _express2.default.static('public'));
app.use('/api/', _router2.default);
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

// NODE_ENV 값이 development 이면 webpack-dev-server를 실행한다.
if (process.env.NODE_ENV == 'development') {
  console.log('Server is running on development mode');

  var config = require('../webpack.dev.config');
  var compiler = webpack(config);
  var devServer = new WebpackDevServer(compiler, config.devServer);
  devServer.listen(app.get('devPort'), function () {
    console.log('webpack-dev-server is listening on port', devPort);
  });
}

var server = _http2.default.createServer(app);
/*
.listen(port, () => {
  console.log('Express listening http server on port ', port);
});
*/

//sequelize의 싱크 작업을 시작하고 완료되면 설정된 포트를 통해서 통신 가능하도록 한다.
_models2.default.sequelize.sync().then(function () {
  server.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
  });
});

// Event listener for HTTP server "error" event.
var onError = function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//Event listener for HTTP server "listening" event.
var onListening = function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
};

server.on('error', onError);
server.on('listening', onListening);