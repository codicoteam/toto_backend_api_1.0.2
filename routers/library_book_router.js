const express = require("express");
const router = express.Router();
const bookController = require("../controllers/library_book_controller");   
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: LibraryBook
 *   description: Library books management
 */

/**
 * @swagger
 * /api/v1/library-book:
 *   get:
 *     tags: [LibraryBook]
 *     summary: Get all books
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of books
 */
router.get("/", authenticateToken, bookController.getAllBooks);

/**
 * @swagger
 * /api/v1/library-book/{id}:
 *   get:
 *     tags: [LibraryBook]
 *     summary: Get book by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book details
 */
router.get("/:id", authenticateToken, bookController.getBookById);

/**
 * @swagger
 * /api/v1/library-book:
 *   post:
 *     tags: [LibraryBook]
 *     summary: Create book
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - author
 *               - subjectId
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Introduction to Algebra"
 *                 description: Book title (required)
 *               author:
 *                 type: string
 *                 example: "John Smith"
 *                 description: Book author (required)
 *               description:
 *                 type: string
 *                 example: "A comprehensive guide to algebra"
 *                 description: Book description
 *               subjectId:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c85"
 *                 description: Subject ID (required)
 *               isbn:
 *                 type: string
 *                 example: "978-0-123456-78-9"
 *                 description: ISBN number
 *               publisher:
 *                 type: string
 *                 example: "Academic Press"
 *                 description: Publisher name
 *               publishedYear:
 *                 type: number
 *                 example: 2023
 *                 description: Publication year
 *               pages:
 *                 type: number
 *                 example: 350
 *                 description: Number of pages
 *               coverImage:
 *                 type: string
 *                 example: "https://example.com/book-cover.jpg"
 *                 description: Cover image URL
 *               fileUrl:
 *                 type: string
 *                 example: "https://example.com/book.pdf"
 *                 description: PDF file URL
 *               isActive:
 *                 type: boolean
 *                 example: true
 *                 default: true
 *     responses:
 *       201:
 *         description: Book created
 */
router.post("/", authenticateToken, bookController.createBook);

/**
 * @swagger
 * /api/v1/library-book/by-subject/{subjectId}:
 *   get:
 *     tags: [LibraryBook]
 *     summary: Get books by subject ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         required: true
 *         schema:
 *           type: string
 *         description: Subject ID
 *     responses:
 *       200:
 *         description: Books for subject
 */
router.get("/by-subject/:subjectId", authenticateToken, bookController.getBooksBySubjectId);

/**
 * @swagger
 * /api/v1/library-book/{id}:
 *   put:
 *     tags: [LibraryBook]
 *     summary: Update book
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Book updated
 */
router.put("/:id", authenticateToken, bookController.updateBook);

/**
 * @swagger
 * /api/v1/library-book/{id}:
 *   delete:
 *     tags: [LibraryBook]
 *     summary: Delete book
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book deleted
 */
router.delete("/:id", authenticateToken, bookController.deleteBook);

/**
 * @swagger
 * /api/v1/library-book/{bookId}/like:
 *   post:
 *     tags: [LibraryBook]
 *     summary: Like book
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "60d21b4667d0d8992e610c85"
 *                 description: User ID liking the book
 *               userType:
 *                 type: string
 *                 enum: [student, teacher, admin]
 *                 example: "student"
 *                 description: Type of user
 *     responses:
 *       200:
 *         description: Book liked
 */
router.post("/:bookId/like", authenticateToken, bookController.likeBook);   

module.exports = router;
