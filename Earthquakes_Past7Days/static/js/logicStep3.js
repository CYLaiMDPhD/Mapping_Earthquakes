// Module 13.6 - Mapping Earthquake Data
// Add console.log to check to see if our code is working.
console.log("working");



// MODULE 13.6.3 - Mapping Earthquake Data - Past 7 Days -----------------------

// Data from USGS
let linkData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

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

// Create map
let map = L.map("mapid",{
  center:[39.5, -98.5],
  zoom: 3,
  layers:[streets]
});

// Layers control
L.control.layers(baseMaps).addTo(map);

// Add styling using a function
function styleInfo(feature){
  return{
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color:"#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
};

// Function to get the radius based on magnitude of earthquakes:
function getRadius(magnitude){
  if (magnitude === 0){
    return 1;
  };
  return magnitude*4;
};

// Function to change color of circle marker based on magnitude
function getColor(magnitude){
  if (magnitude > 5) {
    return "#ea2c2c";
  }
  if (magnitude > 4) {
    return "#ea822c";
  }
  if (magnitude > 3) {
    return "#ee9c00";
  }
  if (magnitude > 2) {
    return "#eecc00";
  }
  if (magnitude > 1) {
    return "#d4ee00";
  }
  return "#98ee00";
};


// Grab earthquake data from GeoJSON and plot markers onto map:
// Use pointToLayer to make markers circles
// Add popup markers with onEachFeature
d3.json(linkData).then(function(data){
  L.geoJSON(data, {
    pointToLayer: function(feature, latlng){
      console.log(data);
      return L.circleMarker(latlng);
    },
    onEachFeature: function(feature, layer){
      layer.bindPopup("Magnitude: "+feature.properties.mag+"<br>Location: "+feature.properties.place);
    },
    style: styleInfo
  }).addTo(map);
});

