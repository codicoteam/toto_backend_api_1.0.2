#!/bin/bash

echo "=== UPDATING server.js WITH ALL ROUTERS ==="
echo ""

# Backup original server.js
cp server.js server.js.backup.$(date +%Y%m%d_%H%M%S)

# Generate import statements
imports=""
routes=""

for router in routers/*_router.js; do
  router_name=$(basename "$router" "_router.js")
  route_path=$(echo "$router_name" | sed -r 's/_/-/g')
  
  imports+="const ${router_name}Router = require('./routers/${router_name}_router');\n"
  routes+="app.use('/api/v1/${route_path}', ${router_name}Router);\n"
done

# Create new server.js content
cat > server.js.new << EOF
const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.js');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Import routers
${imports}

// Use routers
${routes}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
  console.log(\`API Documentation: http://localhost:\${PORT}/api-docs\`);
});
