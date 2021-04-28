import express from "express";
import { registerUser, loginUser } from "../controllers/userControllers.js";
// If I remove this, passport throws and error????
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router;

/////////////////////////////////////////////////////////

/*

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userModel.js";



passport.serializeUser((user, cb) => {
  console.log("********serialize*********");
  return cb(null, user._id);
});


// // gets the id out of the cookie, and turn it into the user model
passport.deserializeUser((id, cb) => {
  console.log("********DEserialize*********");
  User.findById(id)
    .then((user) => cb(null, user))
    .catch((e) => cb(e));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/users/auth/google/callback",
    },
    // profile contains the authenticated user's Google profile. The verify callback must call cb providing a user to complete authentication.
    async function (accessToken, refreshToken, profile, cb) {

      try {
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          console.log("EXISTING USER:", existingUser);
          cb(null, existingUser);
        } else {
          const newUser = await User.create({
            name: profile.displayName,
            googleId: profile.id,
          });

          console.log("NEWUSER", newUser);

          cb(null, newUser);
        }
      } catch (e) {
        cb(e);
        console.log(e);
      }
    }
  )
);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    // res.send(req.user);
    res.redirect("http://localhost:3000/");
  }
);



// req.logout() didn't worked for me, res.crealCookie deletes the coockie that was saved in the browser
router.get("/logout", (req, res) => {
  req.session.destroy(function () {
    res.clearCookie("connect.sid");
    // when I delete this, it doesn't delete the cookie in the browser????
    res.redirect("http://localhost:3000/");
  });
});
/////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////

import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";

const authenticateUser = async (email, password, done) => {
  // const user = getUserByEmail(email)

  const user = await User.findOne({ email });

  if (!user) {
    return done(null, false, { message: "No user with that email" });
  }

  try {
    if (await bcrypt.compare(password, user.password)) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Password incorrect" });
    }
  } catch (e) {
    return done(e);
  }
};

passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

router.post(
  "/auth/login",
  passport.authenticate("local", {
    failureFlash: true,
  }),
  (req, res) => {
    console.log("AUTH LOGIN");
    res.json(req.user);
  }
);



///////////////////////////////////////////////////////////

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

router.post(
  "/auth/register",
  passport.authenticate("local-signup", {
    failureFlash: true,
  }),
  (req, res) => {
    console.log("AUTH REGISTER");
    res.json(req.user);
  }
);
*/
