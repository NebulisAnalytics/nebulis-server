import Express from 'express';
import http from 'http';
import wrap from 'express-async-wrap';
import messages from './messages';

const Router = new Express.Router();
const request = require('async-request');
const GitServer = require('git-server');

messages.logo();

const listen = async (
// default configuration
  repoLocation = '/tmp/repos',
  port = '7000',
  serverPort = '1337',
  listenPort = '7010',
  standardUser = {
    username: 'nebu',
    password: 'lis',
  },
  repoProto = () => { return {
    // name: 'myrepo',
    anonRead: false,
    users: [
      { user: standardUser, permissions: ['W'] }
    ],
  }; },
) => {
  const repos = []

  messages.connectionInfo('::', port);
  let res = await request(`http://localhost:${serverPort}/api/endpoints`);

  JSON.parse(res.body).forEach((info) => {
    const repo = repoProto();
    repo.name = info.id;
    repos.push(repo);
  });

  const gitServer = new GitServer({
    repos: repos,
    port: port.toString(),
    repoLocation: repoLocation,
  });

  const app = new Express();
  const server = new http.Server(app);

  app.set('trust proxy', 1);
  // app.use(cors());
  app.use([
    Router.post('/reset', wrap(async function(req, res) {
      console.log('updating server');
    }))
  ]);

  server.listen(listenPort, () => {
    const host = server.address().address;
    const port = server.address().port;

    messages.listenerConnectionInfo('::', port);
  });

};

export { listen };