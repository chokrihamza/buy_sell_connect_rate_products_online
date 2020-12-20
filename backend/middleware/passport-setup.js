const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require("../models/User");
const passport = require('passport');
const config = require('config');
const secretorKey = config.get('secretorKey');
const opts = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretorKey
}


passport.initialize();
passport.use(new JwtStrategy(opts, async function (jwt_payload, done) {

      const { id } = jwt_payload;
      try {
            const user = await User.findById(id).select("-password");
            user ? done(null, user) : done(null, false);

      } catch (error) {
            console.error(error)
      }

}));

module.exports = isAuth = () => passport.authenticate('jwt', { session: false });