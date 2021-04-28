// import express from "express";
// import passport from "passport";
// import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import { Strategy as LocalStrategy } from 'passport-local';
// import User from "../models/userModel";

// // could do this, and it is better for when we are doing tests, beucause in those situations mongoose gets confused and thinks that we are trying to create a new model called user.
// // const User = mongoose.model('users');

// const router = express.Router();

// passport.serializeUser((user, cb) => {
//   cb(null, user._id);
// });

// // gets the id out of the cookie, and turn it into the user model
// passport.deserializeUser(async (id, cb) => {
//   try {
//     const user = await User.findOne({ googleId: id });
//     cb(null, user);
//   } catch (e) {
//     cb(e);
//   }
// });

// const GOOGLE_CLIENT_ID =
//   "757700505520-mudq4nhvm3knoh1i0t23vsttij7mlmei.apps.googleusercontent.com";
// const GOOGLE_CLIENT_SECRET = "Js1NBPA55ENM28GEI_-ZWOM4";

// passport.use(
//   new GoogleStrategy(
//     {
//       /* add these two in the .env file */
//       clientID: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//       /** Todo: you could add the first part of url in the .env file and add an if statement to use localhost on development and use the heroku one on production  **/
//       callbackURL: "http://localhost:5000/api/users/auth/google/callback",
//     },
//     // profile contains the authenticated user's Google profile. The verify callback must call cb providing a user to complete authentication.
//     async function (accessToken, refreshToken, profile, cb) {
//       // User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       //   return cb(err, user);
//       // });
//       console.log("ACCESS TOKEN:", accessToken);
//       console.log("PROFILE:", profile);

//       try {
//         const existingUser = await User.findOne({ googleId: profile.id });

//         if (existingUser) {
//           cb(null, existingUser);
//         } else {
//           const newUser = await User.create({
//             name: profile.displayName,
//             googleId: profile.id,
//           });

//           cb(null, newUser);
//         }
//       } catch (e) {
//         console.log(e);
//       }
//     }
//   )
// );

// router.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile"] })
// );

// router.get("/auth/google/callback", passport.authenticate("google"));

/////////////////////////////////

// // function initialize(passport, getUserByEmail, getUserById) {
//   const authenticateUser = async (email, password, done) => {
//     // const user = getUserByEmail(email)

//     const user  =  await User.findOne({email});

//     if (user == null) {
//       return done(null, false, { message: 'No user with that email' })
//     }

//     try {
//       if (await bcrypt.compare(password, user.password)) {
//         return done(null, user)
//       } else {
//         return done(null, false, { message: 'Password incorrect' })
//       }
//     } catch (e) {
//       return done(e)
//     }
//   }

//   passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
//   passport.serializeUser((user, done) => done(null, user.id))
//   passport.deserializeUser((id, done) => {
//     return done(null, getUserById(id))
//   })
// // }

////////////////////////////////

export default router;
