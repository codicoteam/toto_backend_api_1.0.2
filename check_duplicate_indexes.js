const fs = require('fs');
const path = require('path');

const modelsDir = path.join(__dirname, 'models');
const files = fs.readdirSync(modelsDir);

console.log('Ì¥ç Checking for duplicate indexes in models...');

files.forEach(file => {
    if (file.endsWith('.js')) {
        const filePath = path.join(modelsDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Check for common duplicate index patterns
        if (content.includes('index: true') && content.includes('schema.index(')) {
            console.log(`‚ö†Ô∏è  ${file} may have duplicate indexes`);
            
            // Check for specific field patterns
            const emailIndex = (content.match(/email.*index/g) || []).length;
            const studentIndex = (content.match(/student.*index/g) || []).length;
            const teacherIndex = (content.match(/teacher.*index/g) || []).length;
            const nameIndex = (content.match(/name.*index/g) || []).length;
            
            if (emailIndex > 1) console.log(`   - email index appears ${emailIndex} times`);
            if (studentIndex > 1) console.log(`   - student index appears ${studentIndex} times`);
            if (teacherIndex > 1) console.log(`   - teacher index appears ${teacherIndex} times`);
            if (nameIndex > 1) console.log(`   - name index appears ${nameIndex} times`);
        }
    }
});

console.log('\nÌ≥ù To fix duplicate indexes:');
console.log('1. In your model files, remove either "index: true" from the field definition');
console.log('2. OR remove the "schema.index()" call at the bottom of the file');
console.log('3. Keep only one method of defining indexes per field');
