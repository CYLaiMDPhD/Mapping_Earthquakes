// Module 13 Challenge
// Add console.log to check to see if our code is working.
console.log("working");

/// DATA SOURCES ----------------------------------------------------------------------------
// Data from USGS - All Earthquakes for past 7 days
let linkAllEarthquakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Data from github/fraxen - Tectonic Plate data
let linkTectonic = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// Data from USGS - Major Earthquakes (>4.5 magnitude) for past 7 days
let linkMajorQuakes = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";


/// Tiles for basemaps ----------------------------------------------------------------------
// Street tile layer:
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "streets-v11",
    accessToken: API_KEY
});

// SatelliteStreets tile layer:
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "satellite-streets-v11",
    accessToken: API_KEY
});

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
});

// baseMap variable to hold tile options
let baseMaps = {
  "Street": streets,
  "Statellite": satelliteStreets,
  "Dark": dark
};



/// Layer Groups for layer maps -------------------------------------------------------------
// All Earthquakes layer
let allEarthquakesLayer = new L.layerGroup();
// Tectonic plates layer
let tectonicPlatesLayer = new L.layerGroup();
// Major Earthquakes Layer
let majorQuakesLayer = new L.layerGroup();

// Variable for all overlays
let overlays = {
  "Earthquakes": allEarthquakesLayer,
  "Tectonic Plates": tectonicPlatesLayer,
  "Major Earthquakes": majorQuakesLayer
};

/// Map and Layers Control ------------------------------------------------------------
// Create map
let map = L.map("mapid",{
  center:[39.5, -98.5],
  zoom: 3,
  layers:[streets]
});

// Layers control
L.control.layers(baseMaps, overlays).addTo(map);



/// Styling ---------------------------------------------------------------------------
// Function for earthquake circle markers - all earthquakes
function styleInfo1(feature){
  return{
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor1(feature.properties.mag),
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

// Function to change color of circle marker based on magnitude - for all earthquakes
function getColor1(magnitude){
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

// Function for styling tectonic plate lines
function styleInfo2(feature){
  return { weight: 2, color: "#ff00ff"};
};

// Function for styling major earthquakes
function styleInfo3(feature){
  return{
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor3(feature.properties.mag),
    color:"#0066ff",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 2.5
  };
};

// Function to change color of circle marker based on magnitude - for major earthquakes
function getColor3(magnitude){
  if (magnitude > 6) {
    return "#6600cc";
  }
  if (magnitude > 5) {
    return "#ea2c2c";
  }
  return "#ea822c";
};


/// Grab GeoJSON Data for all earthquakes and render to map using functions --------------------------------

// Grab earthquake data from GeoJSON and plot markers onto map:
d3.json(linkAllEarthquakes).then(function(data){
  L.geoJSON(data, {
    pointToLayer: function(feature, latlng){
      return L.circleMarker(latlng);
    },
    onEachFeature: function(feature, layer){
      layer.bindPopup("Magnitude: "+feature.properties.mag+"<br>Location: "+feature.properties.place);
    },
    style: styleInfo1
  }).addTo(allEarthquakesLayer);
  // Add all earthquakes to map - default map appears on page loading
  allEarthquakesLayer.addTo(map);
});


/// Grab GeoJSON Data for Tectonic Plates and render to map ----------------------------------------------------
d3.json(linkTectonic).then(function(data){
  L.geoJSON(data, {style: styleInfo2}).addTo(tectonicPlatesLayer);
  tectonicPlatesLayer.addTo(map);
});


/// Grab GeoJSON Data for Major Earthquakes (>4.5) and render to map -------------------------------------------

d3.json(linkMajorQuakes).then(function(data){
  L.geoJSON(data, {
    pointToLayer:function(feature, latlng){
      return L.circleMarker(latlng);
    },
    onEachFeature:function(feature, layer){
      layer.bindPopup("Magnitude: "+feature.properties.mag+"<br>Location: "+feature.properties.place);
    },
    style: styleInfo3
  }).addTo(majorQuakesLayer);
  // NOTE: layer will be added to map only when selected in the layer control
});
  

/// Change legends based on map layer -----------------------------------------------------

// Legend control
let legend1 = L.control({
  position: "bottomright"});
let legend2 = L.control({
  position: "bottomright"});

// Legend1 for all earthquakes:
  legend1.onAdd = function(){
    let div = L.DomUtil.create("div", "info legend");
    let magnitudes = [0, 1, 2, 3, 4, 5];
    let colors = ["#98ee00","#d4ee00","#eecc00","#ee9c00","#ea822c","#ea2c2c"];
    div.innerHTML +=
        "<legend>All<br>Earthquakes</legend>";
    for (let i=0;i<magnitudes.length;i++){
      div.innerHTML +=
        "<i style='background:  "+colors[i]+"'></i>"+
        magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
  };

// Legend2 for major earthquakes:
  legend2.onAdd = function(){
    let div = L.DomUtil.create("div", "info legend");
    let magnitudes = [4, 5, 6];
    let colors = ["#ea822c","#ea2c2c", "#6600cc"];
    div.innerHTML +=
        "<legend>Major<br>Earthquakes</legend>";
    for (let i=0;i<magnitudes.length;i++){
      div.innerHTML +=
        "<i style='background:  "+colors[i]+"'></i>"+
        magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
  };


// Show Legend 1 as default
legend1.addTo(map);


// Change legends when user selects or deselects a map layer
map.on("overlayadd", function(eventLayer){
  if(eventLayer.name == "Earthquakes"){
    legend1.addTo(this);
  }
  if(eventLayer.name == "Major Earthquakes"){
    legend2.addTo(this);
  }
});

map.on("overlayremove", function(eventLayer){
  if(eventLayer.name == "Earthquakes"){
    this.removeControl(legend1);
  }
  if(eventLayer.name == "Major Earthquakes"){
    this.removeControl(legend2);
  }
});




