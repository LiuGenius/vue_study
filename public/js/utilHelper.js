import axios from 'axios'

export let H_url = 'http://fans.20b.me/v1/'

//post_请求
export function post_(url,data,callback){
    var qs = require("querystring")
    data = qs.stringify(data)
	axios.post(H_url+url,data).then((response)=>{
		callback(response.data)
	})
}