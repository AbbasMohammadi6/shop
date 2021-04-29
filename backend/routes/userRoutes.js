import express from "express";
import { getUser } from "../controllers/userControllers.js";

const router = express.Router();

router.route("/getuser").get(getUser);

export default router;
