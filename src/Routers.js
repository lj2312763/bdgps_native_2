/**
 * Jian Li
 * 2017/11/24 14:17
 * desc:
 **/
'use strict'
import React, {Component} from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	Image,
} from 'react-native';
import {Button, TabBar} from 'antd-mobile';
import {TabNavigator, StackNavigator} from 'react-navigation'
import Home from './Components/Home'
import My from './Components/My'
import Test1 from './Components/Test1'
import Login from './Components/Login'
import RealAlarm from './Components/RealAlarm'

const ShiTuIcon = require('./images/ShiTu.png');
const GankIcon = require('./images/Gank.png');
const MainIcon = require('./images/Main.png');

const MyTab = TabNavigator(
	{
		Home: {
			screen: Home,
			navigationOptions: ({navigation, screenProps}) => ({

				header: null,
				gesturesEnabled: false, // 是否支持滑动返回收拾，iOS默认支持，安卓默认关闭
				tabBarVisible: true, // 是否隐藏标签栏。默认不隐藏(true)
				tabBarIcon: (({tintColor, focused}) => {
					return (
						<Image
							source={!focused ? ShiTuIcon : ShiTuIcon}
							style={[{height: 35, width: 35}, {tintColor: tintColor}]}
						/>
					)
				}), // 设置标签栏的图标。需要单独设置。
				tabBarLabel: '选车', // 设置标签栏的title。推荐这个方式。
			})
		},
		Alarm:{
			screen:RealAlarm,
			navigationOptions: ({navigation, screenProps}) => ({

				header: null,
				gesturesEnabled: false, // 是否支持滑动返回收拾，iOS默认支持，安卓默认关闭
				tabBarVisible: true, // 是否隐藏标签栏。默认不隐藏(true)
				tabBarIcon: (({tintColor, focused}) => {
					return (
						<Image
							source={!focused ? ShiTuIcon : ShiTuIcon}
							style={[{height: 35, width: 35}, {tintColor: tintColor}]}
						/>
					)
				}), // 设置标签栏的图标。需要单独设置。
				tabBarLabel: '实时告警', // 设置标签栏的title。推荐这个方式。
			})
		},

		My: {
			screen: My,
			navigationOptions: ({navigation, screenProps}) => ({
				header: null,
				gesturesEnabled: false, // 是否支持滑动返回收拾，iOS默认支持，安卓默认关闭
				tabBarVisible: true, // 是否隐藏标签栏。默认不隐藏(true)
				tabBarIcon: (({tintColor, focused}) => {
					return (
						<Image
							source={!focused ? ShiTuIcon : ShiTuIcon}
							style={[{height: 35, width: 35}, {tintColor: tintColor}]}
						/>
					)
				}), // 设置标签栏的图标。需要单独设置。
				tabBarLabel: '我的', // 设置标签栏的title。推荐这个方式。
			})
		},
	},
	{
		tabBarPosition: 'bottom', // 设置tabbar的位置，iOS默认在底部，安卓默认在顶部。（属性值：'top'，'bottom')
		swipeEnabled: false, // 是否允许在标签之间进行滑动。
		animationEnabled: false, // 是否在更改标签时显示动画。
		lazy: true, // 是否根据需要懒惰呈现标签，而不是提前制作，意思是在app打开的时候将底部标签栏全部加载，默认false,推荐改成true哦。
		initialRouteName: '', // 设置默认的页面组件
		backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
		tabBarOptions: {
			// iOS属性
			// 因为第二个tabbar是在页面中创建的，所以前景色的设置对其无效，当然也可以通过设置tintColor使其生效
			activeTintColor: 'red', // label和icon的前景色 活跃状态下（选中）。
			inactiveTintColor: 'orange', // label和icon的前景色 不活跃状态下(未选中)。
			activeBackgroundColor: 'blue', //label和icon的背景色 活跃状态下（选中） 。
			inactiveBackgroundColor: 'green', // label和icon的背景色 不活跃状态下（未选中）。
			showLabel: true, // 是否显示label，默认开启。
			showIcon: true, // 是否显示图标，默认关闭。
			upperCaseLabel: false, // 是否使标签大写，默认为true。
		}
	});

const routes = StackNavigator({
	Login: {
		screen: Login,
		navigationOptions: ({navigation, screenProps}) => ({
			header: null,
		})
	},
	Home: {
		screen: MyTab,
		navigationOptions: ({navigation, screenProps}) => ({
			header: null,
		})
	}
},)

export default routes