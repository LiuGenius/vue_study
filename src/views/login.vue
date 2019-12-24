<template>
	<div id="app" style="text-align: center;">
		<div class="content">
			<van-image height="6rem" width="6rem" src="https://img.yzcdn.cn/vant/cat.jpeg" round fit="cover" />
		</div>


		<van-cell-group style="margin-top: 4rem;margin-left: 2rem;margin-right: 2rem;">
			<van-field v-model="username" label="用户名" type="tel" placeholder="请输入用户名" v-bind:error-message="errorMsg" />

			<van-field v-model="password" type="password" label="密码" placeholder="请输入密码" />
		</van-cell-group>


		<van-button class="loginBtn" style="margin-top: 6rem;" v-bind:loading="isLogin" @click="login()" type="primary">登录</van-button>
	</div>
</template>

<script>
	import Vue from 'vue'
	import {
		Notify
	} from 'vant';

	import 'vant/lib/notify/style';
	import {
		post_
	} from '../../public/js/utilHelper'

	Vue.use(post_).use(Notify);
	export default {
		mounted() {
			var token = localStorage.getItem('access-token');
			if (token != '') {
				// this.$router.push('index')
			}
		},
		methods: {
			login: function() {
				var that = this;
				that.isLogin = true;

				post_('member/login', {
					phone: that.username,
					password: that.password
				}, res => {
					that.isLogin = false;
					if (res.success) {
						localStorage.setItem('access-token', res.data['access-token'])
						Notify({
							type: 'success',
							message: '登录成功'
						});
						that.$router.push('/index')
					} else {
						Notify({
							type: 'danger',
							message: res.message
						});
					}
				})
			}
		},
		data() {
			return {
				errorMsg: '',
				isLogin: false,
				username: '15111475403',
				password: '123456'
			}
		},

	}
</script>

<style>
	.content {
		margin-top: 6rem;
		width: 100%;
	}

	van-cell-group {
		margin-top: 3rem;
	}

	.loginBtn {
		width: 60%;
		/* margin-left: 20%; */
		margin-top: 6rem;
	}
</style>
