import messages from './messages';

const GitServer = require('git-server');
const request = require('request-promise');

const repos = [];

const vars = JSON.parse(process.env.vars);

const repoProto = () => {
  return {
    anonRead: false,
    users: [
      { user: vars.standardUser, permissions: ['W'] },
    ],
  };
};

const serve = async () => {
  let res;

  try {
    res = await request(`http://localhost:${vars.serverPort}/api/endpoints`);

    JSON.parse(res).forEach((info) => {
      const repo = repoProto();
      repo.name = info.id;
      repos.push(repo);
    });

    messages.connectionInfo('::', vars.port);

    const gitServer = new GitServer({
      repos,
      port: vars.port.toString(),
      repoLocation: vars.repoLocation,
    });

  } catch (err) {
    console.log('API is not online...'.red);
    // setTimeout(() => serve(), 3000);
  }
};

serve();