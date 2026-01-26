#!/bin/bash

echo "Ensuring controller variable consistency..."

for router in routers/*.js; do
    if [[ ! "$router" == *backup* ]] && [[ ! "$router" == *temp* ]] && [[ ! "$router" == *fixed* ]]; then
        router_name=$(basename "$router" .js)
        echo "Checking $router_name..."
        
        # Get the actual controller variable from import
        import_line=$(grep 'require("\.\./controllers/' "$router" | head -1)
        
        if [ ! -z "$import_line" ]; then
            # Extract variable name from import (e.g., "const topicController =")
            import_var=$(echo "$import_line" | grep -o 'const [a-zA-Z_]* =' | sed 's/const //' | sed 's/ =//')
            
            if [ ! -z "$import_var" ]; then
                # Find what's actually used in router.xxx lines
                used_vars=$(grep "router\." "$router" | grep -o '[a-zA-Z_]*Controller\.[a-zA-Z_]*' | cut -d. -f1 | sort -u)
                
                if [ ! -z "$used_vars" ]; then
                    for used_var in $used_vars; do
                        if [ "$used_var" != "$import_var" ]; then
                            echo "  ⚠️  Mismatch: Import uses '$import_var' but routes use '$used_var'"
                            echo "  Fixing: Replacing '$used_var' with '$import_var'"
                            sed -i "s/$usedVar/$import_var/g" "$router"
                            sed -i "s/$used_var/$import_var/g" "$router"
                            echo "  ✅ Fixed"
                        fi
                    done
                fi
            fi
        fi
    fi
done

echo "✅ Controller variables fixed"
