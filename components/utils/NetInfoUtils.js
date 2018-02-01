'use strict';

import {NetInfo} from 'react-native'
import {NetworkInfo} from 'react-native-network-info'


//获取网络连接
export const getNetInfo = () => {
	return new Promise((resolve, reject) => {
		NetInfo.isConnected.fetch().then((isConnected) => {
			resolve(isConnected)
		}).catch((err) => {
			reject(err)
		})
	})
};

//获取网络连接类型
export const getNetWorkType = () => {
	return new Promise((resolve, reject) => {
		NetInfo.fetch().then((isConnected) => {
			resolve(isConnected)
		}).catch((err) => {
			reject(err)
		})
	})
}

//获取WIFI SSID
export const getSSID = () => {
	return NetworkInfo.getBSSID(ssid => console.log('wifi', ssid))
}