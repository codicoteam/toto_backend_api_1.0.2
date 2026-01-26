const fs = require('fs');
const path = require('path');

const routersDir = path.join(__dirname, 'routers');
const files = fs.readdirSync(routersDir);

const swaggerTemplate = (routerName) => `
/**
 * @swagger
 * tags:
 *   name: ${routerName.replace('_router', '').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
 *   description: ${routerName.replace('_router', '').replace(/_/g, ' ')} management endpoints
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
`;

files.forEach(file => {
  if (file.endsWith('_router.js')) {
    const filePath = path.join(routersDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check if file already has Swagger
    if (!content.includes('@swagger')) {
      const routerName = file.replace('.js', '');
      const newContent = swaggerTemplate(routerName) + content;
      fs.writeFileSync(filePath, newContent);
      console.log(\`‚úÖ Added Swagger to \${file}\`);
    } else {
      console.log(\`‚ÑπÔ∏è  \${file} already has Swagger\`);
    }
  }
});

console.log('Ìæâ All routers updated with Swagger annotations!');
