const fs = require('fs');
const path = require('path');

console.log('Testing router loading order as in server.js...\n');

// Read server.js to get the import order
const serverContent = fs.readFileSync('./server.js', 'utf8');
const lines = serverContent.split('\n');

const routerImports = [];

lines.forEach((line, index) => {
  if (line.includes('require("./routers/')) {
    const match = line.match(/require\("\.\/routers\/([a-zA-Z_]+\.js)"\)/);
    if (match) {
      const routerFile = match[1];
      routerImports.push({
        line: index + 1,
        file: routerFile,
        code: line.trim()
      });
    }
  }
});

console.log(`Found ${routerImports.length} router imports in server.js:\n`);

// Test each router in order
let lastSuccessful = null;
let firstFailure = null;

for (const router of routerImports) {
  console.log(`Line ${router.line}: ${router.file}...`);
  
  try {
    const routerModule = require(`./routers/${router.file}`);
    console.log(`  ‚úÖ Loaded successfully`);
    lastSuccessful = router.file;
  } catch (error) {
    console.log(`  ‚ùå FAILED: ${error.message}`);
    
    if (!firstFailure) {
      firstFailure = {
        file: router.file,
        error: error.message,
        stack: error.stack.split('\n')[0]
      };
    }
    
    // Show more details for the first failure
    if (firstFailure && firstFailure.file === router.file) {
      console.log(`  Error details: ${error.message}`);
      console.log(`  Likely in: ${error.stack.split('\n')[1]}`);
    }
  }
}

console.log('\n' + '='.repeat(50));

if (firstFailure) {
  console.log(`\n‚ùå First failure at: ${firstFailure.file}`);
  console.log(`   Error: ${firstFailure.error}`);
  console.log(`\n‚úÖ Last successful: ${lastSuccessful || 'none'}`);
  
  console.log('\nÌ≥ã Next steps:');
  console.log('1. Check the controller for this router');
  console.log('2. Make sure all required functions are exported');
  console.log('3. Check function name spellings');
} else {
  console.log('‚úÖ All routers loaded successfully!');
  console.log('Ì±â The server should start without issues.');
}
