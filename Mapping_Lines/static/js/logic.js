// Module 13.4.3 - Mapping Line
// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// Center on California
let map = L.map('mapid').setView([35, -115], 5);


// Static Tiles format:
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "satellite-streets-v11",
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);


// Single line with start and end points:
// Array for coordinates (LAX to SFO):
// let line = [
//   [33.9416, -118.4085],
//   [37.6213, -122.3790]
// ];

// Map multiple lines/polygon:
let line = [
  [33.9416, -118.4085],
  [37.6213, -122.3790],
  [40.7899, -111.9791],
  [47.4502, -122.3088]
];


// Add line to map:
L.polyline(line, {color: "blue", dashArray:"4 1 2 3", weight: 1}).addTo(map);




// // Reading Cities data from an external js file:
// let cityData = cities;
// // Loop through cityData
// // cityData.forEach(city => L.marker(city.location).addTo(map));


// // Bind Popups with Markers
// cityData.forEach(city =>
//     L.circleMarker(city.location, {radius: city.population/100000}).
//     bindPopup("<h2>"+city.city+", "+city.state+"</h2><hr><h3>Population "+city.population.toLocaleString()+"</h3>").
//     addTo(map));
// // NOTE: clicking map anywhere in the circle marker will give you the popup



