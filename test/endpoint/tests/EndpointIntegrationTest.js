import { nebugit } from '../config';

const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const request = require('request');
const {spawn, spawnSync} = require( 'child_process' );
const should = chai.should();
chai.use(chaiHttp);
const expect = chai.expect;
var git = require("nodegit");

let connector;

before(function(done) {
  this.timeout(20000);
  connector = spawn( 'npm', ['install'], {
    cwd: './test/endpoint/testingProject/',
  });

  const npmListener = (message) => {
    console.log('npmListener: ', message.toString());
    if (message.toString().indexOf('packages') !== -1) {
      connector.stdout.removeListener('data', npmListener);
      done();
    }
  };
  connector.stdout.on('data', npmListener);
  connector.stderr.on('data', npmListener);
});

describe('Endpoint Application Integration', function() {
  let project;
  let endpointID;
  let currentHEAD;
  before((done) => {
    this.timeout(20000);
    spawnSync( 'mkdir', [ './.git' ], {
      cwd: './test/endpoint/testingProject',
    });
    spawnSync( 'cp', [ 'sampleconfig', './testingProject/.git/config' ], {
      cwd: './test/endpoint',
    });
    Project.create({name: 'coding-challenge-1', gitLink: 'github.com/user/testProj', slug: 'coding-challenge-1'}).exec((err, res) => {
      project = res;
      connector = spawn( 'node', [ 'index.js' ], {
        cwd: './test/endpoint/testingProject/',
      });
      connector.stdout.on('data', beforeListener);
      connector.stderr.on('data', beforeListener);
    });
    const beforeListener = (message) => {
      console.log('beforeListener: ', message.toString());
      if (message.toString().indexOf('Endpoint ID:') !== -1) {
        const m = message.toString();
        const i = m.indexOf('ID:');
        endpointID = m.substring(i + 4, m.length).split(' ')[0].split('\n')[0];
      }
      if (message.toString().indexOf('Checking for changes...') !== -1) {
        setTimeout(() => {
          connector.stdout.removeListener('data', beforeListener);
          done();
        }, 1500);
      }
    }
    // connector.on('close', (code, signal) => { done(); });
  });
  xit('should be able to connect to the server', () => {

  });
  it('on file change change, it should make a successful commit for a repo', function(done) {
    this.timeout(15000);
    let madeCommit = false;
    const pushListener = (message) => {
      if (message.toString().indexOf('1 file changed, 0 insertions(+)') !== -1) {
        madeCommit = true;
      };
      if (message.toString().indexOf('Syncing endpoint to server...') !== -1) {
        expect(madeCommit).to.be.equal(true);
        setTimeout(() => {
          //store repo information before testing
          const path = `/tmp/repos/${endpointID}.git`;
          git.Repository.openBare(path)
            .then(function(repo) {
              repo.getReferenceCommit('refs/heads/master').then(function(commit) {
                currentHEAD = commit.sha();
                console.log('precurrentHEAD',currentHEAD);
                connector.stdout.removeListener('data', pushListener);
                console.log('pushListener: listener removed')
                done();
              }, done);
            }, done);
          }, 2500);
      };
      console.log('pushListener:', message.toString());
    };
    connector.stdout.on('data', pushListener);
    spawn( 'touch', [ './newfile.js' ], {
      cwd: './test/endpoint/testingProject',
    });
  });
  it('when restarted, the server should still accept repo pushes', (done) => {
    nebugit.stop(() => {
      nebugit.listen();
      let madeCommit = false;
      const pushListener = (message) => {
        if (message.toString().indexOf('1 file changed, 0 insertions(+)') !== -1) {
          madeCommit = true;
        };
        if (message.toString().indexOf('Syncing endpoint to server...') !== -1) {
          expect(madeCommit).to.be.equal(true);
          setTimeout(() => {
            connector.stdout.removeListener('data', pushListener);
            done();
          }, 1750);
        };
        console.log('pushListener2:', message.toString());
      };
      connector.stdout.on('data', pushListener);
      spawn( 'touch', [ './newfile2.js' ], {
        cwd: './test/endpoint/testingProject',
      });
    });
  });
  it('should report an additional commit in the server repo', function(done) {
    this.timeout(20000);
    const path = `/tmp/repos/${endpointID}.git`;
    git.Repository.openBare(path)
      .then(function(repo) {
        repo.getReferenceCommit('refs/heads/master').then(function(commit) {
          const newHead = commit.sha();
          console.log('currentHEAD',currentHEAD);
          console.log('newHead',newHead);
          expect(currentHEAD).to.not.be.equal(newHead);
          expect(currentHEAD.length).to.be.equal(newHead.length);
          expect(newHead.length).to.be.equal(40);
          done();
        }, done);
      }, done);
  });
  after((done) => {
    Project.destroy(project.id).exec((err) => {
      Endpoint.find(endpointID).populate('member').exec((err, endpoints) => {
        Endpoint.destroy(endpointID).exec((err) => {
          Member.destroy(endpoints[0].member.id).exec((err) => {
            spawnSync( 'rm', [ './newfile.js' ], {
              cwd: './test/endpoint/testingProject/',
            });
            spawnSync( 'rm', [ './newfile2.js' ], {
              cwd: './test/endpoint/testingProject/',
            });
            spawnSync( 'rm', [ './testingProject/.git/config' ], {
              cwd: './test/endpoint/',
            });
            spawnSync( 'rm', [ '-rf', '.git' ], {
              cwd: './test/endpoint/testingProject',
            });
            // spawnSync( 'rm', [ '-rf', './testingProject/.nebugit' ], {
            //   cwd: './test/endpoint/',
            // });
            done();
          });
        });
      });
    });
  });
});