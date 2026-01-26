const express = require("express");
const router = express.Router();
const libraryBookController = require("../controllers/library_book_controller");
const { authenticateToken, authorizeRoles } = require("../middlewares/auth");

/**
 * @swagger
 *   get:
 *     summary: Get book by ID
 *     tags: [Library Books]
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
 *         description: Book retrieved successfully
 *       404:
 *         description: Book not found
 */
/**
 * @swagger
 * /api/v1/library_book:
 *   get:
 *     summary: Get all library books
 *     tags: [Library]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of library books
 */
router.get("/get/:id", authenticateToken, libraryBookController.getBookById);

/**
 * @swagger

 * tags:
 *   name: Library
 *   description: Library management
 * /api/v1/library_book/update/{id}:
 *   put:
 *     summary: Update book by ID
 *     tags: [Library Books]
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
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               cover_image:
 *                 type: string
 *               isFree:
 *                 type: boolean
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Failed to update book
 *       403:
 *         description: Can only update your own books
 */
/**
 * @swagger
 * /api/v1/library_book:
 *   get:
 *     summary: Get all library books
 *     tags: [Library]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of library books
 */
router.put("/update/:id", authenticateToken, libraryBookController.updateBook);

/**
 * @swagger
 * /api/v1/library_book/delete/{id}:
 *   delete:
 *     summary: Delete book by ID
 *     tags: [Library Books]
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
 *         description: Book deleted successfully
 *       500:
 *         description: Failed to delete book
 */
/**
 * @swagger
 * /api/v1/library_book:
 *   get:
 *     summary: Get all library books
 *     tags: [Library]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of library books
 */
router.delete("/delete/:id", authenticateToken, libraryBookController.deleteBook);

/**
 * @swagger
 * /api/v1/library_book/like/{id}:
 *   post:
 *     summary: Like a book
 *     tags: [Library Books]
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
 *         description: Book liked successfully
 *       400:
 *         description: Failed to like book
 *       403:
 *         description: Only students can like books
 */
/**
 * @swagger
 * /api/v1/library_book:
 *   get:
 *     summary: Get all library books
 *     tags: [Library]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of library books
 */
router.post("/like/:id", authenticateToken, libraryBookController.likeBook);

/**
 * @swagger
 * /api/v1/library_book/unlike/{id}:
 *   delete:
 *     summary: Unlike a book
 *     tags: [Library Books]
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
 *         description: Book unliked successfully
 *       400:
 *         description: Failed to unlike book
 *       403:
 *         description: Only students can unlike books
 */
/**
 * @swagger
 * /api/v1/library_book:
 *   get:
 *     summary: Get all library books
 *     tags: [Library]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of library books
 */
router.delete("/unlike/:id", authenticateToken, libraryBookController.unlikeBook);

/**
 * @swagger
 * /api/v1/library_book/by-teacher/{teacherId}:
 *   get:
 *     summary: Get books by teacher ID
 *     tags: [Library Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teacherId
 *         required: true
 *         schema:
 *           type: string
 *         description: Teacher ID
 *     responses:
 *       200:
 *         description: Books retrieved successfully
 *       404:
 *         description: No books found for this teacher
 */
/**
 * @swagger
 * /api/v1/library_book:
 *   get:
 *     summary: Get all library books
 *     tags: [Library]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of library books
 */
router.get("/by-teacher/:teacherId", authenticateToken, libraryBookController.getBooksByTeacherId);

/**
 * @swagger
 * /api/v1/library_book/popular:
 *   get:
 *     summary: Get popular books
 *     tags: [Library Books]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of books to return default 10
 *     responses:
 *       200:
 *         description: Popular books retrieved successfully
 *       500:
 *         description: Failed to retrieve popular books
 */
/**
 * @swagger
 * /api/v1/library_book:
 *   get:
 *     summary: Get all library books
 *     tags: [Library]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of library books
 */
router.get("/popular", libraryBookController.getPopularBooks);

/**
 * @swagger
 * /api/v1/library_book/search:
 *   get:
 *     summary: Search books
 *     tags: [Library Books]
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         description: Search query
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         description: Filter by subject
 *       - in: query
 *         name: level
 *         schema:
 *           type: string
 *           enum: [O Level, A Level, Others]
 *         description: Filter by level
 *       - in: query
 *         name: file_type
 *         schema:
 *           type: string
 *           enum: [video, audio, document]
 *         description: Filter by file type
 *     responses:
 *       200:
 *         description: Books search results
 *       400:
 *         description: Failed to search books
 */
/**
 * @swagger
 * /api/v1/library_book:
 *   get:
 *     summary: Get all library books
 *     tags: [Library]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of library books
 */
router.get("/search", libraryBookController.searchBooks);

/**
 * @swagger
 * /api/v1/library_book/download/{id}:
 *   post:
 *     summary: Increment download count
 *     tags: [Library Books]
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
 *         description: Download count updated
 *       400:
 *         description: Failed to update download count
 */
/**
 * @swagger
 * /api/v1/library_book:
 *   get:
 *     summary: Get all library books
 *     tags: [Library]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of library books
 */
router.post("/download/:id", authenticateToken, libraryBookController.incrementDownloadCount);

module.exports = router;
