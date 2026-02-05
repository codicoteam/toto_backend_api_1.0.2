const express = require("express");
const router = express.Router();
const teacherController = require("../controllers/teacher_controller");
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * tags:
 *   name: Teacher
 *   description: Teacher management endpoints
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


/**
 * @swagger
 * /api/v1/teacher/registerTeacher:
 *   post:
 *     tags: [Teacher]
 *     summary: registerTeacher
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
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

router.post("/registerTeacher", authenticateToken, teacherController.registerTeacher);

/**
 * @swagger
 * /api/v1/teacher/loginTeacher:
 *   post:
 *     tags: [Teacher]
 *     summary: loginTeacher
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
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

router.post("/loginTeacher", authenticateToken, teacherController.loginTeacher);

/**
 * @swagger
 * /api/v1/teacher/:
 *   get:
 *     tags: [Teacher]
 *     summary: Get all Teacher records
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

router.get("/", authenticateToken, teacherController.getAllTeachers);

/**
 * @swagger
 * /api/v1/teacher/{id}:
 *   get:
 *     tags: [Teacher]
 *     summary: Get Teacher by ID
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
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

router.get("/:id", authenticateToken, teacherController.getTeacherById);

/**
 * @swagger
 * /api/v1/teacher/{id}:
 *   put:
 *     tags: [Teacher]
 *     summary: Update Teacher
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
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

router.put("/:id", authenticateToken, teacherController.updateTeacher);

/**
 * @swagger
 * /api/v1/teacher/{id}:
 *   delete:
 *     tags: [Teacher]
 *     summary: Delete Teacher
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
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

router.delete("/:id", authenticateToken, teacherController.deleteTeacher);

/**
 * @swagger
 * /api/v1/teacher/activateTeacher:
 *   post:
 *     tags: [Teacher]
 *     summary: activateTeacher
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
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

router.post("/activateTeacher", authenticateToken, teacherController.activateTeacher);

/**
 * @swagger
 * /api/v1/teacher/forgotPassword:
 *   post:
 *     tags: [Teacher]
 *     summary: forgotPassword
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
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

router.post("/forgotPassword", authenticateToken, teacherController.forgotPassword);

/**
 * @swagger
 * /api/v1/teacher/verifyResetOTP:
 *   post:
 *     tags: [Teacher]
 *     summary: verifyResetOTP
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
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

router.post("/verifyResetOTP", authenticateToken, teacherController.verifyResetOTP);

/**
 * @swagger
 * /api/v1/teacher/resetPassword:
 *   post:
 *     tags: [Teacher]
 *     summary: resetPassword
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
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

router.post("/resetPassword", authenticateToken, teacherController.resetPassword);

/**
 * @swagger
 * /api/v1/teacher/TeacherStats:
 *   get:
 *     tags: [Teacher]
 *     summary: getTeacherStats
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

router.get("/TeacherStats", authenticateToken, teacherController.getTeacherStats);

/**
 * @swagger
 * /api/v1/teacher/CurrentTeacher:
 *   get:
 *     tags: [Teacher]
 *     summary: getCurrentTeacher
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

router.get("/CurrentTeacher", authenticateToken, teacherController.getCurrentTeacher);

/**
 * @swagger
 * /api/v1/teacher/:
 *   get:
 *     tags: [Teacher]
 *     summary: Get all Teacher records
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

router.get("/", authenticateToken, teacherController.getAll);

/**
 * @swagger
 * /api/v1/teacher/{id}:
 *   get:
 *     tags: [Teacher]
 *     summary: Get Teacher by ID
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
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

router.get("/:id", authenticateToken, teacherController.getById);

/**
 * @swagger
 * /api/v1/teacher/:
 *   post:
 *     tags: [Teacher]
 *     summary: Create new Teacher
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
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

router.post("/", authenticateToken, teacherController.create);

/**
 * @swagger
 * /api/v1/teacher/{id}:
 *   put:
 *     tags: [Teacher]
 *     summary: Update Teacher
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
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

router.put("/:id", authenticateToken, teacherController.update);

/**
 * @swagger
 * /api/v1/teacher/{id}:
 *   delete:
 *     tags: [Teacher]
 *     summary: Delete Teacher
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
 *         description: Success
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Server error
 */

router.delete("/:id", authenticateToken, teacherController.delete);

router.get('/', authenticateToken, teacherController.getAll);
router.post('/', authenticateToken, teacherController.create);
module.exports = router;
