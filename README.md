# Mapping_Earthquakes

*Note: This repository was created to fulfill assignments (Module 13 Exercises and Challenge) for the UC Berkeley Data Analytics and Visualization Bootcamp. Content and code were based on module instructions and grading rubric.*


## Overview
In this module, we created interactive maps using Leaflet, Mapbox, and JSON/geoJSON data from various public sources. To see the final product of the module, load the index.html file from the Earthquakes_Challenge folder (requires a MapBox API key), which will display recent earthquake data from the USGS. Marker colors and diameters reflect earthquake magnitude. Toggle between street (Figure 1), satellite map (Figure 2), or dark mode view and select all earthquakes or major earthquakes (Figure 3) for display.


**Data Source:**

USGS: https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson


**Figure 1: All Earthquakes on Streetview Map (Week of 2-17-22 to 2-23-22)**

![Fig3.png](/Images/Fig3.png)


**Figure 2: All Earthquakes on Satellite Map (Week of 2-17-22 to 2-23-22)**

![Fig3.png](/Images/Fig3.png)


**Figure 3: Major Earthquakes (Week of 2-17-22 to 2-23-22)**

![Fig3.png](/Images/Fig3.png)


---
## Module Exercises
- Creating basic maps and tile layers in Leaflet with calls to Mapbox API
- Plotting points and markers using JSON data
  - changing marker shapes and appearance
- Plotting lines and linestrings using JSON data
  - changing line styles
- Plotting polygons using JSON data
  - changing shape attributes
- Plotting maps using GeoJSON data
  - plotting points, line strings, polygons
- Leaflet layer controls
- Leaflet DOM utility
- Working with git branches


---
## Challenge Files for Grading
**Earthquakes_Challenge Folder**
- index.html
- static/js/challenge_logic.js
- static/css/style.css

**Note to graders:**
The "Major Earthquakes layer" is not displayed on default, but will appear when selected from the layers control. The legend will change based on which map layer is active. The most newly selected layer will display as the topmost layer."
