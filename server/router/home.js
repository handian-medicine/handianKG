const express = require("express")
const request = require("request")
const router = express.Router()
var myConst = require("./const")

router.post('/', function (req, res, next) {
    options = {
        url:myConst.apiurl + "/users/login/",
        form:{
            email: req.cookies.user.email,
            password: req.cookies.user.password
        },
        headers: {'Authorization': 'Bearer ' + req.cookies.usertoken.access_token}
    }
    console.log("home.js 进入流程",options)
    request.post(options, function (error, response, body) {
        console.log("home.js request.post的body",body)
        var bodyParse = JSON.parse(body)
        res.cookie("userid", {"id": bodyParse.id}, {maxAge: 1000 * 60 * 60 * 4, httpOnly: true});
        var newoptions = {
            url: bodyParse.url,
            headers: {'Authorization': 'Bearer ' + req.cookies.usertoken.access_token}
        }
        // get http://47.94.22.221:9002/users/4/ usertoken
        // 返回 该用户所有个人信息,包括参与的所有项目
        request.get(newoptions, function (error, response, body) {
            var userinfo = JSON.parse(body)
            console.log("home.js request.get的userinfo",userinfo)
            res.send({msg:'ok',userinfo:userinfo})
        })

    })

})

// const token = 'bzR7HXtfCr9zneFt2MzTHO8FAdiLvt'
router.post('/product_list', function (req, res, next) {
    options = {
        url:myConst.apiurl + "/product/",
        form:{
        },
        // 产品列表展示不需要token
        // headers: {'Authorization': 'Bearer ' + token}
        // headers: {'Authorization': 'Bearer ' + req.cookies.usertoken.access_token}
    }
    // console.log(req.cookies.usertoken.access_token)
    request.get(options, function (error, response, body) {
        var product_list = JSON.parse(body)
        console.log("home.js product_list:",product_list.results)
        res.send({msg:'ok',data:product_list.results})

    })
})
router.post('/product_graph', function (req, res, next) {
    if (req.cookies.usertoken != undefined) {
        options = {
            url:myConst.apiurl + "/product/" + req.body.id, //+ "/relationships/",
            form:{
            },
            // headers: {'Authorization': 'Bearer ' + token}
            headers: {'Authorization': 'Bearer ' + req.cookies.usertoken.access_token}
        }
        request.get(options, function (error, response, body) {
            var product_graph = JSON.parse(body)
            console.log("home.js product_graph:",product_graph)
            res.send({msg:'ok',data:product_graph})
        })
    } else {
        res.send({msg:'请先登录'})
    }
})
router.post('/product_literature', function (req, res, next) {
    if (req.cookies.usertoken != undefined) {
        // console.log("req.cookies.usertoken.access_token::",req.cookies.usertoken.access_token)
        options = {
            url:myConst.apiurl + "/product/" + req.body.id + "/literatures/",
            form:{},
            // headers: {'Authorization': 'Bearer ' + token}
            headers: {'Authorization': 'Bearer ' + req.cookies.usertoken.access_token}
        }
        request.get(options, function (error, response, body) {
            var literature = JSON.parse(body)
            const NUM = 10
            // console.log("home.js literature:",literature)
            res.send({msg:'ok',data:literature.slice(0,NUM)})
        })
    } else {
        console.log("没有登录");
        res.send({msg:'请先登录'})
    }

})
router.post('/literature_content', function (req, res, next) {
    options = {
        url:req.body.url,
        form:{},
        // headers: {'Authorization': 'Bearer ' + token}
        headers: {'Authorization': 'Bearer ' + req.cookies.usertoken.access_token}
    }
    request.get(options, function (error, response, body) {
        var literature = JSON.parse(body)
        // console.log("home.js literature:",literature)
        res.send({msg:'ok',data:literature})

    })
})
router.post('/term_content', function (req, res, next) {
    options = {
        url:req.body.url,
        form:{},
        // headers: {'Authorization': 'Bearer ' + token}
        headers: {'Authorization': 'Bearer ' + req.cookies.usertoken.access_token}
    }
    request.get(options, function (error, response, body) {
        var literature = JSON.parse(body)
        // console.log("home.js literature:",literature)
        res.send({msg:'ok',data:literature})

    })
})
router.post('/enter_search', function (req, res, next) {
    if (req.cookies.usertoken != undefined) {
        res.send({msg:'ok'})
    } else {
        res.send({msg:'请先登录'})
    }
})
module.exports = router
