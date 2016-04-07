
/*
 * GET home page.
 */
var request = require('request');
var _ = require('lodash');
var geoJson = require('../data/transit_relacio_trams.js');
var moment = require('moment');

exports.index = function (req, res) {
    'use strict';
    res.render('index',
        { title: 'Trafic on Barcelona' }
    );
};

// api/dadestrams
exports.dadestrams = function (req, res){
    'use strict';
    var url = 'http://www.bcn.cat/transit/dades/dadestrams.dat';
    var dataTramsArray = [];

    request(url, function(err, response, body) {
        // console.log(body);

        var dataTramsRaw = body.split('\n');
        _.forEach(dataTramsRaw, function(row) {
            var splitRow = row.split('#');

            var dateString = splitRow[1];
            var date = moment(dateString, 'YYYYMMDDHHmmss').format('dddd, MMMM Do YYYY, h:mm:ss a');

            var currentTram = {
                'tram': parseInt(splitRow[0]),
                'date': date,
                'state': parseInt(splitRow[2]),
                'future': parseInt(splitRow[3])
            };

            dataTramsArray.push(currentTram);
        });
        _.forEach(geoJson.features, function(feature) {
            var enhancements = _.find(dataTramsArray, function (dataEnhancement) {
                return dataEnhancement.tram === feature.properties.tram;
            });
            feature.properties.state = enhancements.state;
            feature.properties.future = enhancements.future;
            feature.properties.date = enhancements.date;
            // feature.properties = new Properties(feature.properties);

        });
        res.send(geoJson);
    });


};
