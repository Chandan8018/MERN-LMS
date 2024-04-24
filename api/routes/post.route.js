import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  deletepost,
  getBooks,
  getPost,
  getposts,
  updatepost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getPosts", getposts);
router.delete("/deletepost/:postId/:userId", verifyToken, deletepost);
router.put("/updatebook/:postId/:userId", verifyToken, updatepost);
router.get("/:postId", getPost);
router.get("/getPosts/books", getBooks);

export default router;
