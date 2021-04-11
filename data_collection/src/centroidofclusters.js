var turf=require('@turf/turf')
const fs = require('fs-extra');
const path = require("path");

var obj = JSON.parse(fs.readFileSync('./clusters.geojson', 'utf8'));
const outputPath = path.join(__dirname, "../clusterdata");

fs.ensureDirSync(outputPath);



const clusters = [0,1,2,4,5,7,8,9]
var counts = []

var centroids={
    type: "FeatureCollection",
    features: []
  }
//make a new file for each cluster
  clusters.forEach(cluster => {

    var featuresForCluster = obj.features.filter(feature => feature.properties["cluster"] == cluster)
    var vertices=[[]]
    featuresForCluster.forEach(feature => {
        vertices[0].push(feature.geometry.coordinates)
    })
    vertices[0].push(vertices[0][0])
    //console.log(verticies[0])
    console.log(vertices[0].length)
    //var polygon=turf.polygon(vertices)
    var points = turf.points(vertices[0])
    // var options={"count": vertices[0].length}
    counts.push(vertices[0].length)
    centroids.features.push(turf.center(points))

  })

  var index = 0
  centroids.features.forEach(feature => {
    feature.properties["count"] = counts[index++]
  })

//append the centroid of each cluster to centroids

//write centroids to a json
fs.writeFileSync("centroids.geojson",JSON.stringify(centroids));