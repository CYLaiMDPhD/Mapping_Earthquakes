// Module 13.5 - Mapping GeoJSON Data
// Add console.log to check to see if our code is working.
console.log("working");



// MODULE 13.5.6 - Mapping GeoJSON Polygons -----------------------

// Data about Toronto Neighborhoods
let torontoHoods = "https://raw.githubusercontent.com/CYLaiMDPhD/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// Street and Satellite tiles:
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "streets-v11",
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "satellite-streets-v11",
    accessToken: API_KEY
});

// baseMap variable to hold tile options
let baseMaps = {
  "Street": streets,
  "Statellite": satelliteStreets
};

// Create map with center on Toronto, zoom to show neighborhoods:
let map = L.map("mapid",{
  center:[43.7,-79.3],
  zoom:11,
  layers:[streets]
});

// Layers control
L.control.layers(baseMaps).addTo(map);

// Polygon Style:
let newStyle = {
  color: "blue",
  weight: 1,
  fillColor: "yellow",
  opacity: 0.5
};

// Grab data from GeoJSON and plot onto map:
d3.json(torontoHoods).then(function(data){
  console.log(data);
  L.geoJSON(data, {
    style: newStyle,
    onEachFeature: function(feature,layer){
      layer.bindPopup("<h3> Neighborhood: "+feature.properties.AREA_NAME+"</h3><hr><h3>  Number: "+feature.properties.AREA_S_CD+"</h3>")
    }
  }).addTo(map);
});

