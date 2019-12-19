<template>
	<div id="app">
		<div class="content">
			<van-image height="6rem" width="6rem" src="https://img.yzcdn.cn/vant/cat.jpeg" round fit="cover" />
		</div>
		
		
		<van-cell-group style="margin-top: 4rem;margin-left: 2rem;margin-right: 2rem;">
		  <van-field
		    v-model="username"
		    label="用户名"
			type="tel"
		    placeholder="请输入用户名"
			v-bind:error-message="errorMsg"
		  />
		
		  <van-field
		    v-model="password"
		    type="password"
		    label="密码"
		    placeholder="请输入密码"
		  />
		</van-cell-group>
		
		
		<van-button v-bind:loading="isLogin" @click="login()" class="loginBtn" type="primary">登录</van-button>
	</div>
</template>

<script>
	import Vue from 'vue';
	import {
		Image,Field,CellGroup,Button
	} from 'vant';
	import 'vant/lib/image/style';
	import 'vant/lib/field/style';
	Vue.use(Image);
	Vue.use(Field);
	Vue.use(CellGroup);
	Vue.use(Button);
	export default {
		methods:{
			login:function(){
				var that = this;
				that.isLogin = true;
				
				that.$router.push('/main')
			}
		},
		data(){
			return{
				errorMsg:'',
				isLogin:false,
				username:'',
				password:''
			}
		},
		
	}
</script>

<style>
.content{
	margin-top: 6rem;
	width: 100%;
	text-align: center;
}
van-cell-group{
	margin-top: 3rem;
}
.loginBtn{
	width: 60%;
	margin-left: 20%;
	margin-top: 6rem;
}
</style>
