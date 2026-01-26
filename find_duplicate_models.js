const fs = require('fs');
const path = require('path');

console.log("=== CHECKING FOR DUPLICATE MODEL NAMES ===");

const modelsDir = './models';
const files = fs.readdirSync(modelsDir);
const modelMap = new Map();

files.forEach(file => {
  if (file.endsWith('.js')) {
    const content = fs.readFileSync(path.join(modelsDir, file), 'utf8');
    const modelRegex = /mongoose\.model\(['"]([^'"]+)['"]/g;
    let match;
    
    while ((match = modelRegex.exec(content)) !== null) {
      const modelName = match[1];
      if (modelMap.has(modelName)) {
        console.log(`❌ DUPLICATE: Model "${modelName}" defined in:`);
        console.log(`   - ${modelMap.get(modelName)}`);
        console.log(`   - ${file}`);
      } else {
        modelMap.set(modelName, file);
      }
    }
  }
});

console.log(`\n✅ Total unique models: ${modelMap.size}`);
console.log("Model names:");
modelMap.forEach((file, model) => {
  console.log(`  - ${model} (${file})`);
});
