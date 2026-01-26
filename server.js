const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger.js');
const cors = require('cors');
const fs = require('fs');

// Middleware
app.use(cors());
app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Toto Academy API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Root redirect to Swagger
app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

// Load and register ONLY main routers (no temp files)
console.log('Ì≥¶ Loading main routers (excluding temp files)...');

const routerFiles = fs.readdirSync('./routers').filter(file => 
  file.endsWith('.js') && !file.includes('temp_') && !file.includes('.backup')
);

let loaded = 0;
let errors = 0;

routerFiles.forEach(file => {
  const routerName = file.replace('.js', '');
  const apiPath = '/api/v1/' + routerName.replace(/_/g, '-').replace('-router', '');
  
  try {
    const router = require(`./routers/${file}`);
    app.use(apiPath, router);
    console.log(`‚úÖ ${apiPath}`);
    loaded++;
  } catch (error) {
    console.log(`‚ö†Ô∏è  ${apiPath} - ${error.message}`);
    errors++;
    
    // Create a simple placeholder for failed routers
    app.use(apiPath, (req, res) => {
      res.json({
        success: true,
        message: `${routerName.replace('_', ' ')} API endpoint`,
        status: 'Under development',
        note: 'Some dependencies missing'
      });
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Endpoint ${req.originalUrl} not found`,
    availableEndpoints: ['/api-docs', '/health'].concat(
      routerFiles.map(f => '/api/v1/' + f.replace('.js', '').replace(/_/g, '-').replace('-router', ''))
    )
  });
});

// Start server
const PORT = process.env.PORT || 4071;
app.listen(PORT, () => {
  console.log(`\nÌ∫Ä Toto Academy API Server`);
  console.log(`Ì≥ç Port: ${PORT}`);
  console.log(`Ì≥ö Swagger UI: http://localhost:${PORT}/api-docs`);
  console.log(`Ìø• Health: http://localhost:${PORT}/health`);
  console.log(`Ì≥ä Statistics: ${loaded} routers loaded, ${errors} with placeholders`);
  console.log(`\n‚úÖ Server is running successfully!`);
});
