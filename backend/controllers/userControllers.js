import asyncHandler from "express-async-handler";

// desc: if the user is authenticated, send their info back
// path: /api/users/getuser
// method: GET
export const getUser = asyncHandler(async (req, res) => {
  // if the current user is authenticated, passport.unserialize will get their id from the cookie and find the info for that user and add it to the req object.
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(401);
    throw new Error("User is not authenticated");
  }
});
