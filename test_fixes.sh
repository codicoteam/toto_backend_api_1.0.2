#!/bin/bash

echo "í·ª Testing fixes..."

# 1. Check .env file
echo "1. Checking .env file..."
if [ -f ".env" ]; then
    if grep -q "DATABASE_URL=" .env; then
        echo "   âœ… DATABASE_URL found in .env"
    else
        echo "   âŒ DATABASE_URL not found in .env"
        echo "DATABASE_URL=mongodb://localhost:27017/toto_academy" >> .env
        echo "   âœ… Added DATABASE_URL to .env"
    fi
else
    echo "   âŒ .env file not found"
    cat > .env << ENVFILE
DATABASE_URL=mongodb://localhost:27017/toto_academy
PORT=3000
JWT_SECRET=toto_academy_2025
JWT_EXPIRES_IN=96h
ENVFILE
    echo "   âœ… Created .env file"
fi

# 2. Check key router files
echo "2. Checking key router files..."
key_routers=("subject_router.js" "topic_in_subject.js" "exam_router.js" "library_book_router.js")
for router in "${key_routers[@]}"; do
    if [ -f "routers/$router" ]; then
        if grep -q "require(\"../controllers/" "routers/$router"; then
            echo "   âœ… $router uses controllers"
        else
            echo "   âŒ $router doesn't use controllers"
        fi
    else
        echo "   âŒ $router not found"
    fi
done

# 3. Check Swagger syntax
echo "3. Checking Swagger syntax..."
if node -c "routers/library_book_router.js" 2>/dev/null; then
    echo "   âœ… library_book_router.js has valid syntax"
else
    echo "   âŒ library_book_router.js has syntax errors"
fi

echo ""
echo "í¾¯ Ready to start server? Run: npm start"
echo "í³š Swagger UI: http://localhost:3000/api-docs"
