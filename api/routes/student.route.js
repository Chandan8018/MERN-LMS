import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  deleteBorrowedBook,
  getstudentborrowbooks,
  getstudentwithborrowbooks,
} from "../controllers/student.controller.js";

const router = express.Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    StudentBorrow:
 *      type: object
 *      required:
 *        - studentId
 *        - bookId
 *      properties:
 *        id:
 *          type: string
 *          description: The Auto-generated id of borrowed books
 *        studentId:
 *          type: string
 *          description: ID of the user who created the borrowed book
 *        studentImage:
 *          type: string
 *          description: Profile picture of the user
 *        regdNumber:
 *          type: string
 *          description: Registration number of the student
 *        bookId:
 *          type: string
 *          description: ID of the borrowed book
 *        bookname:
 *          type: string
 *          description: Borrowed book name
 *        bookImage:
 *          type: string
 *          description: Borrowed book image
 *        ISBN:
 *          type: string
 *          description: ISBN of the borrowed book
 *        authorname:
 *          type: string
 *          description: Borrowed book author name
 *        quantity:
 *          type: number
 *          description: Quantity of the borrowed book, default is 1
 *        status:
 *          type: string
 *          description: Status of the borrowed book
 *      example:
 *        id: GDHJGD788BJBJ
 *        studentId: GDHJGD788BJBJ
 *        studentName: Chandan Kumar
 *        studentImage: https://pics.craiyon.com
 *        regdNumber: 2e3s4d5g
 *        bookId: GDHJGD788BJBJ
 *        bookname: Book 1
 *        bookImage: https://pics.craiyon.com
 *        ISBN: 1234567891234
 *        authorname: Author 1
 *        quantity: 1
 *        status: borrow
 */

/**
 * @swagger
 * /api/student/borrowbook/create:
 *   post:
 *     summary: Borrow a book
 *     description: Borrow a book by providing the student ID and book ID
 *     tags:
 *       - Student
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentBorrow'
 *     responses:
 *       '200':
 *         description: Book borrowed successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Student or book not found
 */

router.post("/borrowbook/create", verifyToken, create);

/**
 * @swagger
 * /api/student/getstudentborrowbooks:
 *   get:
 *     summary: Get all borrowed books by student
 *     description: Retrieve a list of all books borrowed by a student
 *     tags:
 *       - Student
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of borrowed books retrieved successfully
 *       '401':
 *         description: Unauthorized
 */

router.get("/getstudentborrowbooks", verifyToken, getstudentborrowbooks);

/**
 * @swagger
 * /api/student/getstudents/{regdNumber}:
 *   get:
 *     summary: Get student with borrowed books
 *     description: Retrieve details of a student with their borrowed books
 *     tags:
 *       - Student
 *     parameters:
 *       - in: path
 *         name: regdNumber
 *         schema:
 *           type: string
 *         required: true
 *         description: Registration number of the student
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Student details with borrowed books retrieved successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Student not found
 */

router.get("/getstudents/:regdNumber", verifyToken, getstudentwithborrowbooks);

/**
 * @swagger
 * /api/student/return/{studentBorrowId}:
 *   delete:
 *     summary: Return a borrowed book
 *     description: Return a borrowed book by its ID
 *     tags:
 *       - Student
 *     parameters:
 *       - in: path
 *         name: studentBorrowId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the borrowed book
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Book returned successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Borrowed book not found
 */

router.delete("/return/:studentBorrowId", verifyToken, deleteBorrowedBook);

export default router;
