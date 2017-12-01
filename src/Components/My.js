/**
 * Jian Li
 * 2017/11/21 17:37
 * desc:
 **/
'use strict'
import React, {Component} from 'react';
import {StackNavigator} from 'react-navigation';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image
} from 'react-native';
const GankIcon = require('../resources/Gank.png');
const ShiTuIcon = require('../resources/ShiTu.png');

export default class My extends Component {
	constructor(props) {
		super(props)
	}


	render() {
		console.log('-----',this.props.navigation)
		return (
			<View>
				<Text>个人中心</Text>
			</View>
		);
	}
}