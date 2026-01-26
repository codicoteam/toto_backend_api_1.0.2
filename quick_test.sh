#!/bin/bash

echo "Ì∫Ä Quick test of the application..."

# 1. Check if .env exists and has DATABASE_URL
if [ -f ".env" ]; then
    echo "‚úÖ .env file exists"
    if grep -q "DATABASE_URL=" .env; then
        echo "‚úÖ DATABASE_URL is set"
    else
        echo "‚ö†Ô∏è  DATABASE_URL not set in .env"
        echo "DATABASE_URL=mongodb://localhost:27017/toto_academy" >> .env
    fi
else
    echo "‚ùå .env file not found. Creating..."
    cat > .env << ENVFILE
DATABASE_URL=mongodb://localhost:27017/toto_academy
PORT=3000
JWT_SECRET=toto_academy_2025
JWT_EXPIRES_IN=96h
ENVFILE
fi

# 2. Check if all routers use controllers
echo -e "\nÌ¥ç Checking routers using controllers..."
problem_routers=()
for router in routers/*.js; do
    if grep -q "require(\"../services/" "$router"; then
        problem_routers+=("$(basename $router)")
    fi
done

if [ ${#problem_routers[@]} -eq 0 ]; then
    echo "‚úÖ All routers use controllers"
else
    echo "‚ö†Ô∏è  These routers still use services directly:"
    printf '  - %s\n' "${problem_routers[@]}"
fi

# 3. Check for missing modules
echo -e "\nÌ¥ç Checking for missing modules..."
if node -c server.js 2>/dev/null; then
    echo "‚úÖ Server.js has valid syntax"
else
    echo "‚ùå Server.js has syntax errors"
    node -c server.js
fi

# 4. Try to start MongoDB if not running (Linux/Mac)
echo -e "\nÌ¥ç Checking MongoDB..."
if command -v mongod &> /dev/null; then
    if pgrep -x "mongod" > /dev/null; then
        echo "‚úÖ MongoDB is running"
    else
        echo "‚ö†Ô∏è  MongoDB is not running"
        echo "   Start MongoDB with: sudo service mongod start"
        echo "   Or install MongoDB if not installed"
    fi
else
    echo "‚ö†Ô∏è  MongoDB command not found"
    echo "   Install MongoDB or use a cloud database (MongoDB Atlas)"
fi

echo -e "\nÌ≥ã Next steps:"
echo "1. Make sure MongoDB is running"
echo "2. Update DATABASE_URL in .env if using cloud database"
echo "3. Run: npm start"
echo "4. Visit: http://localhost:3000/api-docs"
