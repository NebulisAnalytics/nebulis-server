import messages from './messages';

const request = require('async-request');
const GitServer = require('git-server');

// configuration
const standardUser = {
  username: 'nebu',
  password: 'lis',
};
const port = '7000';
const serverPort = '1337';
const repoLocation = '/tmp/repos';
const repoProto = () => { return {
  // name: 'myrepo',
  anonRead: false,
  users: [
    { user: standardUser, permissions: ['W'] }
  ],
}};

messages.logo();

const listen = async () => {
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
