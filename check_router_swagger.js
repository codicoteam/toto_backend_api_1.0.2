const fs = require('fs');
const path = require('path');

console.log('í´ Checking Swagger documentation in routers...\n');

const routersDir = './routers';
const files = fs.readdirSync(routersDir)
  .filter(f => f.endsWith('.js') && !f.includes('backup') && !f.includes('temp') && !f.includes('fixed'))
  .sort();

const issues = [];
const goodRouters = [];

files.forEach(file => {
  const filePath = path.join(routersDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  console.log(`í³„ ${file}:`);
  
  // Check for @swagger blocks
  const swaggerBlocks = (content.match(/@swagger/g) || []).length;
  
  if (swaggerBlocks === 0) {
    console.log('  âŒ No @swagger blocks found');
    issues.push({ file, issue: 'No @swagger blocks' });
  } else if (swaggerBlocks === 1) {
    // Check if it's just a tag definition without endpoints
    if (content.includes('tags:') && !content.includes('get:') && !content.includes('post:') && 
        !content.includes('put:') && !content.includes('delete:')) {
      console.log('  âš ï¸  Only has tag definition, no endpoints');
      issues.push({ file, issue: 'Only tags, no endpoints' });
    } else {
      console.log(`  âœ… Has ${swaggerBlocks} @swagger block(s) with endpoints`);
      goodRouters.push(file);
    }
  } else {
    console.log(`  âœ… Has ${swaggerBlocks} @swagger blocks`);
    goodRouters.push(file);
  }
});

console.log('\n' + '='.repeat(50));
console.log(`âœ… Good routers: ${goodRouters.length}/${files.length}`);
console.log(`âš ï¸  Issues found: ${issues.length}`);

if (issues.length > 0) {
  console.log('\nIssues to fix:');
  issues.forEach(({ file, issue }) => {
    console.log(`  - ${file}: ${issue}`);
  });
}
