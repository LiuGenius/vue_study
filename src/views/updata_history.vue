<template>
	<div>
		<van-sticky>
			<van-nav-bar title="升级记录" left-arrow left-text="返回" @click-left="back()" />
		</van-sticky>

		
		<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
			<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
				<van-cell v-for="(data,index) in datas">
						<div>
							<span>订单号: {{data.order_no}}</span>
							<span style="float: right;">{{data.status}}</span>
						</div>
						<div>
							<span>支付宝: {{data.account}}</span>
						</div>
						<div>
							<span>金额: ¥ {{data.price}}</span>
							<span style="float: right;">{{data.add_time}}</span>
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
				lastIndex: 0,
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
			history(price, status, order_no, account, add_time) {
				var history = new Object();
				history.price = price;
				history.order_no = order_no;
				switch (status) {
					case 0:
						history.status = "待审核";
						break;
					case 1:
						history.status = "支付成功";
						break;
					case 2:
						history.status = "支付失败";
						break;
				}

				history.account = account;
				history.add_time = add_time;
				return history;
			},
			getData() {
				var that = this;
				post_(
					"level/pay-detail?access-token=" + localStorage.getItem('access-token'), {
						page:that.page,
						pageSize:that.pageSize
					},
					res => {
						if (res.success) {
							for (var i = 0; i < res.data.length; i++) {
								var data = res.data[i];
								that.datas.push(that.history(
									data.price,
									data.status,
									data.order_no,
									data.account,
									data.add_time
								))
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
		}

	}
</script>

<style>

</style>
