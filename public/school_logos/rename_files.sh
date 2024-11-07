#!/bin/bash

# Iterate over all files in the current directory
for file in *; do
    # Only process if it's a regular file
    if [ -f "$file" ]; then
        # Build the new filename by replacing characters
        new_file=$(echo "$file" | sed 's/é/e/g' | sed 's/É/E/g' | sed 's/ô/o/g' | sed "s/'//g")

        # Rename the file if the new name is different from the old name
        if [ "$file" != "$new_file" ]; then
            echo "Renaming '$file' to '$new_file'"
            mv "$file" "$new_file"
        fi
    fi
done

echo "File renaming completed."
