import Express from 'express';
import http from 'http';
import wrap from 'express-async-wrap';
import messages from './messages';

const Router = new Express.Router();
const respawn = require('respawn');

messages.logo();

let monitor;

const listen = (
// default configuration
  repoLocation = '/tmp/repos',
  port = '7000',
  serverPort = '1337',
  listenPort = '7010',
  standardUser = {
    username: 'nebu',
    password: 'lis',
  }
) => {
  
  monitor = respawn(['./nebugit/gitLoader.js'], {
    name: 'test',          // set monitor name 
    env: {
      ENV_VAR:'test',
      vars: JSON.stringify({
        repoLocation,
        port,
        serverPort,
        listenPort,
        standardUser,
      }),
    },
    cwd: '.',              // set cwd 
    maxRestarts:0,        // how many restarts are allowed within 60s 
    sleep:1000,            // time to sleep between restarts, 
    kill:0,            // wait 30s before force killing after stopping 
    fork: true             // fork instead of spawn 
  });

  monitor.start() // spawn and watch 

  const app = new Express();
  const server = new http.Server(app);

  app.set('trust proxy', 1);
  // app.use(cors());
  app.use([
    Router.post('/reset', wrap(async (req, res) => {
      console.log('updating server enpoint list');
      monitor.stop(() => {
        monitor.start();
      });
      res.send('updating server endpoint list');
    })),
  ]);

  server.listen(listenPort, () => {
    const host = server.address().address;
    const port = server.address().port;
    messages.listenerConnectionInfo('::', port);
  });

};

const kill = () => {
  monitor.stop(() => {
    messages.killed();
  });
};

export { listen, kill };