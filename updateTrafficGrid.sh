val name = "enterthefilename.json"
cd ./updateAssets/updateAssets/trafficGridToCoords/
node index.js
cp result.json ../../public/assets/transit/${name}
