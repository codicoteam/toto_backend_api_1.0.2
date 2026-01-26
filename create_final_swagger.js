const fs = require('fs');

console.log('Creating final Swagger configuration...');

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
    tags: [
      { name: "Admin", description: "Admin management" },
      { name: "Student", description: "Student management" },
      { name: "Teacher", description: "Teacher management" },
      { name: "Subject", description: "Subject management" },
      { name: "Exam", description: "Exam management" },
      { name: "Library", description: "Library management" }
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
  // Only include routers that are known to work
  apis: [
    "./routers/subject_router.js",
    "./routers/admin_router.js",
    "./routers/student_router.js",
    "./routers/teacher_router.js",
    "./routers/exam_router.js",
    "./routers/library_book_router.js"
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
console.log('âœ… Created clean swagger.js with verified routers');
