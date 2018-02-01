/**
 * Jian Li
 * 2018/1/31 14:55
 * desc:
 **/
'use strict';
import React, {Component} from 'react';
import {ActivityIndicator, Toast} from 'antd-mobile'
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import CheckBox from '../../base/components/CheckBox/CheckBox'
import * as NetInfoUtils from '../../utils/NetInfoUtils'
import {isEmpty} from 'underscore'
const CheckboxItem = CheckBox;

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.userObject = {};
		this.state = {
			username: '',
			password: '',
			isLoading: false,
			rememberUser: false
		}
	}

	_doLogin = () => {

		const {username,password}=this.state;
		//判断网络状态
		NetInfoUtils.getNetInfo().then((isConnected) => {
			if (!isConnected) {
				Toast.info('未连接网络', 5);
				return false
			}
		}).catch((err) => {
			Toast.info(err)
		})

		if(isEmpty(username)){
			Toast.info('用户名不能为空',2);
			return
		}
		if(isEmpty(password)){
			Toast.info('密码不能为空',2);
			return
		}
		this.setState({isLoading:true});
		this.userObject.username=username;
		this.userObject.password=password;
	}

	_checkChange = () => {
		const {rememberUser} = this.state;
		this.setState({rememberUser: !rememberUser})
	}

	render() {
		const {rememberUser} = this.state;
		return (
			<View>
				<View style={{height: 44, backgroundColor: '#25A2E1', alignItems: 'center', justifyContent: 'center'}}>

					<Text style={{fontSize: 18, color: '#FFFFFF'}}>北斗定位监控系统</Text>

				</View>

				<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 72}}>
					<Image style={{width: 16, height: 16, marginLeft: 35}}
					       source={require('../../assets/theme/default/image/beidouPlatform/zhanghao.png')}/>
					<Text style={{marginLeft: 8, fontSize: 15, color: '#333333'}}>账号</Text>
					<TextInput underlineColorAndroid='transparent'
					           style={{width: 160, marginTop: 2}}
					           placeholderTextColor='#999999'
					           placeholder='请输入你的账号'
					           onChangeText={(username) => this.setState({username: username})}
					           value={this.state.username}/>
				</View>
				<View style={{height: 1, backgroundColor: '#999999', marginLeft: 35, marginRight: 35, marginTop: 5}}/>

				<View style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
					<Image style={{width: 16, height: 16, marginLeft: 35}}
					       source={require('../../assets/theme/default/image/beidouPlatform/mima.png')}/>
					<Text style={{marginLeft: 8, fontSize: 15, color: '#333333'}}>密码</Text>
					<TextInput underlineColorAndroid='transparent'
					           style={{width: 160, marginTop: 2}}
					           placeholderTextColor='#999999'
					           placeholder='请输入你的密码'
					           onChangeText={(password) => this.setState({password})}
					           secureTextEntry={true}
					           value={this.state.password}/>
				</View>
				<View style={{height: 1, backgroundColor: '#999999', marginLeft: 35, marginRight: 35, marginTop: 5}}/>
				<View style={{
					height: 44,
					marginLeft: 35,
					marginRight: 35,
					marginTop: 5,
					flexDirection: 'row',
					alignItems: 'center'
				}}>
					<CheckboxItem checkboxStyle={{width: 16, height: 16}} checked={{rememberUser}} onChange={this._checkChange}
					              label="记住密码"/>
				</View>
				<TouchableOpacity onPress={() => this._doLogin()}>
					<View
						style={{
							backgroundColor: '#25A2E1',
							margin: 35,
							borderRadius: 5,
							justifyContent: 'center',
							alignItems: 'center',
						}}>
						<Text style={{color: '#FFFFFF', fontSize: 14, textAlign: 'right', padding: 12}}>登录</Text>
					</View>
				</TouchableOpacity>
				<ActivityIndicator text="登录中..." toast="true" animating={this.state.isLoading}/>
			</View>
		);
	}
}