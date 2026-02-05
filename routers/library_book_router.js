const express = require("express");
const router = express.Router();
const library_bookController = require("../controllers/library_book_controller");

/**
 * @swagger
 * tags:
 *   name: Library
 *   description: Library management endpoints
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

const { authenticateToken } = require("../middlewares/auth");

// Basic routes (customize based on actual controller functions)

/**
 * @swagger
 * /api/v1/library:
 *   get:
 *     tags:
 *       - Library
 *     summary: Get all Library records
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get("/", authenticateToken, library_bookController.getAll || library_bookController.getAllLibrary_books);

/**
 * @swagger
 * /api/v1/library/{id}:
 *   get:
 *     tags:
 *       - Library
 *     summary: Get Library by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
router.get("/:id", authenticateToken, library_bookController.getById || library_bookController.getLibrary_bookById);

/**
 * @swagger
 * /api/v1/library:
 *   post:
 *     tags:
 *       - Library
 *     summary: Create new Library
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
 *         description: Created
 *       400:
 *         description: Bad request
 */
router.post("/", authenticateToken, library_bookController.create || library_bookController.createLibrary_book);

/**
 * @swagger
 * /api/v1/library/{id}:
 *   put:
 *     tags:
 *       - Library
 *     summary: Update Library
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
router.put("/:id", authenticateToken, library_bookController.update || library_bookController.updateLibrary_book);

/**
 * @swagger
 * /api/v1/library/{id}:
 *   delete:
 *     tags:
 *       - Library
 *     summary: Delete Library
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
router.delete("/:id", authenticateToken, library_bookController.delete || library_bookController.deleteLibrary_book);

router.get('/', authenticateToken, library_bookController.getAll);
router.post('/', authenticateToken, library_bookController.create);
module.exports = router;
