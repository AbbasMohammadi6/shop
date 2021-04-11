import express from "express";
import { getAllProducts } from "../controllers/productControllers.js";

const router = express.Router();

router.route("/").get(getAllProducts);

export default router;
