const fs = require('fs');

console.log('Updating Swagger tags configuration...');

const swaggerContent = `const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Toto Academy Backend API",
      version: "1.0.0",
      description: "API documentation for Toto Academy Backend",
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
      { name: "Chat", description: "Chat system" },
      { name: "Content", description: "Content system management" },
      { name: "Comment", description: "Comment management" },
      { name: "Dashboard", description: "Dashboard management" },
      { name: "Progress", description: "Student progress tracking" },
      { name: "Banner", description: "Home banner management" },
      { name: "Message", description: "Message community management" },
      { name: "Record", description: "Record exam management" }
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
console.log('âœ… Swagger tags updated with proper descriptions');
