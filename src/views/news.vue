<template>
	<div>
		<van-sticky>
			<van-nav-bar title="新闻公告" left-arrow left-text="返回" @click-left="back()" />
		</van-sticky>

		
		<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
			<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
				<van-cell v-for="(data,index) in datas">
						<div>
							<span>{{data.title}}</span>
							<img style="height: 50px;width: 50px;float: right;padding: 16px;" src="img/icon_more.png" >
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
				datas:[],
				loading: false,
				finished: false,
				isLoading: false,
				pageSize: 15,
				page:0,
			}
		},
		mounted() {
			this.getData();
		},
		methods: {
			back() {
				this.$router.back()
			},
			getData() {
				var that = this;
				post_(
					"home/news-list?access-token=" + localStorage.getItem('access-token'), {
						page:that.page,
						pageSize:that.pageSize
					},
					res => {
						if (res.success) {
							for (var i = 0; i < res.data.length; i++) {
								var newsObj = res.data[i];
								that.datas.push(that.news(newsObj.title,newsObj.ID));
							}
						}
						if (res.data.length < that.pageSize) {
							that.finished = true;
						} else {
							that.finished = false;
						}
						that.loading = false;
						that.isLoading = false;
					})

			},
			onLoad() {
				if (this.datas.length >= this.pageSize) {
					this.page = this.page + 1;
					this.getData()
				}
			},
			onRefresh() {
				this.page = 0;
				this.getData()
				this.datas.splice(0, this.datas.length);
			},
			news(title,ID){
				var message = new Object();
				message.title = title;
				message.ID = ID;
				return message;
			},
		}

	}
</script>

<style>

</style>
