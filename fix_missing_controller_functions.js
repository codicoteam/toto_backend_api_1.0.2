const fs = require('fs');
const path = require('path');

console.log('Checking and fixing missing controller functions...\n');

// Common controllers that should have basic CRUD
const commonControllers = [
  'chat_controller.js',
  'community_controller.js',
  'dashboard_controller.js',
  'message_community_controller.js',
  'payment_controller.js',
  'record_exam_controller.js',
  'student_topic_progress_controller.js'
];

commonControllers.forEach(controllerFile => {
  const filePath = path.join('./controllers', controllerFile);
  
  if (fs.existsSync(filePath)) {
    console.log(`í´ ${controllerFile}:`);
    
    const content = fs.readFileSync(filePath, 'utf8');
    const baseName = controllerFile.replace('_controller.js', '');
    
    // Check for required functions
    const requiredFuncs = ['getAll', 'getById', 'create', 'update', 'delete'];
    const missingFuncs = [];
    
    requiredFuncs.forEach(func => {
      if (!content.includes(`exports.${func}`)) {
        missingFuncs.push(func);
      }
    });
    
    if (missingFuncs.length > 0) {
      console.log(`  âŒ Missing: ${missingFuncs.join(', ')}`);
      
      // Add missing functions
      let newContent = content + '\n\n// Added for router compatibility\n';
      
      missingFuncs.forEach(func => {
        newContent += `
exports.${func} = async (req, res) => {
  try {
    // TODO: Implement ${func} logic for ${baseName}
    res.status(200).json({
      success: true,
      message: "${func} endpoint for ${baseName} - implement logic",
      data: []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in ${func}",
      error: error.message
    });
  }
};
`;
      });
      
      fs.writeFileSync(filePath, newContent);
      console.log(`  âœ… Added missing functions`);
    } else {
      console.log(`  âœ… All functions present`);
    }
    
    console.log('');
  }
});

console.log('âœ… Controller functions fixed');
