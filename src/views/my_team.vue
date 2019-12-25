<template>
	<div>
		<van-sticky>
			<van-nav-bar title="我的团队" left-arrow left-text="返回" @click-left="back()" />
		</van-sticky>


		<van-tabs swipeable="" sticky @click="onClick">
			<!-- :title="一级团队  ({{one_userNum}})" -->
			<van-tab :title="'一级团队 ( '+one_userNum + ' )'" ></van-tab>
			<!-- ({{two_userNum}}) -->
			<van-tab :title="'二级团队 ( '+two_userNum + ' )'"></van-tab>
		</van-tabs>

		<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
			<van-list v-model="loading" :finished="finished" finished-text="没有更多了">
				<van-cell style="padding: 16px;" v-for="data in list">
					<p style="margin: 0px 0px;">姓名:{{data.name}}</p>
					<div>
						<span>{{data.username}}</span>
						<span style="font-size: 15px;float: right;">{{data.add_time}}</span>
					</div>
				</van-cell>
			</van-list>
		</van-pull-refresh>

	</div>

</template>

<script>
	import Vue from 'vue'
	import {
		post_
	} from '../../public/js/utilHelper'
	import {
		Dialog
	} from 'vant'

	Vue.use(post_).use(Dialog);
	export default {
		data() {
			return {
				list: [],
				loading: false,
				finished: true,
				isLoading: false,
				data1: [
					
				],
				data2: [
				],
				one_userNum: 0,
				two_userNum: 0
			}
		},
		mounted() {
			this.getData();
			this.onClick(0,'')
		},
		methods: {
			back() {
				this.$router.back()
			},
			onClick(name, title) {
				if(name == 0){
					this.list = this.data1;
				}else{
					this.list = this.data2;
				}
			},
			onRefresh() {
				this.data2.splice(0, this.data2.length);
				this.data1.splice(0, this.data1.length);
				this.getData()
			},
			user(phone, add_time, name) {
				var user = new Object();
				user.username = phone;
				user.add_time = add_time;
				user.name = name;
				return user;
			},
			getData() {
				var that = this;
				post_("member/my-team?access-token=" + localStorage.getItem('access-token'), {}, res => {
					if (res.success) {
						for (var i = 0; i < res.data.level_1.length; i++) {
							var user = res.data.level_1[i];
							that.data1.push(that.user(user.phone, user.add_time, user.name));
						}
						for (var i = 0; i < res.data.level_2.length; i++) {
							var user = res.data.level_2[i];
							that.data2.push(that.user(user.phone, user.add_time, user.name));
						}
						that.one_userNum = that.data1.length;
						that.two_userNum = that.data2.length;
						that.loading = false;
						that.isLoading = false;
					}
				})
			}
		}

	}
</script>

<style>

</style>
