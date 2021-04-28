import express from "express";
import passport from "passport";
import User from "../models/userModel.js";

const router = express.Router();

router.post(
  "/register",
  passport.authenticate("local-signup", {
    failureFlash: true,
  }),
  (req, res) => {
    console.log("AUTH REGISTER");
    res.json(req.user);
  }
);

router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
  }),
  (req, res) => {
    console.log("AUTH LOGIN");
    res.json(req.user);
  }
);

// req.logout() didn't worked for me, res.crealCookie
router.get("/logout", (req, res) => {
  req.session.destroy(function () {
    // deletes the coockie that was saved in the browser
    res.clearCookie("connect.sid");
    // when I delete this, it doesn't delete the cookie in the browser????
    res.redirect("http://localhost:3000/");
  });
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  // res.send(req.user);
  res.redirect("http://localhost:3000/");
});

/** Todo: move these two in some other file **/
// user is the user that comes out of passport strategies
passport.serializeUser((user, cb) => cb(null, user._id));

// gets the id out of the cookie, and turn it into the user model
passport.deserializeUser((id, cb) => {
  User.findById(id)
    .then((user) => cb(null, user))
    .catch((e) => cb(e));
});

export default router;
