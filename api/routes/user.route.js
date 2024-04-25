import express from "express";
import {
  deleteUser,
  getUser,
  getUserDetail,
  getUsers,
  signout,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

/**
 * @swagger
 * /api/user/update/{userId}:
 *   put:
 *     summary: Update user details
 *     description: Update details of a specific user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User updated successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 */

router.put("/update/:userId", verifyToken, updateUser);

/**
 * @swagger
 * /api/user/delete/{userId}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a specific user
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to delete
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 */

router.delete("/delete/:userId", verifyToken, deleteUser);

/**
 * @swagger
 * /api/user/signout:
 *   post:
 *     summary: Sign out user
 *     description: Sign out the currently authenticated user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User signed out successfully
 *       '401':
 *         description: Unauthorized
 */

router.post("/signout", signout);

/**
 * @swagger
 * /api/user/getusers:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of users retrieved successfully
 *       '401':
 *         description: Unauthorized
 */

router.get("/getusers", verifyToken, getUsers);

/**
 * @swagger
 * /api/user/{userId}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve details of a specific user by their ID
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to retrieve
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User details retrieved successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 */

router.get("/:userId", getUser);

/**
 * @swagger
 * /api/user/search/{regdNumber}:
 *   get:
 *     summary: Search user by registration number
 *     description: Search for a user by their registration number
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: regdNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: Registration number of the user to search
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: User found successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: User not found
 */

router.get("/search/:regdNumber", getUserDetail);

export default router;
