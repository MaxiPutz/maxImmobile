#!/bin/bash
# Set the base directory to ensure paths are correct

echo "cron job starts"
# Navigate to the first directory
cd "./updateAssets/fetchWillhabenImmo/"

# Run the first Node.js script
node index.js


# Navigate back to the base directory
cd "../../"

# Navigate to the second directory
cd "./updateAssets/fetchImmoScout/"

# Run the second Node.js script
node index.js



# Navigate back to the base directory
cd "../../"

cd "./updateAssets/mergeInput/"


## run the nextline to merge willhaben and immoscout
node index.js

cd "../../"

cp ./static/assets/input.json ./staticNewUI/assets/input.json
cp ./static/assets/input.json ./public/assets/input.json
cp -r ./staticNewUI/assets/publicStation ./public/assets/publicStation 

europeanDate=$(date +'%d-%m-%Y')

zip -j backup/willHabenimmo_${europeanDate}.zip "./updateAssets/fetchWillhabenImmo/result.json"
zip -j backup/immoScoummp_${europeanDate}.zip "./updateAssets/fetchImmoScout/result.json"

cp ./updateAssets/fetchImmoScout/result.json ./public/assets/input.json

# Print success message
echo "Update complete and backups created: willHabenimmo_${europeanDate}.zip and source2immo_${europeanDate}.zip"
