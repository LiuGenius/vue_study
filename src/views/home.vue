<template>
	<div id="app" style="height: 100%;width: 100%;line-height: 100%;">

		<div @click="goMenu(1)" style="height: 200px;width: 100%;background: #0570DB;
		text-align: center;
		line-height: 200px;
		font-size: 50px;
		color: #FFFFFF;">
			放松
		</div>
		<div @click="goMenu(2)" style="height: 200px;width: 100%;background: #07C160;
		text-align: center;
		line-height: 200px;
		font-size: 50px;
		color: #FFFFFF;">
			冥想
		</div>
	</div>

</template>

<script>
	

	export default {
		mounted() {
			
		},
		methods: {
			goMenu(tag){
				var that = this;
				if(tag == 1){
					that.$router.push({path:'playmusic'});
				}else{
					that.$router.push({path:'musicplay'});
				}
			},
		},
		data() {
			return {
				
			}
		},
	}
</script>

<style>

</style>
