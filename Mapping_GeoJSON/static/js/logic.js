// Module 13.5 - Mapping GeoJSON Data
// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// Center on California[37.5, -122.5]
// Center on Earth [30,30]
let map = L.map('mapid').setView([30,30], 2);


// Tile Background Layer:
let backgroundMap = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "streets-v11",
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
backgroundMap.addTo(map);

// MODULE 13.5.1 ------------------------------------
// // GeoJSON Data for SFO:
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};

// Add GeoJSON Layer to map:
// L.geoJSON(sanFranAirport).addTo(map);
// This adds the standard marker

// MODULE 13.5.2 -----------------------------------
// To bind popup bubbles, use different functions: pointToLayer or onEachFeature within geoJSON call
// pointToLayer function:
// L.geoJSON(sanFranAirport, {
//   pointToLayer: function(feature, latlng){
//     return L.marker(latlng).bindPopup("<h2>"+feature.properties.name+"</h2><hr><h3>"+feature.properties.city+", "+feature.properties.country+"</h3>");
//   }
// }).addTo(map);

// onEachFeature function:
// L.geoJSON(sanFranAirport, {
//     onEachFeature: function(feature, layer) {
//       layer.bindPopup("<h2>"+feature.properties.name+"</h2><hr><h3>"+feature.properties.city+", "+feature.properties.country+"</h3>");
//      }
// }).addTo(map);




