const fs = require('fs');
const path = require('path');

console.log('Fixing ALL problematic routers...\n');

// List of problematic routers from your output
const problematicRouters = [
  'admin_student_chat_router.js',
  'comment_content_router.js',
  'comment_topic_content_router.js',
  'community_router.js',
  'content_system_router.js',
  'dashboard_router.js',
  'end_lesson_question_router.js',
  'homeBanner_routes.js',
  'message_community_router.js',
  'payment_router.js',
  'record_exam_router.js',
  'student_topic_progress_router.js',
  'subject_router.js',
  'subject_router_fixed.js',
  'topic_in_subject.js',
  'wallet_router.js'
];

// Working routers (keep as is)
const workingRouters = [
  'admin_router.js',
  'exam_router.js',
  'library_book_router.js',
  'student_router.js',
  'teacher_router.js',
  'topic_content_router.js'
];

problematicRouters.forEach(routerFile => {
  const filePath = path.join('./routers', routerFile);
  
  if (!fs.existsSync(filePath)) {
    console.log(`âš ï¸  ${routerFile} not found, skipping`);
    return;
  }
  
  console.log(`í´§ Fixing ${routerFile}...`);
  
  // Read current content
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract important parts
  const imports = content.match(/const.*require.*/g)?.join('\n') || '';
  const controllerMatch = content.match(/const (\w+)Controller = require/);
  const controllerName = controllerMatch ? controllerMatch[1] : 
    routerFile.replace('_router.js', '').replace('.js', '').replace(/^./, c => c.toUpperCase());
  
  // Get route definitions (actual router.get/post/etc.)
  const routeLines = content.split('\n').filter(line => line.includes('router.'));
  
  // Create clean router
  const cleanRouter = `const express = require("express");
const router = express.Router();
${imports}
const { authenticateToken } = require("../middlewares/auth");

/**
 * @swagger
 * /api/v1/${routerFile.replace('_router.js', '').replace('.js', '')}:
 *   get:
 *     summary: Get all ${routerFile.replace('_router.js', '').replace(/_/g, ' ')}
 *     tags: [${routerFile.replace('_router.js', '').replace(/_/g, ' ').replace(/^./, c => c.toUpperCase())}]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of ${routerFile.replace('_router.js', '').replace(/_/g, ' ')}
 */

router.get("/", authenticateToken, ${controllerName}Controller.getAll);

${routeLines.join('\n')}

module.exports = router;`;
  
  // Write back
  fs.writeFileSync(filePath, cleanRouter);
  console.log(`  âœ… Fixed ${routerFile}`);
});

console.log('\nâœ… All problematic routers fixed!');
console.log(`í³Š Fixed: ${problematicRouters.length} routers`);
console.log(`âœ… Working (unchanged): ${workingRouters.length} routers`);
