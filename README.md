webperf-monitor-frontend
========================

This is a web based front end for [webperf-monitor](https://github.com/gauntface/webperf-monitor).

To start the server, grab the source and run it with the following commands:

	sudo npm install

	gulp

	node index.js -c <Path to Config File>

The config file is the same as webperf-monitor, but there is also a copy in this repo in config/config.sample.js:

	exports.dbURL = {
			host     : 'localhost',
	 		user     : '<username>',
	 		password : '<password>',
	 		port: 8889
	 	};
	exports.dbName = 'webperfmonitor';

If you want to set this task up to run constantly then I'd recommend using the forever task:

	sudo npm install forever -g

	forever start index.js -c <Path to Config File>