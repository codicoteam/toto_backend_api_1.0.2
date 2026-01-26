const fs = require('fs');
const path = require('path');

console.log('Verifying controller functions for empty-looking routers...\n');

// Map routers to their controllers
const routerControllerMap = {
  'admin_router.js': 'admin_controller.js',
  'student_router.js': 'student_controller.js',
  'teacher_router.js': 'teacher_controller.js',
  'exam_router.js': 'exam_controller.js',
  'library_book_router.js': 'library_book_controller.js'
};

Object.entries(routerControllerMap).forEach(([routerFile, controllerFile]) => {
  console.log(`Ì≥Ñ ${routerFile} -> ${controllerFile}:`);
  
  const controllerPath = path.join('./controllers', controllerFile);
  
  if (fs.existsSync(controllerPath)) {
    const content = fs.readFileSync(controllerPath, 'utf8');
    
    // Check for getAll function
    if (content.includes('exports.getAll')) {
      console.log('  ‚úÖ Has getAll function');
    } else if (content.includes('exports.getAllTeachers') || 
               content.includes('exports.getAllStudents') ||
               content.includes('exports.getAllAdmins') ||
               content.includes('exports.getAllExams') ||
               content.includes('exports.getAllBooks')) {
      console.log('  ‚úÖ Has specific getAll function');
    } else {
      console.log('  ‚ùå Missing getAll function');
      
      // Add getAll function if missing
      const funcMatch = content.match(/exports\.getAll([A-Z][a-zA-Z]*)/);
      if (funcMatch) {
        console.log(`  Found: exports.${funcMatch[0]}, adding alias...`);
        
        // Add alias
        fs.appendFileSync(controllerPath, `\n\n// Alias for router compatibility\nexports.getAll = exports.${funcMatch[0]};\n`);
        console.log('  ‚úÖ Added getAll alias');
      }
    }
  } else {
    console.log(`  ‚ùå Controller file not found: ${controllerFile}`);
  }
  
  console.log('');
});
