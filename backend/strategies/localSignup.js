import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import User from "../models/userModel.js";

export default function init() {
  const signupUser = async (req, email, password, done) => {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return done(null, false, { message: "email already used." });
    } else {
      try {
        const user = await User.create({
          name: req.body.name,
          email,
          password,
        });

        return done(null, user);
      } catch (e) {
        return done(null, false, {
          message: "something went wrong, try again later",
        });
      }
    }
  };

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        // by default, local strategy uses username and password, we will override with email
        usernameField: "email",
        passReqToCallback: true, // pass req to the callback, because I want to use req.name in mongoose model
      },
      signupUser
    )
  );
}
