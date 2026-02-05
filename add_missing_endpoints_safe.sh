#!/bin/bash
echo "ADDING MISSING ENDPOINTS SAFELY"
echo "================================"

for router in routers/*.js; do
  base=$(basename "$router" _router.js)
  controller="controllers/${base}_controller.js"
  
  if [ ! -f "$controller" ]; then
    continue
  fi
  
  echo ""
  echo "Processing: $base"
  changes=0
  
  # Backup original
  cp "$router" "${router}.backup.tmp"
  
  # Check and add common missing endpoints
  while IFS= read -r method; do
    case "$method" in
      login)
        if ! grep -q "router.post.*login" "$router"; then
          echo "  + Adding login endpoint"
          # Add login endpoint before module.exports
          sed -i "/module.exports = router;/i \\
router.post('/login', ${base}Controller.login);" "$router"
          changes=1
        fi
        ;;
        
      getAll)
        if ! grep -q "router.get.*/\")" "$router" || ! grep -q "router.get(\"/\"" "$router"; then
          echo "  + Adding GET / endpoint"
          sed -i "/module.exports = router;/i \\
router.get('/', authenticateToken, ${base}Controller.getAll);" "$router"
          changes=1
        fi
        ;;
        
      getById)
        if ! grep -q "router.get.*/:id" "$router"; then
          echo "  + Adding GET /:id endpoint"
          sed -i "/module.exports = router;/i \\
router.get('/:id', authenticateToken, ${base}Controller.getById);" "$router"
          changes=1
        fi
        ;;
        
      create)
        if ! grep -q "router.post.*/\")" "$router"; then
          echo "  + Adding POST / endpoint"
          sed -i "/module.exports = router;/i \\
router.post('/', authenticateToken, ${base}Controller.create);" "$router"
          changes=1
        fi
        ;;
        
      update)
        if ! grep -q "router.put.*/:id" "$router"; then
          echo "  + Adding PUT /:id endpoint"
          sed -i "/module.exports = router;/i \\
router.put('/:id', authenticateToken, ${base}Controller.update);" "$router"
          changes=1
        fi
        ;;
        
      delete)
        if ! grep -q "router.delete.*/:id" "$router"; then
          echo "  + Adding DELETE /:id endpoint"
          sed -i "/module.exports = router;/i \\
router.delete('/:id', authenticateToken, ${base}Controller.delete);" "$router"
          changes=1
        fi
        ;;
        
      # Add more patterns as needed
      *)
        # Check if it's a getBySomething method
        if [[ "$method" =~ ^getBy([A-Z].*)$ ]]; then
          field=$(echo "${BASH_REMATCH[1]}" | tr '[:upper:]' '[:lower:]')
          if ! grep -q "router.get.*/:${field}" "$router"; then
            echo "  + Adding GET /:${field} endpoint for $method"
            sed -i "/module.exports = router;/i \\
router.get('/:${field}', authenticateToken, ${base}Controller.${method});" "$router"
            changes=1
          fi
        fi
        ;;
    esac
  done < <(grep -o "exports\.[a-zA-Z_]*" "$controller" | sed 's/exports\.//g')
  
  if [ $changes -eq 1 ]; then
    echo "  ✓ Updated $router"
    # Remove backup
    rm "${router}.backup.tmp"
  else
    echo "  ✓ No changes needed"
    rm "${router}.backup.tmp"
  fi
done

echo ""
echo "=== COMPLETE ==="
