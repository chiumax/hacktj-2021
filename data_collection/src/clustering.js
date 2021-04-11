var turf=require('@turf/turf')
var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('./crashes_2021.geojson', 'utf8'));
var options = {numberOfClusters: 10};
var clustered = turf.clustersKmeans(obj, options);
console.log("bruh")
fs.writeFile("clusters.json",JSON.stringify(clustered),function(err){
    if(err){        
        console.log(err);
    }
});
