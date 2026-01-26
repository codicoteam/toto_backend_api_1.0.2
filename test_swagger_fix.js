const fs = require('fs');
const path = require('path');

console.log('Testing Swagger fixes...\n');

// Check key routers
const keyRouters = [
  'admin_router.js',
  'student_router.js', 
  'teacher_router.js',
  'exam_router.js',
  'library_book_router.js'
];

let allGood = true;

keyRouters.forEach(file => {
  const filePath = path.join('./routers', file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  console.log(`Ì≥Ñ ${file}:`);
  
  // Check 1: Has @swagger blocks
  const hasSwagger = content.includes('@swagger');
  console.log(`  ${hasSwagger ? '‚úÖ' : '‚ùå'} Has @swagger blocks`);
  
  // Check 2: Has route definitions
  const hasRoutes = /router\.[a-zA-Z]*\(/.test(content);
  console.log(`  ${hasRoutes ? '‚úÖ' : '‚ùå'} Has route definitions`);
  
  // Check 3: Has GET endpoint
  const hasGetEndpoint = /router\.get\(/.test(content);
  console.log(`  ${hasGetEndpoint ? '‚úÖ' : '‚ùå'} Has GET endpoint`);
  
  if (!hasSwagger || !hasRoutes || !hasGetEndpoint) {
    allGood = false;
  }
  
  console.log('');
});

if (allGood) {
  console.log('‚úÖ All key routers have proper documentation and routes!');
  console.log('\nÌ±â Restart the server to see changes:');
  console.log('   npm start');
} else {
  console.log('‚ùå Some routers still need fixes');
}
