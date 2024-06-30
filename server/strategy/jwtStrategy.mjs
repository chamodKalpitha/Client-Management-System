import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import UserModel from "../models/UserModel.mjs";
import "dotenv/config";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWTSECRET,
};

export default passport.use(
  new Strategy(opts, async (jwtPayload, done) => {
    try {
      console.log(jwtPayload);
      const user = await UserModel.findById(jwtPayload.id);
      if (user) return done(null, user);
      return done(null, false);
    } catch (error) {
      return done(error, null);
    }
  })
);

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const findUser = await UserModel.findById(id);
//     if (!findUser) throw new Error("User not found");
//     done(null, findUser);
//   } catch (error) {
//     done(error, null);
//   }
// });
