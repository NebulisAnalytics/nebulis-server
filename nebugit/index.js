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
let app;
let server;

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

        repo.event = (response) => {
          console.log(`LISTENER: ${JSON.stringify(response)}`);
        }

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

      stop(() => {
        startListener();
        startServer();
      });

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

  const startListener = () => {
    //express app to receive update requests from api.
    app = new Express();
    server = new http.Server(app);

    app.set('trust proxy', 1);
    // app.use(cors());
    app.use([
      Router.post('/reset', wrap(async (req, res) => {
        getEndpoints();
        console.log('LISTENER: updating server endpoint list');
        res.send({message: 'updating server endpoint list'});
      })),
    ]);

    server.listen(listenPort, () => {
      const host = server.address().address;
      const port = server.address().port;
      messages.listenerConnectionInfo('::', port);
    });
  };

//main entry point for function
  messages.logo();
  getEndpoints(); 

};

const stop = (cb) => {
  if (gitServer) {
    gitServer.server.close(() => {
      if (server) {
        server.close(() => {
          gitServer = null;
          cb();
        });
      } else {
        cb();  
      }
    });
  } else {
    cb();
  }
};

export { listen, stop };