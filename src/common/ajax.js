import DeviceInfo from 'react-native-device-info'
import SHA1 from './sha1'
import {ToastAndroid} from 'react-native';

const ajax = {
	options: {
		// host: 'http://172.10.10.141',//后台主机
		// port: '8090',
		// host: 'http://119.23.207.3',//主机
		// port: '8090',
		method: 'GET',
		host: 'http://172.10.20.52',//主机
		port: '99',
		url: '',
		debug: true,//调试模式打印请求数据
		timeout: 300,
		headers: {
			token: '',
			sign: '',
			timeStamp: '',
			deviceId: '' //比如： FC408F8B-9598-48B6-A740-B9037ADCXXXE
		},
		charset: 'utf-8',
		dataType: 'json',
		returnAll: true,
		loading: true,
		body: {}
	},
	setUrl: function (url) {
		const {host, port} = this.options;
		this.options.url = `${host}:${port}${url}`;
		this.getDeviceInfo();
	},

	/**
	 * 设置请求头信息
	 */
	setHeaders: function () {
		let {token} = this.options.headers;
		let timeStamp = new Date().getTime();
		let key = '5993d2d1c52fc03b4c49f189';//后台appkey
		this.options.headers.token = token;
		this.options.headers.sign = SHA1(token + ':' + key + ':' + timeStamp);
	},
	//获取设备识别码
	getDeviceInfo: function () {
		//设备唯一识别码
		let deviceUniqueID = DeviceInfo.getUniqueID();
		this.options.headers.deviceId = deviceUniqueID;
		storage.load({
			key: 'token',

			// autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
			// autoSync: true,

			// syncInBackground(默认为true)意味着如果数据过期，
			// 在调用sync方法的同时先返回已经过期的数据。
			// 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
			syncInBackground: true,

			// 你还可以给sync方法传递额外的参数
			syncParams: {
				extraFetchOptions: {
					// 各种参数
				},
				someFlag: true,
			},
		}).then(ret => {
			console.log(ret);
			this.options.headers.token = ret.token;
		}).catch(err => {

		});
	},
	splitBody: function (params) {
		if (params) {
			let paramsArray = [];
			Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])));
			if (this.options.url.search(/\?/) === -1) {
				this.options.url += '?' + paramsArray.join('&')
			} else {
				this.options.url += '&' + paramsArray.join('&')
			}
		}
	},
	/**
	 * get请求，会把请求的数据拼入URL中
	 * @param {String}url：请求路径   example:'/login'
	 * @param {Object}data:发送的数据
	 */
	get: function (url, data) {
		this.setUrl(url);
		// this.options.body = data;
		this.options.method = 'GET';
		this.splitBody(data);
		return this.request();
	},
	/**
	 * post请求
	 * @param {String}url：请求路径   example:'/login'
	 * @param {Object}data:发送的数据
	 */
	post: function (url, data = {}) {
		this.setUrl(url);
		this.options.method = 'POST';
		this.options.body = data;
		this.request();
	},
	/**
	 * 请求数据
	 * @return {Promise}
	 */
	request: function () {
		this.setHeaders();
		const body = this.options.body;
		const method = this.options.method;
		const headers = this.options.headers;
		// let formData = new FormData();
		// for(let k in body){
		// 	formData.append(k, body[k]);
		// }
		const _body = {method, headers, BodyInit: body, credentials: "include"};
		let onError = this.onError;
		if (this.options.debug) {
			console.log(`+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++param start+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`);
			console.log(this.options.url);
			console.log(_body);
			console.log(`+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++param end++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`);
		}

		return new Promise((resolve, reject) => {
			return fetch(this.options.url, _body).then((res) => {
				return res.json()
			}).then((result) => {
				//服务器返回失败信息，shub
				if (!result.success) {
					onError(result.message);
				}
				if (this.options.debug) {
					console.info(`+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++result start++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`);
					console.info(result);
					console.info(`+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++result end++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`);
				}
				//请求成功时回调
				resolve && (typeof resolve === 'function') && resolve(result);
			}).catch((err) => {
				onError(err.message);
				if (this.options.debug) {
					console.error(`++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++error start++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`);
					console.error(err);
					console.error(`++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++error end+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`);
				}
				//请求失败时回调
				reject && (typeof reject === 'function') && reject(err);
				this.onError(err.message);
			})
		})
	},
	onSuccess: function () {

	},
	/**
	 * 统一的错误提示
	 * @param {String}message:错误提示文字
	 */
	onError: function (message) {
		ToastAndroid.show(message, ToastAndroid.SHORT);
	}
};


export default ajax