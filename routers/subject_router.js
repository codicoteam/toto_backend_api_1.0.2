const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subject_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Subject
 *   description: Subject management
 */

/**
 * @swagger
 * /api/v1/subject/create:
 *   post:
 *     tags: [Subject]
 *     summary: Create subject
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subjectName
 *             properties:
 *               subjectName:
 *                 type: string
 *                 example: "Physics"
 *               imageUrl:
 *                 type: string
 *               Level:
 *                 type: string
 *                 example: "A Level"
 *               showSubject:
 *                 type: boolean
 *                 default: true
 *     responses:
 *       201:
 *         description: Subject created
 */
router.post("/create", authenticateToken, subjectController.createSubject);

/**
 * @swagger
 * /api/v1/subject/getall:
 *   get:
 *     tags: [Subject]
 *     summary: Get all subjects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of subjects
 */
router.get("/getall", authenticateToken, subjectController.getAllSubjects);

/**
 * @swagger
 * /api/v1/subject/get/{id}:
 *   get:
 *     tags: [Subject]
 *     summary: Get subject by ID
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
 *         description: Subject details
 */
router.get("/get/:id", authenticateToken, subjectController.getSubjectById);

/**
 * @swagger
 * /api/v1/subject/update/{id}:
 *   put:
 *     tags: [Subject]
 *     summary: Update subject
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
 *             properties:
 *               subjectName:
 *                 type: string
 *               Level:
 *                 type: string
 *               showSubject:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Subject updated
 */
router.put("/update/:id", authenticateToken, subjectController.updateSubject);

/**
 * @swagger
 * /api/v1/subject/delete/{id}:
 *   delete:
 *     tags: [Subject]
 *     summary: Delete subject
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
 *         description: Subject deleted
 */
router.delete("/delete/:id", authenticateToken, subjectController.deleteSubject);

module.exports = router;
