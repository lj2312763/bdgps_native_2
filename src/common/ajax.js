import DeviceInfo from 'react-native-device-info'
import {
	ToastAndroid
} from 'react-native';

const ajax = {
	options: {
		// host: 'http://172.10.13.36',//后台主机
		// port: '99',
		// host: 'http://119.23.207.3',//主机
		// port: '8090',
		method: 'GET',
		host: 'http://172.10.13.92',//主机
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
		const _body = {method, headers, body, credentials: 'include'};
		let onError = this.onError;
		if (this.options.debug) {
			console.log(`+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++请求参数 开始+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`);
			console.log(this.options.url);
			console.log(_body);
			console.log(`+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++请求参数 结束++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`);
		}

		return new Promise((resolve, reject) => {
			fetch(this.options.url, body).then((res) => {
				return res.json()
			}).then((data) => {
				//服务器返回失败信息，shub
				if (!data.success) {
					onError(data.message);
				}
				if (this.options.debug) {
					console.info(`+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++请求结果 开始+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`);
					console.info(data);
					console.info(`+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++请求结果 结束++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`);
				}
				//请求成功时回调
				resolve && (typeof resolve === 'function') && resolve(data);
			}).catch((err) => {
				onError(err.message);
				if (this.options.debug) {
					console.error(`++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++请求错误 开始++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`);
					console.error(err);
					console.error(`++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++请求错误 结束+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++`);
				}
				//请求失败时回调
				reject && (typeof reject === 'function') && resolve(err);
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

function SHA1(msg) {

	function rotate_left(n, s) {
		var t4 = ( n << s ) | (n >>> (32 - s));
		return t4;
	};

	function lsb_hex(val) {
		var str = "";
		var i;
		var vh;
		var vl;

		for (i = 0; i <= 6; i += 2) {
			vh = (val >>> (i * 4 + 4)) & 0x0f;
			vl = (val >>> (i * 4)) & 0x0f;
			str += vh.toString(16) + vl.toString(16);
		}
		return str;
	};

	function cvt_hex(val) {
		var str = "";
		var i;
		var v;

		for (i = 7; i >= 0; i--) {
			v = (val >>> (i * 4)) & 0x0f;
			str += v.toString(16);
		}
		return str;
	};


	function Utf8Encode(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	};

	var blockstart;
	var i, j;
	var W = new Array(80);
	var H0 = 0x67452301;
	var H1 = 0xEFCDAB89;
	var H2 = 0x98BADCFE;
	var H3 = 0x10325476;
	var H4 = 0xC3D2E1F0;
	var A, B, C, D, E;
	var temp;

	msg = Utf8Encode(msg);

	var msg_len = msg.length;

	var word_array = new Array();
	for (i = 0; i < msg_len - 3; i += 4) {
		j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 |
			msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
		word_array.push(j);
	}

	switch (msg_len % 4) {
		case 0:
			i = 0x080000000;
			break;
		case 1:
			i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
			break;

		case 2:
			i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
			break;

		case 3:
			i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
			break;
	}

	word_array.push(i);

	while ((word_array.length % 16) != 14) word_array.push(0);

	word_array.push(msg_len >>> 29);
	word_array.push((msg_len << 3) & 0x0ffffffff);


	for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {

		for (i = 0; i < 16; i++) W[i] = word_array[blockstart + i];
		for (i = 16; i <= 79; i++) W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

		A = H0;
		B = H1;
		C = H2;
		D = H3;
		E = H4;

		for (i = 0; i <= 19; i++) {
			temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B, 30);
			B = A;
			A = temp;
		}

		for (i = 20; i <= 39; i++) {
			temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B, 30);
			B = A;
			A = temp;
		}

		for (i = 40; i <= 59; i++) {
			temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B, 30);
			B = A;
			A = temp;
		}

		for (i = 60; i <= 79; i++) {
			temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
			E = D;
			D = C;
			C = rotate_left(B, 30);
			B = A;
			A = temp;
		}

		H0 = (H0 + A) & 0x0ffffffff;
		H1 = (H1 + B) & 0x0ffffffff;
		H2 = (H2 + C) & 0x0ffffffff;
		H3 = (H3 + D) & 0x0ffffffff;
		H4 = (H4 + E) & 0x0ffffffff;

	}

	var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

	return temp.toLowerCase();

}

export default ajax