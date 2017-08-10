// const passport = require('passport');
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// const GithubStrategy = require('passport-github2').Strategy;
//
// const EXPIRES_IN_MINUTES = 60 * 24;
// const JWT_SECRET = process.env.NODE_JWT_SECRET;
// const ALGORITHM = "HS256";
//
// const GITHUB_CLIENT_ID = process.env.NODE_GITHUB_PUBKEY;
// const GITHUB_CLIENT_SECRET = process.env.NODE_GITHUB_SECRET;
//
// const GITHUB_STRATEGY_CONFIG = {
//   clientID: GITHUB_CLIENT_ID,
//   clientSecret: GITHUB_CLIENT_SECRET,
//   callbackURL: "http://localhost:3000/auth/github/callback"
// }
//
// const JWT_STRATEGY_CONFIG = {
//   secretOrKey: JWT_SECRET,
//   passReqToCallback: false,
//   jwtFromRequest: ExtractJwt
// }
//
// function _onGithubStrategyAuth(accessToken, refreshToken, profile, done) {
//
//
//   process.nextTick(function () {
//
//     // To keep the example simple, the user's GitHub profile is returned to
//     // represent the logged-in user.  In a typical application, you would want
//     // to associate the GitHub account with a user record in your database,
//     // and return that user instead.
//     console.log('this is the profile');
//     return done(null, profile);
//   });
// }
//
// function _onJwtStrategyAuth(payload, next) {
//   const user = payload.user;
//   return next(null, user, {});
// }
//
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });
//
// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
//
// passport.use(new GithubStrategy(GITHUB_STRATEGY_CONFIG, _onGithubStrategyAuth));
// passport.use(new JwtStrategy(JWT_STRATEGY_CONFIG, _onJwtStrategyAuth));
//
// module.exports.jwtSettings = {
//   expiresInMinutes: EXPIRES_IN_MINUTES,
//   secret: JWT_SECRET,
//   algorithm: ALGORITHM
// }
