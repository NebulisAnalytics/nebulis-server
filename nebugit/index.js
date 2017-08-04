import messages from './messages';

const request = require('async-request');
const GitServer = require('git-server');

messages.logo();

const listen = async (
// default configuration
  repoLocation = '/tmp/repos',
  port = '7000',
  serverPort = '1337',
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

  const server = new GitServer({
    repos: repos,
    port: port.toString(),
    repoLocation: repoLocation,
  });
};

export { listen };

// setTimeout(() => {
//   main();
// }, 1000);
