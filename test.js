const test2 = customRequire('./test2.js');
// uses the available 'customModule' moodule to export this module's interface
// customModule is available through the wrapper function which executes this codes
customModule.exports = {
	action: function () {
		console.log('TEST1 RESPONSE: hi from test.js');
		console.log('PRINTING TEST2 RESPONSE FROM INSIDE TEST1: ', test2.action())
	}
}