// Module 13.4.2
// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// Center on US, zoom 4
let map = L.map('mapid').setView([40.7, -94.5], 4);
// Center on Los Angeles, zoom 14
// let map = L.map('mapid').setView([34.0522,-118.2437], 14);

// Static Tiles format:
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

// Array for multiple cities:
// let cities = [{
//   location: [40.7128, -74.0059],
//   city: "New York City",
//   state: "NY",
//   population: 8398748
// },
// {
//   location: [41.8781, -87.6298],
//   city: "Chicago",
//   state: "IL",
//   population: 2705994
// },
// {
//   location: [29.7604, -95.3698],
//   city: "Houston",
//   state: "TX",
//   population: 2325502
// },
// {
//   location: [34.0522, -118.2437],
//   city: "Los Angeles",
//   state: "CA",
//   population: 3990456
// },
// {
//   location: [33.4484, -112.0740],
//   city: "Phoenix",
//   state: "AZ",
//   population: 1660272
// }
// ];

// Loop through cities and add markers with each loop:
// cities.forEach(function(city){
//     L.marker(city.location).addTo(map);
// });




// Reading Cities data from an external js file:
let cityData = cities;
// Loop through cityData
// cityData.forEach(city => L.marker(city.location).addTo(map));


// Bind Popups with Markers
cityData.forEach(city =>
    L.circleMarker(city.location, {radius: city.population/100000}).
    bindPopup("<h2>"+city.city+", "+city.state+"</h2><hr><h3>Population "+city.population.toLocaleString()+"</h3>").
    addTo(map));
// NOTE: clicking map anywhere in the circle marker will give you the popup



