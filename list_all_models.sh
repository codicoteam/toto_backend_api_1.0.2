#!/bin/bash

echo "=== ALL MODEL DEFINITIONS ==="
echo ""

for model_file in models/*.js; do
  echo "File: $(basename $model_file)"
  
  # Extract model names
  model_names=$(grep -o "mongoose\.model(['\"][^'\"]*" "$model_file" | sed "s/mongoose\.model(['\"]//" | tr '\n' ', ')
  
  if [ -n "$model_names" ]; then
    echo "  Defines: $model_names"
  else
    echo "  No mongoose.model found"
  fi
  
  echo ""
done

echo "=== POTENTIAL DUPLICATES ==="
echo ""

# Use awk to find duplicates
awk '
BEGIN {
  print "Model Name\tFile"
  print "----------\t----"
}
/mongoose\.model\(["'\''][^"'\'']+/ {
  match($0, /mongoose\.model\(["'\'']([^"'\'']+)/, arr)
  model_name = arr[1]
  filename = FILENAME
  gsub(/^models\//, "", filename)
  
  # Store in array
  if (model_name in files) {
    duplicates[model_name] = duplicates[model_name] ", " filename
  } else {
    files[model_name] = filename
  }
}
END {
  for (model in duplicates) {
    print model "\t" files[model] duplicates[model]
  }
}
' models/*.js
