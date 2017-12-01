import {
	AppRegistry,
	StyleSheet,
	Text,
	Button,
	View
} from 'react-native';
import React, {Component} from 'react';
import './src/common/storage'
import Routers from './src/Routers';
// import SimpleTabs from './src/Components/SimpleTabs';

// // 读取
// storage.load({
// 	key: 'rememberInfo',
//
// 	// autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
// 	// autoSync: true,
//
// 	// syncInBackground(默认为true)意味着如果数据过期，
// 	// 在调用sync方法的同时先返回已经过期的数据。
// 	// 设置为false的话，则等待sync方法提供的最新数据(当然会需要更多时间)。
// 	syncInBackground: true,
//
// 	// 你还可以给sync方法传递额外的参数
// 	syncParams: {
// 		extraFetchOptions: {
// 			// 各种参数
// 		},
// 		someFlag: true,
// 	},
// }).then(ret => {
// 	// 如果找到数据，则在then方法中返回
// 	// 注意：这是异步返回的结果（不了解异步请自行搜索学习）
// 	// 你只能在then这个方法内继续处理ret数据
// 	// 而不能在then以外处理
// 	// 也没有办法“变成”同步返回
// 	// 你也可以使用“看似”同步的async/await语法
// 	this.setState(ret);
// }).catch(err => {
// 	//如果没有找到数据且没有sync方法，
// 	//或者有其他异常，则在catch中返回
// })
// const SimpleApp = StackNavigator({
// 		Login: {
// 			screen: Login,
// 			navigationOptions: {header: null}  // 此处设置了, 会覆盖组件内的`static navigationOptions`设置. 具体参数详见下文
// 		},
// 		Home: {
// 			screen: HomeScreen
// 		}
// 	},
// 	{
// 		initialRouteName: 'Login', // 默认显示界面
// 		mode: 'none'
// 		// navigationOptions: {  // 屏幕导航的默认选项, 也可以在组件内用 static navigationOptions 设置(会覆盖此处的设置)
// 		// 	header: {  // 导航栏相关设置项
// 		// 		backTitle: '返回',  // 左上角返回键文字
// 		// 		style: {
// 		// 			backgroundColor: '#fff'
// 		// 		},
// 		// 		titleStyle: {
// 		// 			color: 'green'
// 		// 		}
// 		// 	},
// 		// 	cardStack: {
// 		// 		gesturesEnabled: true
// 		// 	}
// 		// },
// 		// mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
// 		// headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
// 		// onTransitionStart: ()=>{ console.log('导航栏切换开始'); },  // 回调
// 		// onTransitionEnd: ()=>{ console.log('导航栏切换结束'); }  // 回调
// 	});

 class ReactNavigationDemo extends Component {
	render() {
		return (
			<Routers />
		);
	}
}
AppRegistry.registerComponent('bdgps_native', () => ReactNavigationDemo);
