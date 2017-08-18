# Nebulis Coding Analytics Platform &middot; ![TravisCI Status](https://img.shields.io/travis/NebulisAnalytics/nebulis-server.svg) [![Coverage Status](https://coveralls.io/repos/github/NebulisAnalytics/nebulis-server/badge.svg?branch=master)](https://coveralls.io/github/NebulisAnalytics/nebulis-server?branch=master) [![Known Vulnerabilities](https://snyk.io/test/github/NebulisAnalytics/nebulis-server/badge.svg)](https://snyk.io/test/github/NebulisAnalytics/nebulis-server)

Nebulis provides realtime analytics and reporting for coding projects. With Nebulis you can embed an endpoint into your coding units so that you can gather code changes to a project fork. Nebulis is set up to be close to zero configuration, so as soon as the endpoint is launched on a fork, that user will be instantly registered into the system and attached to the associated project.

## Installation
---

Install <a href="https://github.com/ryuone/nenv">nenv</a> and build `nodejs`:

```
nenv install 6.9.1
nenv local v6.9.1
```

Clone project:

```
git clone https://github.com/NebulisAnalytics/nebulis-server.git
cd nebulis-server
```

Install prerequisites:

```
npm install
```

Build and run development server:

```
npm run dev
```

Build and run production server:

```
npm run prod
```

### Environmental Variables
```
GIT_HOST=<your ip>:7000
NODE_ENV=production
```

### Client-side tests

Run client-side tests:

```
npm run client:test
```

Run client-side tests continuously:

```
npm run client:test:watch
```

### Server-side tests

Run server-side tests:

```
npm run server:test:watch
```

Run server-side tests continuously:

```
npm run server:test:watch
```

### Integration test

### Endpoint Integration test

Performs complete end to end test of the client connecting to this server.

```
npm run test:endpoint
```

Run integration test:

```
npm run ghoulies
```

Run integration test continuously:

```
npm run ghoulies:watch
```

## Docker Container
---

Install docker and virtualbox (these commands are for MacOS):

```
brew cask install virtualbox
brew install docker
curl -L https://github.com/docker/machine/releases/download/v0.9.0/docker-machine-`uname -s`-`uname -m` >/usr/local/bin/docker-machine && chmod +x /usr/local/bin/docker-machine
curl -L "https://github.com/docker/compose/releases/download/1.10.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && chmod +x /usr/local/bin/docker-compose
docker-machine create --driver=virtualbox default
eval $(docker-machine env default)
```

Find the virtual machine ip address:

```
docker-machine ls
```

Run the docker container:

```
docker-compose up
```

Open browser to the virtual machine ip address:

```
http://192.168.99.100:1337
```
