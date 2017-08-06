const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const request = require('request');
const {spawn, spawnSync} = require( 'child_process' );

const should = chai.should();
chai.use(chaiHttp);
const expect = chai.expect;

let connector;

before((done) => {
  connector = spawn( 'npm', [ 'install' ], {
    cwd: './test/endpoint/testingProject/',
  });

  connector.stdout.on('data', (message) => {
    console.log(message.toString());
    done();
  });
});

describe('Endpoint Application Integration', function() {
  before((done) => {
    this.timeout(20000);

    spawnSync( 'cp', [ 'sampleconfig', './testingProject/.git/config' ], {
      cwd: './test/endpoint/',
    });

    connector = spawn( 'node', [ 'index.js' ], {
      cwd: './test/endpoint/testingProject/',
    });

    connector.stdout.on('data', (message) => {
      console.log(message.toString());
    });

    setTimeout(() => {
      done();
    }, 8000);

    // connector.on('close', (code, signal) => { done(); });

    //install npm modules

    //create git config file

    //launch process

  });
  after((done) => {
    spawnSync( 'rm', [ './newfile.js' ], {
      cwd: './test/endpoint/testingProject/',
    });
    spawnSync( 'rm', [ './testingProject/.git/config' ], {
      cwd: './test/endpoint/',
    });
  
    spawnSync( 'rm', [ '-rf', './testingProject/.nebugit' ], {
      cwd: './test/endpoint/',
    });
    done();
  });
  xit('should be able to connect to the server', () => {

  });

  it('on file change change, it should make a successful push to a git repo', (done) => {

    connector.stdout.on('data', (message) => {
      console.log(message.toString());
      done();
    });

    spawnSync( 'touch', [ './newfile.js' ], {
      cwd: './test/endpoint/testingProject',
    });

  });
});