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
 * /api/v1/library_book/create:
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
 *     responses:
 *       201:
 *         description: Book created
 */
router.post("/create", authenticateToken, bookController.createBook);

/**
 * @swagger
 * /api/v1/library_book/getall:
 *   get:
 *     tags: [LibraryBook]
 *     summary: Get all books
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of books
 */
router.get("/getall", authenticateToken, bookController.getAllBooks);

/**
 * @swagger
 * /api/v1/library_book/get/{id}:
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
 *     responses:
 *       200:
 *         description: Book details
 */
router.get("/get/:id", authenticateToken, bookController.getBookById);

/**
 * @swagger
 * /api/v1/library_book/get-by-subject/{subjectId}:
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
 *     responses:
 *       200:
 *         description: Books for subject
 */
router.get("/get-by-subject/:subjectId", authenticateToken, bookController.getBooksBySubjectId);

/**
 * @swagger
 * /api/v1/library_book/update/{id}:
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
router.put("/update/:id", authenticateToken, bookController.updateBook);

/**
 * @swagger
 * /api/v1/library_book/delete/{id}:
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
 *     responses:
 *       200:
 *         description: Book deleted
 */
router.delete("/delete/:id", authenticateToken, bookController.deleteBook);

/**
 * @swagger
 * /api/v1/library_book/{bookId}/like:
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *             properties:
 *               studentId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book liked
 */
router.post("/:bookId/like", authenticateToken, bookController.likeBook);

module.exports = router;
