#!/bin/bash
echo "API ENDPOINT VERIFICATION"
echo "========================="
echo ""

echo "1. Checking server status..."
if curl -s http://localhost:3000 > /dev/null; then
  echo "   ✓ Server is running"
else
  echo "   ✗ Server not responding"
  exit 1
fi

echo ""
echo "2. Testing admin login endpoint..."
curl -X POST http://localhost:3000/api/v1/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test"}' \
  -s 2>/dev/null | python3 -m json.tool 2>/dev/null || \
  curl -X POST http://localhost:3000/api/v1/admin/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"test"}' \
    -s 2>/dev/null

echo ""
echo "3. Testing sample GET endpoints:"
for endpoint in student teacher topic; do
  echo -n "   /api/v1/${endpoint}: "
  curl -s http://localhost:3000/api/v1/${endpoint} | grep -q "success" && echo "✓" || echo "✗"
done

echo ""
echo "4. Swagger UI: http://localhost:3000/api-docs"
echo "   All endpoints should be documented there."
