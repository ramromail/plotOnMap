"use strict";
var map, markers = [];

document.addEventListener("DOMContentLoaded", function (event) {
    // get your own mapbox access token from mapbox. and replace this
    mapboxgl.accessToken = 'pk.eyJ1IjoicmFtcm9tYWlsIiwiYSI6ImNrYmFrMmJuMjA3Nncycm14aW52ZGc1OWkifQ.Ssn1GtGbr0ygywg7SexY3Q';

    map = new mapboxgl.Map({
        container: document.getElementById('map'),
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [0, 0], // starting position [lng, lat]
        zoom: 1, // starting zoom
        boxZoom: false
    });

    map.on('load', function () {
        // disable map rotation using right click + drag
        map.dragRotate.disable();

        // disable map rotation using touch rotation gesture
        map.touchZoomRotate.disableRotation();

        map.addControl(
            new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                mapboxgl: mapboxgl
            })
        );
    });
});

function plot() {
    let coords = document.getElementById('textArea').value.trim();
    coords = coords.split("\n");

    // remove existing marker
    markers.forEach(function (marker) {
        marker.remove();
    });

    // empty markers array
    markers = [];

    // initiate an arry to fit map
    let bounds_lat = [];
    let bounds_lng = [];

    coords.forEach(function (marker) {
        let latlng = marker.replace(' ', '');
        latlng = latlng.split(',');

        let lat = parseFloat(latlng[0]),
            lng = parseFloat(latlng[1]);


        if (!isNaN(lat) && !isNaN(lng)) {

            bounds_lat.push(lat);
            bounds_lng.push(lng);

            let icon = new mapboxgl.Marker()
                .setLngLat([lng, lat])
                .addTo(map);

            markers.push(icon);
        }
        else {
            console.log('Invalid Coordinate: ' + marker);
        }
    });

    if(bounds_lat.lenght > 1 && bounds_lng.length > 1) {
        bounds_lat.sort(function(a,b) { return a - b;});
        bounds_lng.sort(function(a,b) { return a - b;});
    
        map.fitBounds([[bounds_lng[0], bounds_lat[0]], [bounds_lng.pop(), bounds_lat.pop()]]);
    }

}