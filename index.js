(function () {
   'use strict';
    // require modules
    var $ = require('jquery');
    var L = require('leaflet');
    require('leaflet-hash');

    // Indicate leaflet the specific location of the images folder that it needs to render the page
    L.Icon.Default.imagePath = 'lib/leaflet/images/';

    // Create the map
    var map = L.map('map').setView([41.3921, 2.1705], 13);

    // Add basemap tiles and attribution
    var attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a> | <a href="https://github.com/sigon426"><> with ❤ by sigon</a>';

    var positronTiles = 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png';

    var transitStatus = {
        0: 'no data',
        1: 'very fluid',
        2: 'fluid',
        3: 'dense',
        4: 'very dense',
        5: 'congested',
        6: 'closed'
    };

    // Create the basemap and add it to the map
    L.tileLayer(positronTiles, {
        maxZoom: 18,
        attribution: attribution
    }).addTo(map);

    var hash = new L.Hash(map);

    // get transit_relacion_trams.geojson
    var getGeojson = $.getJSON('/API/dadestrams');
    // status (0 = no data, 1 = very fluid, 2 = fluid, 3 = dense, 4 = very dense, 5 = congested, 6 = closed).
    function getColor(state) {
        return state === 0 ? '#5b615f' :
               state === 1  ? '#1a9850' :
               state === 2  ? '#91cf60' :
               state === 3  ? '#d9ef8b' :
               state === 4   ? '#fee08b' :
               state === 5   ? '#fc8d59' :
               state === 6   ? '#d73027' :
                        '#a418d5';
    }

    getGeojson.done(function(trams) {
        L.geoJson(trams, {
            onEachFeature: function (feature, layer) {
                layer.bindPopup('<h3>' + feature.properties.descripcio + '</h3><p>Status: ' + transitStatus[feature.properties.state] + '</p><p>Last update on:</br>' + feature.properties.date + '</p>');
            },
            style: function(feature){
                return {
                    weight: 3,
                    color: getColor(feature.properties.state)
                };
            }
        }).addTo(map);
    });
    getGeojson.fail(function() {
        $('body').append('<p>Oh no, something went wrong!</p>');
    });



    // legend
    var legend = L.control({position: 'bottomright'});
    // status (0 = no data, 1 = very fluid, 2 = fluid, 3 = dense, 4 = very dense, 5 = congested, 6 = closed).


    legend.onAdd = function () {

        var div = L.DomUtil.create('div', 'info legend');
        div.innerHTML += '<p>Transit Status</p>';

        for (var i = 0; i <= 6; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(i) + '"></i> ' +
                transitStatus[i] + '<br>';
        }
        return div;
    };
    legend.addTo(map);
}());
