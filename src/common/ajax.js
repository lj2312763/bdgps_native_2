// import 'fetch-polyfill'

// const ajax = {
// 	options: {
// 		// host: 'http://172.10.13.36',//后台主机
// 		// port: '99',
//
// 		host: 'http://119.23.207.3',//主机
// 		port: '8090',
//
// 		// host: 'http://172.10.13.92',//主机
// 		// port: '8090',
// 		url: '',
// 		timeout: 300,
// 		headers: {
// 			token: '',
// 			sign: '',
// 			timeStamp: '',
// 			deviceId: '' //比如： FC408F8B-9598-48B6-A740-B9037ADCXXXE
// 		},
// 		charset: 'utf-8',
// 		dataType: 'json',
// 		returnAll: true,
// 		cache: false,
// 		loading: true,
// 		data: {
// 			values: {},
// 			files: {}
// 		}
// 	},
// 	setUrl: function (url) {
// 		const {host, port} = this.options;
// 		this.url = `${host}:${port}${url}`;
// 		return this.url
// 	},
// 	get: function (url) {
// 		let _url = this.setUrl(url);
// 		return fetch(_url).then(function () {
//
// 		})
// 	},
// 	post: function (url, data = {}) {
// 		let _url = this.setUrl(url);
// 		this.options.data = data;
// 		return fetch(_url, data).then(function (res) {
// 			console.log(res)
// 		})
// 	}
// };

// export default ajax