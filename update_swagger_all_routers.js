const fs = require('fs');

console.log('Creating Swagger config with ALL routers...');

// Get all router files
const routersDir = './routers';
const routerFiles = fs.readdirSync(routersDir)
  .filter(f => f.endsWith('.js') && !f.includes('backup') && !f.includes('temp') && !f.includes('fixed'))
  .sort();

console.log(`Found ${routerFiles.length} routers to include`);

const swaggerContent = `const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Toto Academy Backend API",
      version: "1.0.0",
      description: "Complete API documentation for Toto Academy",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    tags: [
      { name: "Admin", description: "Admin management endpoints" },
      { name: "Student", description: "Student management endpoints" },
      { name: "Teacher", description: "Teacher management endpoints" },
      { name: "Subject", description: "Subject management endpoints" },
      { name: "Topic", description: "Topic management" },
      { name: "Topic Content", description: "Topic content management" },
      { name: "Exam", description: "Exam management endpoints" },
      { name: "Library", description: "Library book management" },
      { name: "Wallet", description: "Wallet and transactions" },
      { name: "Payment", description: "Payment management" },
      { name: "Community", description: "Community management" },
      { name: "Chat", description: "Chat system management" },
      { name: "Content System", description: "Content system management" },
      { name: "Comment", description: "Comment management" },
      { name: "Dashboard", description: "Dashboard management" },
      { name: "Progress", description: "Student progress tracking" },
      { name: "Banner", description: "Home banner management" },
      { name: "Message", description: "Message community management" },
      { name: "Record", description: "Record exam management" },
      { name: "Lesson Question", description: "Lesson question management" }
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
  apis: ["./routers/*.js"],
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
console.log('âœ… Swagger config updated to include all routers');
