import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();

export default function init() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:
          process.env.NODE_ENV === "production"
            ? "https://aria-shop.herokuapp.com/api/auth/google/callback"
            : "http://localhost:5000/api/auth/google/callback",
      },
      // profile contains the authenticated user's Google profile. The verify callback must call cb providing a user to complete authentication.
      async function (accessToken, refreshToken, profile, cb) {
        try {
          const existingUser = await User.findOne({ googleId: profile.id });

          if (existingUser) {
            cb(null, existingUser);
          } else {
            const newUser = await User.create({
              name: profile.displayName,
              googleId: profile.id,
            });

            cb(null, newUser);
          }
        } catch (e) {
          cb(e);
          console.log(e);
        }
      }
    )
  );
}
