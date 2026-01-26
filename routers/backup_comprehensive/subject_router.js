const router = express.Router();
const express = require("express");
const subjectController = require("../controllers/subject_controller");
const { authenticateToken } = require("../middlewares/auth");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * /api/v1/subject:
 *   get:
 *     summary: Get all subject
 *     tags: [Subject]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of subject
 */

router.get("/", authenticateToken, subjectController.getAll);

router.get("/", authenticateToken, subjectController.getAllSubjects);
router.get("/:id", authenticateToken, subjectController.getSubjectById);
router.post("/", authenticateToken, subjectController.createSubject);
router.put("/:id", authenticateToken, subjectController.updateSubject);
router.delete("/:id", authenticateToken, subjectController.deleteSubject);

module.exports = router;