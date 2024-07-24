import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import UserModel from "../models/UserModel.mjs";
import "dotenv/config";

const cookieExtractor = (req, res) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.token;
  }
  return token;
};

const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.JWTSECRET,
};

export default passport.use(
  new Strategy(opts, async (jwtPayload, done) => {
    try {
      const user = await UserModel.findById(jwtPayload.id);
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      done(error, null);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, { chamod: "12345" });
});

// passport.deserializeUser(async (id, done) => {
//   try {
//     const findUser = await UserModel.findById(id);
//     if (!findUser) throw new Error("User not found");
//     done(null, findUser);
//   } catch (error) {
//     done(error, null);
//   }
// });
