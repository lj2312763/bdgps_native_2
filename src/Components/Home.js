/**
 * Jian Li
 * 2017/11/21 17:35
 * desc:
 **/
'use strict';
import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
	Button
} from 'react-native';

const GankIcon = require('../resources/Gank.png');
const ShiTuIcon = require('../resources/ShiTu.png');

class Home extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
	}

	onPress = () => {
		console.log('wwwwwwwwwwwww')
		this.props.navigation.navigate('Test2');
	}


	render() {
		return (
			<View>
				<Button
					onPress={this.onPress}
					title="Go to notifications"
				/>
			</View>
		);
	}
}

export default Home

