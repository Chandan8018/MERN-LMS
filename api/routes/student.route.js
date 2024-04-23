import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  deleteBorrowedBook,
  getstudentborrowbooks,
  getstudentwithborrowbooks,
} from "../controllers/student.controller.js";

const router = express.Router();

// router.get("/getstudents",  getstudent);
router.post("/borrowbook/create", verifyToken, create);
router.get("/getstudentborrowbooks", verifyToken, getstudentborrowbooks);
router.get("/getstudents/:regdNumber", verifyToken, getstudentwithborrowbooks);
router.delete("/return/:studentId", verifyToken, deleteBorrowedBook);

export default router;
