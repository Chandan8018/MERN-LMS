import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  getstudentborrowbooks,
} from "../controllers/student.controller.js";

const router = express.Router();

// router.get("/getstudents",  getstudent);
router.post("/borrowbook/create", verifyToken, create);
router.get("/getstudentborrowbooks", verifyToken, getstudentborrowbooks);

export default router;
