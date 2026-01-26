const fs = require('fs');

console.log('Restoring full Swagger configuration...');

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
  // Include ALL routers that have proper Swagger documentation
  apis: [
    "./routers/admin_router.js",
    "./routers/student_router.js", 
    "./routers/teacher_router.js",
    "./routers/subject_router.js",
    "./routers/exam_router.js",
    "./routers/library_book_router.js",
    "./routers/wallet_router.js",
    "./routers/payment_router.js",
    "./routers/community_router.js",
    "./routers/admin_student_chat_router.js",
    "./routers/content_system_router.js",
    "./routers/comment_content_router.js",
    "./routers/topic_content_router.js",
    "./routers/topic_in_subject.js",
    "./routers/end_lesson_question_router.js",
    "./routers/comment_topic_content_router.js",
    "./routers/message_community_router.js",
    "./routers/record_exam_router.js",
    "./routers/dashboard_router.js",
    "./routers/student_topic_progress_router.js",
    "./routers/homeBanner_routes.js"
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
console.log('âœ… Full Swagger configuration restored');
console.log('í±‰ All routers are now included');
