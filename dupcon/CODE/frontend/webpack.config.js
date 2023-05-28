module.exports = {
	//...
	devServer: {
	  proxy: {
		'/api': {
		  target: 'http://reminder-api',
		  secure: false,
		},
	  },
	},
  };