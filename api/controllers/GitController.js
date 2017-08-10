const request = require('request');
const gitParse = require('./../utils/gitParse');
// const Member = require('./../models/Member');
const passport = require('passport');

module.exports = {
  // Need to get an authorization code from github
  getCode: (req, res, next) => {
    const qstring = gitParse.buildCodeQS();
    const githubcall = 'https://github.com/login/oauth/authorize?' + qstring;
    res.redirect(githubcall);
  },

  // get Access token from github
  getToken: (req, res, next) => {
    const tokenURL = 'https://github.com/login/oauth/access_token?';
    //client id, client secret, auth code.
    let code = req.url.slice(req.url.indexOf('=') + 1);
    const tokenQs = gitParse.buildTokenQS(code);
    const options = {
      url: tokenURL + tokenQs,
      headers: {
        'User-Agent' : 'Tasty Test',
      }
    };
    // request token from github
    request(options, (error, response, body) =>{
      if (error) res.send("SOMETHING WENT WRONG WITH GITHUB!");
      const aToken = gitParse.parseToken(body);
      res.locals.aToken = aToken;
      next();
    });
  },

  postToken: (req, res, next) => {
    const member = new Member({
      gitAccess: res.locals.aToken
    })
    next();
  },

  // set git cookie
  setGITCookie: (req, res, next) => {
    res.cookie('GIT', req.body.access_token, {httpOnly:true, maxAge: 15000});
    next();
  },

  // make api calls to github
  getApiData: (req, res, next) => {
    const accessUrl = gitParse.buildApiURL(req.params.apiCall, req.cookies.GIT);
    request(accessUrl, (error, response, body) =>{
      req.body = body;
      next();
    });
  },

  _onPassportAuth: (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/login')
  },

  githubLogin: (req, res) => {
    passport.authenticate('github', {scope: ['user:email']})
  },

  githubCallback: (req, res, next) => {
    passport.authenticate('github', {failureRedirect:'/login'})
  }

}
