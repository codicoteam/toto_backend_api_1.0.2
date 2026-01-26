const fs = require('fs');
const path = require('path');

console.log('Final Swagger fix for empty models...\n');

// The issue is that some routers have Swagger tags but the routes don't match the API paths
// Let's check the actual route paths vs Swagger paths

const routerFiles = [
  'admin_router.js',
  'student_router.js',
  'teacher_router.js',
  'exam_router.js',
  'library_book_router.js'
];

routerFiles.forEach(file => {
  const filePath = path.join('./routers', file);
  console.log(`�� ${file}:`);
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract base path from router usage in server.js
  let basePath = '';
  switch(file) {
    case 'admin_router.js': basePath = '/api/v1/admin_route'; break;
    case 'student_router.js': basePath = '/api/v1/student_route'; break;
    case 'teacher_router.js': basePath = '/api/v1/teacher'; break;
    case 'exam_router.js': basePath = '/api/v1/exam'; break;
    case 'library_book_router.js': basePath = '/api/v1/library_book'; break;
  }
  
  // Check if Swagger paths match the actual base path
  const swaggerPaths = content.match(/\/api\/v1\/[^:\s]*/g) || [];
  const uniquePaths = [...new Set(swaggerPaths)];
  
  if (uniquePaths.length > 0) {
    console.log(`  Swagger paths: ${uniquePaths.join(', ')}`);
    
    // Check if root path exists
    const hasRootPath = uniquePaths.some(p => p === basePath || p === `${basePath}/`);
    if (!hasRootPath) {
      console.log(`  ⚠️  Missing root path: ${basePath}`);
      
      // Add a simple GET endpoint at the root
      const newContent = content.replace(
        /(\/\*\*[\s\S]*?\*\/\s*)?router\.get\(/,
        `/**\n * @swagger\n * ${basePath}:\n *   get:\n *     summary: Get all items\n *     tags: [${file.replace('_router.js', '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}]\n *     security:\n *       - bearerAuth: []\n *     responses:\n *       200:\n *         description: List of items\n */\n$&`
      );
      
      fs.writeFileSync(filePath, newContent);
      console.log(`  ✅ Added root path: ${basePath}`);
    }
  } else {
    console.log(`  ⚠️  No Swagger paths found`);
  }
  
  console.log('');
});

console.log('✅ Final Swagger fix applied');
console.log('\n��� The empty models should now show at least a GET endpoint');
