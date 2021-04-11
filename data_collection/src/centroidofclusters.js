var turf=require('@turf/turf')
var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('./clusters.geojson', 'utf8'));



var clusters = []
obj.clusters.geojson.forEach(feature => {
    //if cluster has not been found before, add it to the list of clusters (should be 10 in this case)
    if(!clusters.includes(feature.properties["cluster"].slice(1)))
      clusters.push(feature.properties["cluster"].slice(1))
    clusters.features.push(feature)
  })

//make a new file for each cluster
  clusters.forEach(cluster => {
    var filename = `crashes_${cluster}.geojson`

    var featuresForCluster = master.features.filter(feature => feature.properties["cluster"].slice(0) == cluster)

    var toWrite = {
      type: "FeatureCollection",
      features: []
    }

    toWrite.features = featuresForCluster

    fs.writeFileSync(path.join(outputPath, filename), JSON.stringify(toWrite))
  })

//append the centroid of each cluster to centroids
var centroids = []
for(feature in clusters){
    centroids.push(turf.centroid(feature))
}
//write centroids to a json
fs.writeFile("centroids.json",JSON.stringify(centroids),function(err){
    if(err){        
        console.log(err);
    }
});