#!/bin/bash

# Directory containing React files (default is current directory)
DIR="."

# Function to check if file already has 'use client'
has_use_client() {
    grep -q "^'use client';" "$1" || grep -q "^\"use client\";" "$1"
}

# Function to add 'use client' to a file
add_use_client() {
    local file="$1"
    # Create a temporary file
    temp_file=$(mktemp)
    
    # Add 'use client' and original content to temp file
    echo "'use client';" > "$temp_file"
    echo "" >> "$temp_file"  # Add blank line after directive
    cat "$file" >> "$temp_file"
    
    # Replace original file with temp file
    mv "$temp_file" "$file"
    echo "Added 'use client' to $file"
}

# Main script
echo "Adding 'use client' directive to React files..."

# Find all .js, .jsx, .tsx files recursively
find "$DIR" -type f \( -name "*.js" -o -name "*.jsx" -o -name "*.tsx" \) | while read -r file; do
    # Skip files in node_modules and .next directories
    if [[ "$file" != *"node_modules"* ]] && [[ "$file" != *".next"* ]]; then
        # Check if file contains React imports or exports
        if grep -q "import.*react" "$file" || grep -q "export.*default" "$file"; then
            if ! has_use_client "$file"; then
                add_use_client "$file"
            else
                echo "Skipping $file - already has 'use client' directive"
            fi
        else
            echo "Skipping $file - not a React component"
        fi
    fi
done

echo "Done!"
