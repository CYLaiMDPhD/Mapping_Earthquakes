// Module 13.3
// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// Center on US, zoom 4
//let map = L.map('mapid').setView([40.7, -94.5], 4);
// Center on Los Angeles, zoom 14
let map = L.map('mapid').setView([34.0522,-118.2437], 14);


// Static Tiles format:
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

// ADDING POINTS
//var marker = L.marker([51.5,-0.09]).addTo(map);
// Not sure where this is - doesn't appear on map!


// Marker for LA
//let marker = L.marker([34.0522,-118.2437]).addTo(map);


// Change marker to circle
//let marker = L.circle([34.0522,-118.2437],{radius: 100}).addTo(map);

// Another way to make a circle marker and changing circle appearance:
let marker = L.circleMarker([34.0522,-118.2437],{
    radius: 300,
    color: "black",
    fillColor:'#ffffa1'
}).addTo(map);

