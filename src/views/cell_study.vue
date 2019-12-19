<template>
	<div id="nav">
		<van-cell-group>
			<van-cell title="单元格" value="内容" />
			<van-cell title="单元格" value="内容" label="描述信息" />
		</van-cell-group>
		
		<van-cell title="单元格" value="内容" size="large" />
		<van-cell title="单元格" value="内容" size="large" label="描述信息" />
	</div>
</template>

<script>
	import Vue from 'vue';
	import {
		Cell,
		CellGroup
	} from 'vant';
	import 'vant/lib/cell/style';
	Vue.use(Cell).use(CellGroup);
	export default {

	}
</script>

<style scoped>

</style>
