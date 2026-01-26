const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger.js');

app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Test route
app.get('/api/v1/test', (req, res) => {
  res.json({ success: true, message: 'Test API working' });
});

const PORT = 4072;
app.listen(PORT, () => {
  console.log(`íº€ Test server running on port ${PORT}`);
  console.log(`í³š Swagger: http://localhost:${PORT}/api-docs`);
});
