import messages from './messages';

const GitServer = require('git-server');
const request = require('async-request');

const repos = []

const vars = JSON.parse(process.env.vars);

const repoProto = () => { return {
  // name: 'myrepo',
  anonRead: false,
  users: [
    { user: vars.standardUser, permissions: ['W'] }
  ],
}; };

(async () => {

  messages.connectionInfo('::', vars.port);
  let res = await request(`http://localhost:${vars.serverPort}/api/endpoints`);

  JSON.parse(res.body).forEach((info) => {
    const repo = repoProto();
    repo.name = info.id;
    repos.push(repo);
  });

  const gitServer = new GitServer({
    repos: repos,
    port: vars.port.toString(),
    repoLocation: vars.repoLocation,
  });

})();