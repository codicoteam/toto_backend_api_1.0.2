const fs = require('fs');

console.log('Updating swagger.js includes...');

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
      { name: "Admin", description: "Admin management" },
      { name: "Student", description: "Student management" },
      { name: "Teacher", description: "Teacher management" },
      { name: "Subject", description: "Subject management" },
      { name: "Topic Content", description: "Topic content management" },
      { name: "Exam", description: "Exam management" },
      { name: "Library", description: "Library book management" },
      { name: "Wallet", description: "Wallet and transactions" },
      { name: "Payment", description: "Payment management" },
      { name: "Community", description: "Community management" },
      { name: "Chat", description: "Chat system" },
      { name: "Authentication", description: "Authentication endpoints" }
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
    "./routers/topic_content_router.js",
    "./routers/exam_router.js",
    "./routers/library_book_router.js",
    "./routers/wallet_router.js",
    "./routers/payment_router.js",
    "./routers/community_router.js",
    "./routers/admin_student_chat_router.js"
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
console.log('âœ… Swagger configuration updated with all routers');
