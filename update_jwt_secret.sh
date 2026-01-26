#!/bin/bash

echo "Ì¥ê Generating new JWT secret..."

# Generate a strong random secret (64 characters)
NEW_SECRET=$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))" 2>/dev/null)

if [ -z "$NEW_SECRET" ]; then
    # Fallback method if node fails
    NEW_SECRET=$(openssl rand -hex 64 2>/dev/null || head -c 64 /dev/urandom | base64 | tr -dc 'a-zA-Z0-9' | head -c 64)
fi

if [ -z "$NEW_SECRET" ]; then
    echo "‚ùå Failed to generate JWT secret"
    echo "‚ö†Ô∏è  Please manually create a strong secret (64 random characters)"
    exit 1
fi

echo "‚úÖ Generated JWT secret: ${NEW_SECRET:0:10}..."

# Update .env file
if [ -f .env ]; then
    # Check if JWT_SECRET already exists
    if grep -q "JWT_SECRET=" .env; then
        # Replace existing JWT_SECRET
        sed -i "s|JWT_SECRET=.*|JWT_SECRET=${NEW_SECRET}|" .env
        echo "‚úÖ Updated existing JWT_SECRET in .env"
    else
        # Add JWT_SECRET after PORT line
        sed -i "/^PORT=/a JWT_SECRET=${NEW_SECRET}" .env
        echo "‚úÖ Added JWT_SECRET to .env"
    fi
    
    # Show the updated line
    echo "Ì≥ù JWT_SECRET line in .env:"
    grep "JWT_SECRET" .env
else
    echo "‚ùå .env file not found"
    echo "Creating .env with JWT_SECRET..."
    echo "JWT_SECRET=${NEW_SECRET}" > .env
fi

echo ""
echo "‚ö†Ô∏è  IMPORTANT: Keep this secret secure!"
echo "   - Never commit .env to git"
echo "   - Use different secrets for development and production"
echo "   - Update the JWT_SECRET in Render dashboard for production"
