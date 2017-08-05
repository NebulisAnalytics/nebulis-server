import Express from 'express';
import http from 'http';
import wrap from 'express-async-wrap';
import messages from './messages';

const GitServer = require('git-server');
const Router = new Express.Router();
const request = require('request-promise');

let repos = [];
let monitor_stopping = false;
let sendVars;
let gitServer;

messages.logo();

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

  const repoProto = () => {
    return {
      anonRead: false,
      users: [
        { user: standardUser, permissions: ['W'] },
      ],
    };
  };
  
  const getEndpoints = async () => {
    try {
      const res = await request(`http://localhost:${serverPort}/api/endpoints`);

      JSON.parse(res).forEach((info) => {
        const repo = repoProto();
        repo.name = info.id;

//check for array duplicates
        let found = false;
        repos.forEach((existing) => {
          if (existing.name === repo.name) found = true;
        })

//if new then add to list
        if (found === false) {
          repos.push(repo);
          if (gitServer) gitServer.createRepo(repo, (err) => {
            if(err) console.log('git-server: ', e);
          });
        }
//if server already up then insert hot

      });
      startServer();

    } catch (err) {
      setTimeout(() => { 
        // console.log(err);
        process.stdout.write('.');
        getEndpoints(); 
      }, 250);
    }
  }

  const startServer = () => {
    if (!gitServer) {
      gitServer = new GitServer({
        repos: [],
        port: port.toString(),
        repoLocation: repoLocation,
      });
      messages.connectionInfo('::', port);
    }
  }

//main entry point for function
  getEndpoints(); 


//express app to receive update requests from api.
  const app = new Express();
  const server = new http.Server(app);

  app.set('trust proxy', 1);
  // app.use(cors());
  app.use([
    Router.post('/reset', wrap(async (req, res) => {
      getEndpoints();
      res.send({message: 'updating server endpoint list'});
    })),
  ]);

  server.listen(listenPort, () => {
    const host = server.address().address;
    const port = server.address().port;
    messages.listenerConnectionInfo('::', port);
  });

};

const stop = (cb) => {
  messages.killed();
};

export { listen, stop };