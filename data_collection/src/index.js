const path = require('path')
const fs = require('fs-extra')
const axios = require('axios')

const url = "https://opendata.arcgis.com/datasets/70392a096a8e431381f1f692aaa06afd_24.geojson"

const outputPath = path.join(__dirname, '../data')

fs.ensureDirSync(outputPath)

var master = {
  type: "FeatureCollection",
  features: []
}

axios.get(url).then((res) => {
    console.log(res.data)
    res.data.features.forEach(feature => {
        master.features.push(feature)
    })
    fs.writeFileSync(path.join(outputPath, "crashes.geojson"), JSON.stringify(master))
})
