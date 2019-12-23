import axios from 'axios'

//这里api是代理flag,通过这个api告诉webpack把请求发到3000端口,即express后端
let baseUrl = ''
if (process.env.NODE_ENV === "development") {
    baseUrl = 'http://127.0.0.1:8080/api/api' //开发环境用
} else {
    baseUrl = '/api'
}


// 登录
export const apiLogin = params => { return axios.post(`${baseUrl}/login`, params).then(res => res.data) }
//找回密码
export const apiSendEmail = params => { return axios.post(`${baseUrl}/login/sendemail`, params).then(res => res.data) }
//修改密码
export const apiChangePassword = params => { return axios.post(`${baseUrl}/password`, params).then(res => res.data) }

//主页
export const apiHome = params => { return axios.post(`${baseUrl}/home`, params).then(res => res.data) }
//产品列表
export const apiProductList = params => { return axios.post(`${baseUrl}/home/product_list`, params).then(res => res.data) }
//产品图谱
export const apiProductGraph = params => { return axios.post(`${baseUrl}/home/product_graph`, params).then(res => res.data) }
//产品相关文献
export const apiProductLiterature = params => { return axios.post(`${baseUrl}/home/product_literature`, params).then(res => res.data) }
//文献详细页面
export const apiLiteratureContent = params => { return axios.post(`${baseUrl}/home/literature_content`, params).then(res => res.data) }
//术语页面
export const apiTermContent = params => { return axios.post(`${baseUrl}/home/term_content`, params).then(res => res.data) }

//搜索页面
export const apiEnterSearch = params => { return axios.post(`${baseUrl}/home/enter_search`, params).then(res => res.data) }
