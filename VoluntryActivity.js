const express=require("express")
const app=express()
const mongoose =require('mongoose')
const ejs =require('ejs');
const bodyParser = require("body-parser");


mongoose.connect('mongodb://172.21.2.236:27017/190110910506');
const schema1={
    id:Number,
    username:{type:String,require:true},
    password:{type:String,require:true},
    sex:String,
    birth:String,
    organ:String,
    cardid:String,
    major:String,
    identity:String
}
const user=mongoose.model('t_user',schema1);
//数据库中即使一些列属性不存在仍然不影响存储
// const user1 = new user({id:9,username:'GGGGGG',password:'12345678', sex:'male',birth:'1980-01-01 00:00:00', organ:'', cardid:'', major:'学生'});
// user1.save();

const schema2={
    id:{type:Number,require:true},
    activityname:{type:String,require:true},
    username:{type:String,require:true},
    regtime:String,
    account:Number,//number替换
    situation:Number  //status替换
}
const apply=mongoose.model('t_apply',schema2);
// const apply1 = new apply({id:1, activityname:'杭州亚运会志愿者招募', username:'GGGGGG', regtime:'2021-06-23 13:24:58', account:1, situation:'1'});
// apply1.save();

const schema3={
    shunxu:{type:Number,require:true},
    id:{type:Number,require:true},
    name:{type:String,require:true},
    content:String,
    starttime:{type:String,require:true},
    endtime:{type:String,require:true},
    time:{type:String,require:true},
    address:String,
    capcity:{type:Number,require:true},
    host:{type:String,require:true}
}
const activity=mongoose.model('t_activity',schema3);
//注意require没用，即使许多；标注了非空也没有约束作用
// const activity1= new activity({ name:'杭州亚运会志愿者招募', content:'杭州亚运会运动会场馆检测口罩和体温', starttime:'2021-06-23 13:24:58',endtime:'2021-06-23 13:24:58', time:"",address:"浙江财经大学东操场", capcity:100,host:"浙江志愿者协会"});
// activity1.save();
mongoose.connection.on('conndcted',()=>{
    console.log('mongodb ok')
})

app.use('/',express.static('public'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended:false})); 
//进入页面
app.use("/index",(req,res,next)=>{
    console.log(req);
    ejs.renderFile('public/index.html',function(err, str){
        // str => 输出渲染后的 HTML 字符串
        if(err){console.log(err)}
        else{
            res.setHeader('Content-Type', 'text/html');
            res.end(str)
        }
    });
})
app.use("/loginhtml",(req,res,next)=>{
    console.log(req);
    
    ejs.renderFile('public/views/login.html',function(err, str){
        // str => 输出渲染后的 HTML 字符串
        if(err){console.log(err)}
        else{
            res.setHeader('Content-Type', 'text/html');
            res.end(str)
        }
    });
    
})
app.use("/reghtml",(req,res,next)=>{
    console.log(req);
    ejs.renderFile('public/views/reg.html',function(err, str){
        // str => 输出渲染后的 HTML 字符串
        if(err){console.log(err)}
        else{
            res.setHeader('Content-Type', 'text/html');
            res.end(str)
        }
    });
})

var nowuser=""
var nowpassword=""
app.get("/login",(req,res)=>{
    nowuser=String(req.query.username)
    nowpassword=String(req.query.password);
    console.log(nowuser)
    user.findOne({ username: nowuser},  function (err, user1) {
        if (err) return handleError(err);
        if(nowpassword == user1.password){
            if(user1.identity=='主办方'){
                ejs.renderFile('public/views/manager/volorganic.html',function(err, str){
                    // str => 输出渲染后的 HTML 字符串
                    if(err) {
                        console.log(err)
                    }else{
                        res.setHeader('Content-Type','text/html');
                        res.end(str)
                    }                          
                });
            }
            else{
                ejs.renderFile('public/views/activityapply.html',function(err, str){
                    // str => 输出渲染后的 HTML 字符串
                    if(err) {
                        console.log(err)
                    }else{
                        res.setHeader('Content-Type','text/html');
                        res.end(str)
                    }                          
                });
            }
        }
        else{
            console.log("your password is wrong");
            ejs.renderFile('public/views/login.html', {info:"用户名或密码错误"},function(err, str){
                // str => 输出渲染后的 HTML 字符串
                if(err) {
                    console.log(err)
                }else{
                    //  res.statusCode = 200;
                    res.setHeader('Content-Type','text/html');
                    res.end(str)
                }
            });
        }
    }
    );
    // next();
});
//注册后登录

