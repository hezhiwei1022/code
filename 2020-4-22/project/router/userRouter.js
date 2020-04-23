const express = require("express");
const DB = require("./sqlConfig");//引用MySQL
const route = express.Router();

route.post("/login.do",function (request,response) {
    var userNameVal = request.body.userName;
    var pwdVal = request.body.pwd;
    let sql = `select * from user where u_name=? AND u_pwd=?`;
    DB(sql,[userNameVal,pwdVal],function (err,data) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
        }else {
            if(data.length==0){
                response.send("用户或密码不存在");
            }else {
                response.send("登陆成功");
            }
        }
    })
})

route.post("/reg.do",function (request,response) {
    var userNameVal = request.body.userName;
    var pwdVal = request.body.pwd;
    let sql = `insert into user(u_name,u_pwd) values(?,?)`;
    DB(sql,[userNameVal,pwdVal],function (err,data) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
        }else {
           if (data.affectedRows>0){
               response.send("添加成功");
           }else {
               response.send("添加失败");
           }
        }
    })
})


route.get("/studentManage.do", function (request,response) {
    let sql = `select * from t_student`;
    DB(sql,[],function (err,data) {
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
        }else {
           response.send(data)
        }
    })
})

module.exports = route;