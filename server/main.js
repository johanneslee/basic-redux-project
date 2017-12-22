import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import http from 'http';
import router from './routes/router';
//import db from './db_init.js';
import models from './models';
import debugFactory from 'debug';

const app = express();
const debug = debugFactory('react-basic-project:server');

app.set('port', process.env.PORT || '3000');
app.set('devPort', process.env.PORT || '3001');

app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

// 경로 '/' 로 들어오는 요청들은 public 폴더로 정적 라우팅 된다.
app.use('/', express.static('public'));
app.use('/api/', router);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// NODE_ENV 값이 development 이면 webpack-dev-server를 실행한다.
if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');

    const config = require('../webpack.dev.config');
    let compiler = webpack(config);
    let devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(app.get('devPort'), () => {
        console.log('webpack-dev-server is listening on port', devPort);
    });
}

const server = http.createServer(app);
/*
.listen(port, () => {
  console.log('Express listening http server on port ', port);
});
*/

//sequelize의 싱크 작업을 시작하고 완료되면 설정된 포트를 통해서 통신 가능하도록 한다.
models.sequelize.sync().then(() => {
  server.listen(app.get('port'), () => {
    debug('Express server listening on port ' + server.address().port);
  });
});

// Event listener for HTTP server "error" event.
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

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
}

//Event listener for HTTP server "listening" event.
const onListening = () => {
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

server.on('error', onError);
server.on('listening', onListening);
