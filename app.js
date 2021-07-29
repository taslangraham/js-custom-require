// Define customRequire here to make it immeidately available when we run app.js
// Define custom require method and make it available globally
globalThis.customRequire = function (name) {
	const fs = require('fs')
	const path = require('path');

	if (!customRequire.cache[name]) {
		// 1 Load the code file contents as string
		let code = '';

		try {
			code = fs.readFileSync(path.join(__dirname, name), 'utf8')
		} catch (err) {
			console.error(err);
		}

		// 2 create module object
		// this will hold refernce to the exported module interface
		const customModule = { exports: {} };

		// 3 store reference to module for required code in cache
		customRequire.cache[name] = customModule;

		// 4 create wrapper Function
		// this function will execute the code from the required file and give it
		// scoped access to the 'customModule' module which will allow us to then export stuff from the file
		const wrapper = Function("customRequire, ex, customModule", code);
		// 5 call wrapper with params and code
		wrapper(customRequire, customModule.exports, customModule);
	}

	// return exports property of loaded module
	return customRequire.cache[name].exports;
}

// creates object with no prototype
customRequire.cache = Object.create(null);

const test = customRequire('./test.js');
test.action()