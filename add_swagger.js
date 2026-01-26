const fs = require('fs');
const path = require('path');

const routersDir = path.join(__dirname, 'routers');
const files = fs.readdirSync(routersDir);

console.log('Ì≥ö Adding Swagger annotations to all router files...');

files.forEach(file => {
  if (file.endsWith('_router.js') || file.endsWith('_routes.js') || file.endsWith('.js')) {
    const filePath = path.join(routersDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if file already has Swagger
    if (!content.includes('@swagger')) {
      // Extract router name from filename
      const routerName = file
        .replace('.js', '')
        .replace(/_/g, ' ')
        .replace(/(^|\s)\w/g, l => l.toUpperCase())
        .replace(' Router', '')
        .replace(' Routes', '');
      
      // Add Swagger tags at the top
      const swaggerHeader = `/**
 * @swagger
 * tags:
 *   name: ${routerName}
 *   description: ${routerName} management endpoints
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */\n\n`;
      
      const newContent = swaggerHeader + content;
      fs.writeFileSync(filePath, newContent);
      console.log(`‚úÖ Added Swagger to ${file}`);
    } else {
      console.log(`‚ÑπÔ∏è  ${file} already has Swagger`);
    }
  }
});

console.log('Ìæâ All routers updated with basic Swagger annotations!');
console.log('Ì≥ù Note: You may need to add detailed Swagger documentation for each endpoint.');
