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
	Button,Tabbar, TabbarItem,NavBar,Dialog,Tag,Grid, GridItem 
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
import 'vant/lib/tabbar/style';
import 'vant/lib/tabbar-item/style';
import 'vant/lib/nav-bar/style';
import 'vant/lib/toast/style';
import 'vant/lib/dialog/style';
import 'vant/lib/tag/style';
import 'vant/lib/grid/style';
import 'vant/lib/grid-item/style';
Vue.use(Swipe)
	.use(SwipeItem)
	.use(Image)
	.use(Icon)
	.use(Tab)
	.use(Tabs)
	.use(List)
	.use(Cell)
	.use(Sticky)
	.use(PullRefresh).use(Field).use(CellGroup)
	.use(Button).use(Tabbar).use(TabbarItem).use(NavBar).use(Dialog)
	.use(Grid).use(GridItem).use(Tag);

Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')
