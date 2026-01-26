const fs = require('fs');

console.log('Updating Swagger tags for better display...');

const swaggerContent = `const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Toto Academy Backend API",
      version: "1.0.0",
      description: "Complete API documentation for Toto Academy with all endpoints",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    tags: [
      { name: "Admin", description: "Admin user management" },
      { name: "Student", description: "Student management" },
      { name: "Teacher", description: "Teacher management" },
      { name: "Subject", description: "Subject/course management" },
      { name: "Topic", description: "Topic within subjects" },
      { name: "Topic Content", description: "Content for topics (lessons, materials)" },
      { name: "Exam", description: "Examination management" },
      { name: "Library", description: "Library and resource management" },
      { name: "Wallet", description: "Wallet and payment transactions" },
      { name: "Payment", description: "Payment processing" },
      { name: "Community", description: "Community and forum features" },
      { name: "Chat", description: "Messaging and chat system" },
      { name: "Content System", description: "Content management system" },
      { name: "Comment", description: "Comment management" },
      { name: "Comment Topic", description: "Comments on topics" },
      { name: "Lesson Questions", description: "End of lesson questions" },
      { name: "Message", description: "Community messages" },
      { name: "Record Exam", description: "Exam attempt records" },
      { name: "Progress", description: "Student progress tracking" },
      { name: "Banner", description: "Home page banners" },
      { name: "Dashboard", description: "Dashboard and analytics" }
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
console.log('âœ… Swagger tags updated with better descriptions');
