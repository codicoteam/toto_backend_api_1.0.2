const fs = require('fs');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

console.log('Testing each router individually for Swagger errors...\n');

const routersDir = './routers';
const files = fs.readdirSync(routersDir)
  .filter(f => f.endsWith('.js') && !f.includes('backup') && !f.includes('temp'))
  .sort();

const goodRouters = [];
const badRouters = [];

files.forEach((file, index) => {
  process.stdout.write(`Testing ${file}... `);
  
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Test",
        version: "1.0.0",
      },
    },
    apis: [path.join(routersDir, file)],
  };
  
  try {
    const spec = swaggerJsdoc(options);
    console.log('âœ… OK');
    goodRouters.push(file);
  } catch (error) {
    console.log(`âŒ ERROR: ${error.message.split('\n')[0]}`);
    badRouters.push({ file, error: error.message });
  }
});

console.log('\n' + '='.repeat(50));
console.log(`âœ… Good routers: ${goodRouters.length}`);
console.log(`âŒ Bad routers: ${badRouters.length}`);

if (badRouters.length > 0) {
  console.log('\nProblematic routers:');
  badRouters.forEach(({ file, error }) => {
    console.log(`\ní³„ ${file}:`);
    console.log(`   Error: ${error.split('\n')[0]}`);
    
    // Show the problematic file content
    const content = fs.readFileSync(path.join(routersDir, file), 'utf8');
    const lines = content.split('\n');
    
    // Find lines with potential YAML issues
    lines.forEach((line, lineNum) => {
      if (line.includes('*   description:') && line.includes(':')) {
        // Check for description with colon that might break YAML
        const afterColon = line.split(':')[1];
        if (afterColon && afterColon.includes(':')) {
          console.log(`   Line ${lineNum + 1}: ${line.trim()}`);
        }
      }
    });
  });
}
