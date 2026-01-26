const swaggerJsdoc = require("swagger-jsdoc");

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
        url: "http://localhost:4071",
        description: "Local development server",
      },
      {
        url: "https://toto-backend-api-1-0-2.onrender.com",
        description: "Production server",
      },
    ],
    tags: [
      { name: "Admin", description: "Admin user management" },
      { name: "Student", description: "Student management" },
      { name: "Teacher", description: "Teacher management" },
      { name: "Subject", description: "Subject/course management" },
      { name: "Topic", description: "Topic within subjects" },
      { name: "TopicContent", description: "Content for topics (lessons, materials)" },
      { name: "TopicInSubject", description: "Topic in subject management" },
      { name: "Exam", description: "Examination management" },
      { name: "Library", description: "Library and resource management" },
      { name: "Wallet", description: "Wallet and payment transactions" },
      { name: "Payment", description: "Payment processing" },
      { name: "Community", description: "Community and forum features" },
      { name: "Chat", description: "Messaging and chat system" },
      { name: "ContentSystem", description: "Content management system" },
      { name: "Comment", description: "Comment management" },
      { name: "CommentTopic", description: "Comments on topics" },
      { name: "LessonQuestions", description: "End of lesson questions" },
      { name: "Message", description: "Community messages" },
      { name: "RecordExam", description: "Exam attempt records" },
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
      schemas: {
        SuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string" },
            data: { type: "object" }
          }
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string" },
            error: { type: "string" }
          }
        }
      }
    },
  },
  apis: ["./routers/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
