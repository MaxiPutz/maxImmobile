#!/bin/bash

# Navigate to the directory
cd ./updateAssets/fetchWillhabenImmo/

# Run the Node.js script
node index.js

# Copy the result to the target location
cp result.json ../../public/assets/input.json

# Get the current date in European format (DD-MM-YYYY)
europeanDate=$(date +'%d-%m-%Y')

# Create the zip file with the result
zip ../../backup/willHabenimmo_${europeanDate}.zip result.json

# Print success message
echo "Update complete and backup created: willHabenimmo_${europeanDate}.zip"
