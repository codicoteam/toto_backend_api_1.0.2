const fs = require('fs');
const path = require('path');

console.log("=== CHECKING MODELS ===");

const modelsDir = './models';
const models = fs.readdirSync(modelsDir);

// Check for duplicate model names
const modelNames = new Map();

models.forEach(file => {
  if (file.endsWith('.js')) {
    const content = fs.readFileSync(path.join(modelsDir, file), 'utf8');
    const match = content.match(/mongoose\.model\('([^']+)'/);
    if (match) {
      const modelName = match[1];
      if (modelNames.has(modelName)) {
        console.log(`❌ DUPLICATE MODEL NAME: ${modelName}`);
        console.log(`   In files: ${modelNames.get(modelName)} and ${file}`);
      } else {
        modelNames.set(modelName, file);
      }
    }
  }
});

console.log(`✅ Found ${modelNames.size} unique model names`);
console.log("=== CHECKING SERVICES ===");

const servicesDir = './services';
const services = fs.readdirSync(servicesDir);

services.forEach(file => {
  if (file.endsWith('_service.js')) {
    const content = fs.readFileSync(path.join(servicesDir, file), 'utf8');
    const match = content.match(/require\("\.\.\/models\/([^"]+)"\)/);
    if (match) {
      const modelFile = match[1];
      if (!fs.existsSync(path.join(modelsDir, modelFile))) {
        console.log(`❌ Service ${file} imports non-existent model: ${modelFile}`);
      }
    }
  }
});

console.log("✅ Model check complete");
