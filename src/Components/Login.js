/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	// Button,
	CheckBox,
} from 'react-native';
import {Button} from 'antd-mobile';
import DeviceInfo from 'react-native-device-info'
// import Storage from 'react-native-storage';
import ajax from '../common/ajax';
import {NavigationActions} from 'react-navigation'

// const instructions = Platform.select({
// 	ios: 'Press Cmd+R to reload,\n' +
// 	'Cmd+D or shake for dev menu',
// 	android: 'Double tap R on your keyboard to reload,\n' +
// 	'Shake or press menu button for dev ',
// });
export default class App extends Component<{}> {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			pwd: '',
			checked: false,
		};
		this.rememberInfo = 'rememberInfo';
	}

	componentWillMount() {
		const {rememberInfo} = this;
		this.getRemember(rememberInfo);
	}

	/**
	 * 登录
	 */
	login = () => {
		const {checked,userName,pwd} = this.state;
		const { navigate,dispatch } = this.props.navigation;
		const {rememberInfo} = this;
		if (checked) {
			this.saveRemember(rememberInfo, this.state);
		} else {
			this.removeRemember(rememberInfo)
		}
		ajax.get('/login', {username:userName,pwd})
			.then((data) => {
			if (data.success) {//
				//重置路由，让Home作为第一个路由
				let resetAction = NavigationActions.reset({
					index: 0,
					actions: [
						NavigationActions.navigate({routeName:'Home'})//要跳转到的页面名字
					]
				});
				dispatch(resetAction);
				// navigate('Home');
			}
		})
	};
	/**
	 * 点击记住账号事件
	 */
	rememberMe = () => {
		let {checked} = this.state;
		this.setState({checked: !checked});
	}

	/**
	 * 存储token
	 * @param {String}token
	 */
	setToken = (token) => {
		this.saveRemember('token', token)
	}

	/**
	 * 记录账号，存入长久数据中
	 * @param {String}type
	 * @param {Object}data
	 */
	saveRemember = (type, data = {}) => {
		// 使用key来保存数据。这些数据一般是全局独有的，常常需要调用的。
		// 除非你手动移除，这些数据会被永久保存，而且默认不会过期。
		storage.save({
			key: type,  // 注意:请不要在key中使用_下划线符号!
			data: data,

			// 如果不指定过期时间，则会使用defaultExpires参数
			// 如果设为null，则永不过期
			// expires: 1000 * 3600
		});
	}

	/**
	 * 读取用户记录的账号信息
	 * @param key
	 */
	getRemember = (key) => {
		// 读取
		storage.load({
			key: key,

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
			// 如果找到数据，则在then方法中返回
			// 注意：这是异步返回的结果（不了解异步请自行搜索学习）
			// 你只能在then这个方法内继续处理ret数据
			// 而不能在then以外处理
			// 也没有办法“变成”同步返回
			// 你也可以使用“看似”同步的async/await语法
			this.setState(ret);
		}).catch(err => {
			//如果没有找到数据且没有sync方法，
			//或者有其他异常，则在catch中返回
		})
	}

	removeRemember = (key) => {
		// 删除单个数据
		storage.remove({
			key: key
		});
	}

	change(type, text) {
		this.setState({[type]: text})
	}

	render() {
		let {userName, pwd, checked} = this.state;
		return (
			<View style={styles.container}>
				<Image source={require('../images/login-bg.jpg')} style={{position: 'absolute', zIndex: -1}}/>
				<Text style={styles.welcome}>
					北斗定位监控系统
				</Text>
				<View style={styles.row}>
					<Text style={styles.label}>
						用户:
					</Text>
					<TextInput style={styles.input} placeholder="请输入账号" onChangeText={(text) => {
						this.change('userName', text)
					}} value={userName}/>
				</View>
				<View style={styles.row}>
					<Text style={styles.label}>
						密码:
					</Text>
					<TextInput style={styles.input} placeholder="请输入密码" secureTextEntry={true} onChangeText={(text) => {
						this.change('pwd', text)
					}} value={pwd}/>
				</View>
				<View style={styles.remberBox}>
					<CheckBox onChange={this.rememberMe} value={checked}/>
					<Text style={styles.remberLabel} onPress={this.rememberMe}>
						记住密码
					</Text>
				</View>
				<Button style={styles.btn} type="primary" onPressOut={this.login} title="登录">登录</Button>
			</View>

		);
	}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},


	row: {
		flexWrap: 'nowrap',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		// borderWidth:1,
		width: 260
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
		color: '#fff',
		fontWeight: '600'
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
	label: {
		width: 50,
	},
	input: {
		width: 150,
		// underlineColor:'transparent',
		textDecorationColor:0,
		borderBottomWidth:0,
		textDecorationLine:"none"
	},
	checked: {},
	btn: {
		width: 260,
	},
	remberBox: {
		justifyContent: 'flex-start',
		// marginRight:30,
		marginTop: 8,
		marginBottom: 8,
		flexWrap: 'nowrap',
		flexDirection: 'row',
		alignItems: 'center',
		// borderWidth:1,
		width: 220
	},
	remberLabel: {
		width: 100,
		// marginLeft:50
	}
});
