const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

module.exports = {
  secret: sails.config.jwt.SECRET,

  // hashPassword: (user) => {
  //   if
  // }

  createToken: (user) => {
    return jwt.sign({
        user: user
      },
      sails.config.jwt.SECRET,
      {
        algorithm:sails.config.jwtSettings.algorithm,
        expiresInMinutes: sails.config.jwtSettings.expiresInMinutes
      }
    );
  }
}
