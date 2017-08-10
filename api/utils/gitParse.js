const qs = require('qs');

module.exports = {
  buildCodeQS: function() {
    let qObj = {
      client_id: sails.config.github.PUBKEY,
      redirect_url: 'http://localhost:3000/githubcallback',
      scope: 'user',
    }
    return qs.stringify(qObj);
  },

  buildTokenQS: function (aCode){
    let qObj = {
      client_id: sails.config.github.PUBKEY, /*'0d72b92d701037c45095',*/
      client_secret: sails.config.github.SECRET, /*'e97343d2a783fead97770d3cc29ba6192c924879',*/
      code: aCode,
    }
    return qs.stringify(qObj);
  },

  parseToken: function(body) {
    let tokenObj = qs.parse(body);
    return tokenObj;
  },

  buildApiURL: function(apiCall, gitCookie){
    return {
      url: `https://api.github.com/${apiCall}?access_token=${gitCookie}`,
      headers: {
        'User-Agent' : 'Tasty Test',
      }
    };
  }
}
