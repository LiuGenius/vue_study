import Vue from 'vue'
import App from './App.vue'
import router from './router'


//引入文件

import {
	Swipe,
	SwipeItem,
	Image,
	Icon,
	Tab,
	Tabs,
	List,
	Cell,
	Sticky,
	PullRefresh,
	Field,
	CellGroup,
	Button
} from 'vant';


import 'vant/lib/image/style';
import 'vant/lib/field/style';
import 'vant/lib/swipe/style';
import 'vant/lib/swipe-item/style';
import 'vant/lib/tabs/style';
import 'vant/lib/tab/style';
import 'vant/lib/list/style';
import 'vant/lib/cell/style';
import 'vant/lib/pull-refresh/style';
Vue.use(Swipe)
	.use(SwipeItem)
	.use(Image)
	.use(Icon)
	.use(Tab)
	.use(Tabs)
	.use(List)
	.use(Cell)
	.use(Sticky)
	.use(PullRefresh).use(Field).use(CellGroup).use(Button);

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
