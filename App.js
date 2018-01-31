/**
 * Jian Li
 * 2018/1/31 14:49
 * desc:
 **/
'use strict';
import React, {Component} from 'react';
import {Platform} from 'react-native';
import {Drawer, Lightbox, Overlay, Reducer, Router, Scene, Stack, Tabs,} from 'react-native-router-flux';

import Login from './components/scene/user/Login'
require('./components/constants/AsyncStorageKey');

// define this based on the styles/dimensions you use
const getSceneStyle = (/* NavigationSceneRendererProps */ props, computedProps) => {
	const style = {
		flex: 1,
		backgroundColor: '#FFFFFF',
		shadowColor: null,
		shadowOffset: null,
		shadowOpacity: null,
		shadowRadius: null,
	};
	if (computedProps.isActive) {
		style.marginTop = Platform.OS === 'ios' ? (computedProps.hideNavBar ? 0 : 64) : (computedProps.hideNavBar ? 0 : 54);
		style.marginBottom = computedProps.hideTabBar ? 0 : 50;
	}
	return style;

};

const reducerCreate = params => {
	const defaultReducer = Reducer(params);
	return (state, action) => {
		return defaultReducer(state, action)
	}
};


export default class App extends Component {
	constructor(props) {
		super(props)
	}

	loginFlag = false;

	render() {
		return (
			<Router createReducer={reducerCreate} getSceneStyle={getSceneStyle}>
				<Stack key="root" hideTabBar navigationBarStyle={{backgroundColor: '#25A2E1'}}
				       titleStyle={{alignSelf: 'center', color: '#fff', fontSize: 18}}>
					<Scene key="login" component={Login} initial={!this.loginFlag} hideNavBar={true}/>
				</Stack>
			</Router>
		);
	}
}