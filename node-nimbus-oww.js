"use strict";

// Import the modules that we need

var fs = require('fs');
var sys = require('sys');
var util = require('util');
var WinkAPI = require('node-winkapi');
var dateformat = require('dateformat');

// Configuration

var config = require('./config');

// The current weather file being watched.

var weatherFile = null;

// Create the object to talk to the Wink API

var winkapi = new WinkAPI.WinkAPI({clientID : config.clientId, clientSecret : config.clientSecret});

// Setup the dials structure to match the dial ids for the nimbus

function setUpDials(clock) {

    // Set the ids of the dials from the clock object

    var dialIds = Object.keys(clock.dials);
    config.dials.temp.path = "/dials/" + dialIds[config.dials.temp.dial];
    config.dials.wind.path = "/dials/" + dialIds[config.dials.wind.dial];
    config.dials.barometer.path = "/dials/" + dialIds[config.dials.barometer.dial];
}

// Function to watch the weather file

function weatherFileWatcher(currentStat, prevStat) {

    // Parse the last line of the file

    fs.readFile(weatherFile, 'utf-8', function(err, data) {

        if (err)
            throw err;

        // Split the content of the file into lines

        var lines = data.trim().split('\n');

        // Split the last line into fields

        var lastLine = lines.slice(-1)[0];
        var fields = lastLine.split(',');

        // Update the dials temp object

        var dials = config.dials;
        var temp = fields[2].trim();
        console.log("temp = " + temp)
        dials.temp.props.labels = [temp + "F"];
        dials.temp.props.value = parseFloat(temp);
        winkapi.roundtrip('PUT', dials.temp.path, dials.temp.props, function(err, result) {
            if (!!err)
                return console.log('setDial: ' + err.message);
         });

        // Update the wind dial

        var windspeed = fields[4].trim();
        var winddirtxt = fields[6].trim();
        var winddir = fields[7].trim();
        console.log("speed = " + windspeed + " dirtx = " + winddirtxt + " dir = " + winddir);
        dials.wind.props.labels = [windspeed + " " + winddirtxt];
        dials.wind.props.value = parseFloat(winddir);
        winkapi.roundtrip('PUT', dials.wind.path, dials.wind.props, function(err, result) {
            if (!!err)
                return console.log('setDial: ' + err.message);
         });

         // Update the barometer dial

        var barometer = fields[12].trim().substring(0, 5);
        var humidity = fields[11].trim();
        console.log("barometer = " + barometer + " humidity = " + humidity);
        dials.barometer.props.labels = [barometer + '\"'];
        dials.barometer.props.value = parseFloat(humidity);
        winkapi.roundtrip('PUT', dials.barometer.path, dials.barometer.props, function(err, result) {
            if (!!err)
                return console.log('setDial: ' + err.message);
         });
    });
}

// Function to determine what weather file to watch and update the watcher as needed.

function updateWeatherWatcher() {

    // Format the name of the directory and file from the current system time

    var newFile = config.weatherDir + dateformat(date, 'yymm/yymmdd') + '.csv';
    if (newFile != weatherFile) {

        // Stop watching the current file

        if (weatherFile != null)
            fs.unwatchFile(weatherFile);

        // Start watching the new file

        var date = new Date();
        weatherFile = newFile;
        fs.watchFile(weatherFile, weatherFileWatcher);
    }
}

// Login to the wink service and setup a timer to watch the weather data

winkapi.login(config.login, config.passwd, function(err) {

     if (!!err)
        return console.log('login error: ' + err.message);

    // Get information about the clock and setup the dials

    winkapi.getDevices(function(err, devices) {

        if (!!err)
            return console.log('getDevices error: ' + err.message);

        // Look for the nimbus device

        devices.forEach(function(device) {
            if (device.type == 'cloud_clock')
                setUpDials(device);
        });
    });

    // Setup a timer to watch for weather updates every 10 seconds

    setInterval(updateWeatherWatcher, 10000);
});
