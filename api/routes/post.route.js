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

/**
 * @swagger
 * components:
 *  schemas:
 *    Post:
 *      type: object
 *      required:
 *        - userId
 *        - content
 *        - title
 *      properties:
 *        id:
 *          type: string
 *          description: The Auto-generated id of post
 *        userId:
 *          type: string
 *          description: ID of the user who created the post
 *        content:
 *          type: string
 *          description: Post content
 *        title:
 *          type: string
 *          description: Post title
 *        image:
 *          type: string
 *          description: URL of the post image
 *        category:
 *          type: string
 *          description: Post category
 *        authorname:
 *          type: string
 *          description: Author name
 *        ISBN:
 *          type: string
 *          description: ISBN of the book
 *        qty:
 *          type: number
 *          description: Quantity of books available
 *        slug:
 *          type: string
 *          description: Slug generated for the post
 *      example:
 *        id: GDHJGD788BJBJ
 *        userId: GDHJGD788BJBJ
 *        content: Book content
 *        title: Book title
 *        image: https://pics.craiyon.com
 *        category: Technology
 *        authorname: Author name
 *        ISBN: 978-3-16-148410-0
 *        qty: 10
 *        slug: book-slug-1
 */

/**
 * @swagger
 * /api/post/create:
 *   post:
 *     summary: Create a new post
 *     description: Create a new post with the provided details
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       '200':
 *         description: Post created successfully
 *       '401':
 *         description: Unauthorized
 *       '400':
 *         description: Bad request
 */

router.post("/create", verifyToken, create);

/**
 * @swagger
 * /api/post/getPosts:
 *   get:
 *     summary: Get all posts
 *     description: Retrieve a list of all posts
 *     tags:
 *       - Posts
 *     responses:
 *       '200':
 *         description: List of posts retrieved successfully
 *       '400':
 *         description: Bad request
 */

router.get("/getPosts", getposts);

/**
 * @swagger
 * /api/post/deletepost/{postId}/{userId}:
 *   delete:
 *     summary: Delete a post
 *     description: Delete a post with the specified post ID and user ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post to delete
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user who created the post
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Post deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Post not found
 */

router.delete("/deletepost/:postId/:userId", verifyToken, deletepost);

/**
 * @swagger
 * /api/post/updatebook/{postId}/{userId}:
 *   put:
 *     summary: Update a post
 *     description: Update a post with the specified post ID and user ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post to update
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user who created the post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Post updated successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Post not found
 */

router.put("/updatebook/:postId/:userId", verifyToken, updatepost);

/**
 * @swagger
 * /api/post/{postId}:
 *   get:
 *     summary: Get post by ID
 *     description: Retrieve details of a post by its ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the post to retrieve
 *     responses:
 *       '200':
 *         description: Post details retrieved successfully
 *       '404':
 *         description: Post not found
 */

router.get("/:postId", getPost);

/**
 * @swagger
 * /api/post/getPosts/books:
 *   get:
 *     summary: Get all posts related to books
 *     description: Retrieve a list of all posts related to books
 *     tags:
 *       - Posts
 *     responses:
 *       '200':
 *         description: List of book posts retrieved successfully
 *       '404':
 *         description: No book posts found
 */

router.get("/getPosts/books", getBooks);

export default router;
