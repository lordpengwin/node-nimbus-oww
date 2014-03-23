node-nimbus-oww
================

One Wire Weather integration with the Quirky Nimbus using Node.js

Overview
--------
node-nimbus-oww is a node.js module that provides integration between a One-Wire Weather station running Simon Melhuish's excellent [One-wire weather](http://oww.sourceforge.net) software and the [Quirky Nimbus](https://www.quirky.com/shop/596). It allows you to display your weather information collected by your station on the dials of your Nimbus.

Installation
------------
This assumes that you have node.js installed on your computer and that the OWW data is being collected to CSV files somewhere on your file system. To use the WinkApi you will need to have an account at [quirky.com](quirky.com) and request API tokens from them. There is not currently a process for this but you can request them by sending email to questions@quirky.com, more information can be found in [this thread](https://www.quirky.com/forums/topic/21462).

1. Download node-nimbus-oww into a directory on your computer (e.g. /usr/local/node-nimbus-oww)
2. Install the dependency libraries
        npm install node-winkapi
        npm install dateformat
3. Rename the sample-config.js to config.js and edit it setting the following values
  config.clientId - The API Client ID
  config.clientSecret - The API Client Secret
  config.login - Your login at quirky.com
  config.passwd - Your password at quirk.com
  config.weatherDir - The path to your weather data
4. Run the program with node
    node node-nimbus-oww.js

Additional Information
----------------------
* [The Quiry Nimbus](https://www.quirky.com/shop/596)
* [One-wire weather](http://oww.sourceforge.net)
* [node-winkapi](https://github.com/TheThingSystem/node-winkapi)
* [dateformat](https://github.com/felixge/node-dateformat)
* [Quirky Forum](https://www.quirky.com/forums/topic/21462)
* [Wink API Documentation](http://docs.wink.apiary.io/)

