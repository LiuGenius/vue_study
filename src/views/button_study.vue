<template>
	<div id="nav" style="text-align: center;">

		<p>BUTTON 学习</p>
		<van-button v-bind:disabled="isDisabled" v-bind:plain="isPlain" v-bind:loading="isLoading" type="default">{{btn1}}</van-button>
		<van-button v-bind:disabled="isDisabled" v-bind:plain="isPlain" v-bind:loading="isLoading" type="primary">{{btn2}}</van-button>
		<van-button v-bind:disabled="isDisabled" v-bind:plain="isPlain" v-bind:loading="isLoading" type="info">{{btn3}}</van-button>
		<van-button v-bind:disabled="isDisabled" v-bind:plain="isPlain" v-bind:loading="isLoading" type="warning">{{btn4}}</van-button>
		<van-button v-bind:disabled="isDisabled" v-bind:plain="isPlain" v-bind:loading="isLoading" type="danger">{{btn5}}</van-button>

		<p style="width: 100%;border-bottom: #42B983 solid 2px;"></p>


		<div>
			<van-button @click="clickBtn(1)" type="default">设为等待</van-button>
			<van-button @click="clickBtn(2)" type="default">设为禁用</van-button>
			<van-button @click="clickBtn(3)" type="default">设为朴素</van-button>
			<van-button @click="clickBtn(4)" type="default">恢复正常</van-button>
		</div>
	

	</div>

</template>

<script>
	import Vue from 'vue';
	import Button from 'vant/lib/button';
	import 'vant/lib/button/style';

	Vue.use(Button);
	export default {
		methods: {
			clickBtn: function(tag) {
				var that = this;
				switch (tag) {
					case 1:
						that.isLoading = true;
						that.isPlain = false;
						that.isDisabled = false;
						break;
					case 2:
						that.isLoading = false;
						that.isPlain = false;
						that.isDisabled = true;
						break;
					case 3:
						that.isLoading = false;
						that.isPlain = true;
						that.isDisabled = false;
						break;
					case 4:
						that.isLoading = false;
						that.isPlain = false;
						that.isDisabled = false;
						break;
				}
			}
		},
		data() {
			return {
				btn5: '危险按钮',
				btn4: '警告按钮',
				btn3: '信息按钮',
				btn2: '主要按钮',
				btn1: '默认按钮',
				isLoading: false,
				isPlain: false,
				isDisabled: false
			}
		}
	}
</script>

<style scoped>
	button {
		margin-left: 20px;
		margin-top: 20px;
		width: 30%;
	}
</style>
