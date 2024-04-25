import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createComment,
  deleteComment,
  editComment,
  getPostComments,
  getcomments,
  likeComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Comment:
 *      type: object
 *      required:
 *        - content
 *        - postId
 *        - userId
 *      properties:
 *        id:
 *          type: string
 *          description: The Auto-generated id of comment collection
 *        content:
 *          type: string
 *          description: User comment
 *        postId:
 *          type: string
 *          description: Auto-generated ID of the book
 *        userId:
 *          type: string
 *          description: Auto-generated ID of the user
 *        likes:
 *          type: array
 *          description: Array of liked status (0 for dislike, 1 for like)
 *        numberOfLikes:
 *          type: number
 *          description: Number of likes for the comment
 *      example:
 *        id: GDHJGD788BJBJ
 *        content: "Nice book"
 *        postId: GDHJGD788BJBJ
 *        userId: GDHJGD788BJBJ@123
 *        likes: [1, 0, 1]
 *        numberOfLikes: 3
 */

/**
 * @swagger
 * /api/comment/create:
 *   post:
 *     summary: Create a new comment
 *     description: Create a new comment on a post
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       '200':
 *         description: Comment created successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Post not found
 */

router.post("/create", verifyToken, createComment);

/**
 * @swagger
 * /api/comment/getPostComments/{postId}:
 *   get:
 *     summary: Get comments of a post
 *     description: Retrieve comments of a specific post by its ID
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post
 *     responses:
 *       '200':
 *         description: Comments retrieved successfully
 *       '404':
 *         description: Post not found
 */

router.get("/getPostComments/:postId", getPostComments);

/**
 * @swagger
 * /api/comment/likeComment/{commentId}:
 *   put:
 *     summary: Like a comment
 *     description: Like or unlike a comment by its ID
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the comment
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Comment liked successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Comment not found
 */

router.put("/likeComment/:commentId", verifyToken, likeComment);

/**
 * @swagger
 * /api/comment/editComment/{commentId}:
 *   put:
 *     summary: Edit a comment
 *     description: Edit a comment by its ID
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the comment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       '200':
 *         description: Comment edited successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Comment not found
 */

router.put("/editComment/:commentId", verifyToken, editComment);

/**
 * @swagger
 * /api/comment/deleteComment/{commentId}:
 *   delete:
 *     summary: Delete a comment
 *     description: Delete a comment by its ID
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the comment
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Comment deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Comment not found
 */

router.delete("/deleteComment/:commentId", verifyToken, deleteComment);

/**
 * @swagger
 * /api/comment/getcomments:
 *   get:
 *     summary: Get all comments
 *     description: Retrieve a list of all comments
 *     tags:
 *       - Comments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of comments retrieved successfully
 *       '401':
 *         description: Unauthorized
 */

router.get("/getcomments", verifyToken, getcomments);

export default router;
