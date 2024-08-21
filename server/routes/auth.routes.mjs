import { Router } from "express";
import {
  login,
  forgetPassword,
  resetPassword,
  getProfileInfo,
} from "../controllers/auth.controllers.mjs";

const router = Router();

router.post("/login", login); // fix valiation
router.post("/forgot-password", forgetPassword); // fix valiation
router.post("/reset-password/:id/:token", resetPassword); // fix valiation
router.get("/profile", getProfileInfo); // fix valiation
router.post("/logout", login); // fix valiation

export default router;
