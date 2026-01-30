import express from "express";
import { signup, deleteUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.delete("/:userId", deleteUser);

export default router;
