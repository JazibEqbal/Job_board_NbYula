import express from "express";
import { login, register, update } from "../controllers/auth.js";
import authWare from "../middleware/authMiddleware.js";

const router = express.Router();
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/update").patch(authWare,update);

export default router;
