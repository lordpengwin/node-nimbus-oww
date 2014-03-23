// Configuration file for node-nimbus-oww

var config = {};

// Connection parameters to the WinkAPI.
// See this to get credentials (http://www.quirky.com/forums/topic/21462)

config.clientId = "your client ID";
config.clientSecret = "your client secret";
config.login = "your login";
config.passwd = "your password";

// The path to the top level directory containing the weather data from oww. This should be
// the same as the logdir_name in the oww setup file

config.weatherDir = 'your weather data';

// Set up the dials for temp, wind and humidity/barometer

var dials = {};
config.dials = dials;

// A template for the dials

var template = {
    dial_template_id: '10',
    dial_configuration: {
        min_value: 0,
        max_value: 360,
        min_position: 0,
        max_position: 360,
        scale_type: 'linear',
        rotation: 'cw',
        num_ticks: 12
    },
    channel_configuration: {
        channel_id: '10'
    },
    name: 'Manual control'
};

// The temperature dial displays the current temp as both the label and the positon of the needle

temp = {};
dials.temp = temp;
temp.dial = 1;
temp.props = JSON.parse(JSON.stringify(template));
temp.props.name = "Temp";
temp.props.label = "Temp";
temp.props.dial_configuration.min_value = -40;
temp.props.dial_configuration.max_value = 110;
temp.props.dial_configuration.min_position = -135;
temp.props.dial_configuration.max_position = 135;
temp.props.dial_configuration.num_ticks = 270;

// The wind dial displays the wind speed and text direction as the label and the direction in degrees on
// the needle

wind = {};
dials.wind = wind;
wind.dial = 2;
wind.props = JSON.parse(JSON.stringify(template));
wind.props.name = "Wind";
wind.props.label = "Wind";
wind.props.dial_configuration.min_value = 0;
wind.props.dial_configuration.max_value = 360;
wind.props.dial_configuration.min_position = 0;
wind.props.dial_configuration.max_position = 360;
wind.props.dial_configuration.num_ticks = 360;

// The barometer/humidity displays the barometer in the label and the humidity on the needle

barometer = {};   
dials.barometer = barometer;
barometer.dial = 3;
barometer.props = JSON.parse(JSON.stringify(template));
barometer.props.name = "Barometer";
barometer.props.label = "Barometer";
barometer.props.dial_configuration.min_value = 0;
barometer.props.dial_configuration.max_value = 101;
barometer.props.dial_configuration.min_position = -135;
barometer.props.dial_configuration.max_position = 135;
barometer.props.dial_configuration.num_ticks = 270;

module.exports = config;