app.get("/reg",(req,res)=>{
        reguser=req.query.username;
        regpassword=req.query.password;
        regsex=req.query.sex;
        regbirth=req.querybirth;
        reggroup=req.query.group;
        regcardid=req.query.cardid;
        regmajor=req.query.major;
        regidentity=req.query.identity;
       
        console.log(req.query)
        console.log(req.query.password);
        const userreg = new user({ username: reguser , password:regpassword , sex:regsex , birth:regbirth, 
                                        organ:reggroup, cardid:regcardid, major:regmajor, identity:regidentity});
        userreg.save().then(()=>console.log('注册成功'))
        ejs.renderFile('public/views/login.html', function(err, str){
            // str => 输出渲染后的 HTML 字符串
            if(err){console.log(err)}
            else{
                res.setHeader('Content-Type', 'text/html');
                res.end(str)
            }
        }); 
})

app.use("/volorganic",(req,res,next)=>{
    // console.log(req);
    // if(nowuser==""){
    //     ejs.renderFile('public/index.html', function(err, str){
    //         // str => 输出渲染后的 HTML 字符串
    //         if(err){console.log(err)}
    //         else{
    //             res.setHeader('Content-Type', 'text/html');
    //             res.end(str)
    //         }
    //     }); 
    // }
    // else{
    // user.find({username:nowuser}, function (err, use1){
    //     if (err) return handleError(err);
    //     if(user1.identity=="主办方"){
            ejs.renderFile('public/views/volorganic.html', function(err, str){
                // str => 输出渲染后的 HTML 字符串
                if(err){console.log(err)}
                else{
                    res.setHeader('Content-Type', 'text/html');
                    res.end(str)
                }
            }); 
        // }
        // else{
        //     ejs.renderFile('public/views/useractivity.html', function(err, str){
        //         // str => 输出渲染后的 HTML 字符串
        //         if(err){console.log(err)}
        //         else{
        //             res.setHeader('Content-Type', 'text/html');
        //             res.end(str)
        //         }
        //     }); 
            

        
//     })
// }
})

//查询所有活动报名信息
app.get("/activity",(req,res)=>{
  
    aid=req.query.id;
    aname=req.query.aname;
    acontent=req.query.content;
    aaddress=req.query.address;
    atime=req.query.atime;
    astarttime2=req.query.starttime2;
    aendtime2=req.query.aendtime2;
    atime=req.query.time
    acapcity=req.query.capcity;
   
    console.log(req.query)
    const addactivity = new activity({ id:aid,name:aname,content:acontent,addres:aaddress,time:atime,starttime:astarttime2,
    endtime:aendtime2,time:atime,capcity:acapcity});
    addactivity.save().then(()=>console.log('活动添加成功'))
    ejs.renderFile('public/views/volactivity.html', function(err, str){
        // str => 输出渲染后的 HTML 字符串
        if(err){console.log(err)}
        else{
            res.setHeader('Content-Type', 'text/html');
            res.end(str)
        }
    }); 
})
app.use("/applyActivity",(req,res,next)=>{
    apply.find({}, function (err, apply1) {
        ejs.renderFile('public/views/activityapply.html', {info:apply1},function(err, str){
            // str => 输出渲染后的 HTML 字符串
            if(err){console.log(err)}
            else{
                res.setHeader('Content-Type', 'text/html');
                res.end(str)
            }
        });
    })
})
app.use("/applyuser",(req,res,next)=>{
    user.find({}, function (err, user1) {
        ejs.renderFile('public/views/useractivity.html', {info:user1},function(err, str){
            // str => 输出渲染后的 HTML 字符串
            if(err){console.log(err)}
            else{
                res.setHeader('Content-Type', 'text/html');
                res.end(str)
            }
        });
    })
})
app.use("/userActivity",(req,res,next)=>{
    user.find({}, function (err, user1) {
        ejs.renderFile('public/views/useractivity.html', {info:user1},function(err, str){
            // str => 输出渲染后的 HTML 字符串
            if(err){console.log(err)}
            else{
                res.setHeader('Content-Type', 'text/html');
                res.end(str)
            }
        });
    })
})


// app.use("/dorsearch",(req,res,next)=>{
//     if (searchDor==""){
        
app.use("/activity",(req,res,next)=>{
    activity.find({},function(err,activity1){
        ejs.renderFile('public/htmls/volactivity.html',{activityinfo:activity1},function(err, str){
            // str => 输出渲染后的 HTML 字符串
            if(err){console.log(err)}
            else{
                res.setHeader('Content-Type', 'text/html');
                res.end(str)
            }
        });
    })
})

app.listen(30506)