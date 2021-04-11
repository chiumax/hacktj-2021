const path = require("path");
const fs = require("fs-extra");
const axios = require("axios");

const url =
  "https://opendata.arcgis.com/datasets/70392a096a8e431381f1f692aaa06afd_24.geojson";

const outputPath = path.join(__dirname, "../data");

fs.ensureDirSync(outputPath);

var master = {
  type: "FeatureCollection",
  features: [],
};
var fiveyears = {
  type: "FeatureCollection",
  features: [],
};
axios.get(url).then((res) => {
  console.log(res.data.features[0].properties["REPORTDATE"]);

  var years = [];

  res.data.features.forEach((feature) => {
    let year = feature.properties["REPORTDATE"].slice(0, 4);
    if (!years.includes(year)) years.push(year);
    // add property for year
    feature.properties["YEAR"] = year;
    master.features.push(feature);
  });

  years = years.sort().reverse().slice(1, 5);

  years.forEach((year) => {
    var filename = `crashes_${year}.geojson`;

    var featuresForYear = master.features.filter(
      (feature) => feature.properties["REPORTDATE"].slice(0, 4) == year
    );
    featuresForYear.forEach((feature) => {
      fiveyears.features.push(feature)
    })

    var toWrite = {
      type: "FeatureCollection",
      features: [],
    };

    toWrite.features = featuresForYear;

    fs.writeFileSync(path.join(outputPath, filename), JSON.stringify(toWrite));
  });

  fs.writeFileSync(
    path.join(outputPath, "crashes.geojson"),
    JSON.stringify(master)
  );
  fs.writeFileSync(
    path.join(outputPath, "fiveyearcrashes.geojson"),
    JSON.stringify(fiveyears)
  );

});
