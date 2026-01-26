const router = express.Router();
const express = require("express");
const recordExamController = require("../controllers/recordExam_controller");
const { authenticateToken } = require("../middlewares/auth");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * /api/v1/record_exam:
 *   get:
 *     summary: Get all record exam
 *     tags: [Record exam]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of record exam
 */

router.get("/", authenticateToken, recordExamController.getAll);

router.get("/", authenticateToken, recordExamController.getAll);
router.get("/:id", authenticateToken, recordExamController.getById);
router.post("/", authenticateToken, recordExamController.create);
router.put("/:id", authenticateToken, recordExamController.update);
router.delete("/:id", authenticateToken, recordExamController.delete);

module.exports = router;