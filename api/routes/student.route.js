import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create } from "../controllers/student.controller.js";

const router = express.Router();

// router.get("/getstudents",  getstudent);
router.post("/create", verifyToken, create);

export default router;
