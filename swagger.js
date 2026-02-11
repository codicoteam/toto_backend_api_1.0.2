const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Toto Academy Backend API',
      version: '1.0.0',
      description: 'Educational Platform API Documentation',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
    tags: [
      { name: 'Admin', description: 'Administrator operations' },
      { name: 'Student', description: 'Student management' },
      { name: 'Teacher', description: 'Teacher operations' },
      { name: 'ContentSystem', description: 'Content system management' },
      { name: 'Topic', description: 'Topic management' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./routers/*.js'],
};

const specs = swaggerJsdoc(options);
module.exports = specs;
