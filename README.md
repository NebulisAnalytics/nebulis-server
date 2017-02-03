# sails-react-redux-boilerplate

A [SailsJS](http://sailsjs.org) boilerplate application that demonstrates a single page "Todos" app using the following libraries:

* NodeJS
* SailsJS
* ReactJS
* React Hot Loader
* React-Router
* Redux *
* Material UI
* Webpack
* Mocha
* Ghoulies

This boilerplate app also includes unit tests:

* example Client Side React Tests
* example Server-Side Model Tests
* example Server-Side Controller Tests
* example Ghoulies Integration Test


## Installation
---

Install <a href="https://github.com/ryuone/nenv">nenv</a> and build `nodejs`:

```
nenv install 6.9.1
nenv local v6.9.1
```

Clone boilerplate:

```
git clone https://github.com/jaxcore/sails-react-redux-boilerplate.git
cd sails-react-redux-boilerplate
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
