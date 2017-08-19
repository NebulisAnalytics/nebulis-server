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
  repoLocation = process.env['REPO_LOCATION'],
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
        { user: standardUser, permissions: ['R', 'W'] },
      ],
    };
  };
  
  const getEndpoints = async () => {
    try {
      const res = await request(`${process.env['API_HOST']}/api/endpoints`);
      //clear repo list before populating it
      repos = [];

      JSON.parse(res).forEach((info) => {
        const repo = repoProto();
        repo.name = info.id;

        repo.event = (response) => {
          console.log(`LISTENER: ${JSON.stringify(response)}`);
        };

        repos.push(repo);
      });

      stop(() => {
        startListener();
        startServer();
      });

    } catch (err) {
      setTimeout(() => { 
        process.stdout.write('.');
        getEndpoints(); 
      }, 250);
    }
  }

  const startServer = () => {
    if (!gitServer) {
      gitServer = new GitServer({
        repos: repos,
        port: port.toString(),
        repoLocation: repoLocation,
      });
      messages.connectionInfo(process.env['GIT_HOST'],'');
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
        // console.log('LISTENER: updating server endpoint list');
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