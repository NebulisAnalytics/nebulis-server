### sails-react-redux-boilerplate

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


# Installation
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

