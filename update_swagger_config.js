const fs = require('fs');
const path = require('path');

console.log('Updating Swagger configuration...\n');

const routersDir = './routers';
const routerFiles = fs.readdirSync(routersDir)
  .filter(f => f.endsWith('.js') && !f.includes('backup') && !f.includes('temp'))
  .sort();

console.log('Found router files:');
routerFiles.forEach(file => console.log(`  - ${file}`));

// Create new swagger.js with only proper routers
const swaggerContent = `const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Toto Academy Backend API",
      version: "1.0.0",
      description: "API documentation for Toto Academy",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [
    "./routers/admin_router.js",
    "./routers/student_router.js",
    "./routers/teacher_router.js",
    "./routers/subject_router.js",
    "./routers/exam_router.js",
    "./routers/library_book_router.js",
    "./routers/wallet_router.js",
    "./routers/payment_router.js"
  ],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app, port) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(\`í³š Swagger docs available at http://localhost:\${port}/api-docs\`);
}

module.exports = swaggerDocs;
`;

fs.writeFileSync('./swagger.js', swaggerContent);
console.log('\nâœ… Swagger configuration updated!');
console.log('í±‰ Only main routers are now included in documentation.');
