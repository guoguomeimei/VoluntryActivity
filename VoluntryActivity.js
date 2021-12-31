const express=require("express")
const app=express()
const mongoose =require('mongoose')
const ejs =require('ejs')

mongoose.connect('mongodb://172.21.2.236:27017/190110910506');
const schema1={
    id:{type:Number,require:true},
    username:{type:String,require:true},
    password:{type:String,require:true},
    sex:String,
    birth:String,
    organ:String,
    cardid:String,
    major:String,
    identity:String
}
// const user=mongoose.model('t_user',schema1);
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
// const apply=mongoose.model('t_apply',schema2);
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

// const activity=mongoose.model('t_activity',schema3);
// //注意require没用，即使许多必选项没有写入也能够写入mongoose
// const activity1= new activity({ name:'杭州亚运会志愿者招募', content:'杭州亚运会运动会场馆检测口罩和体温', starttime:'2021-06-23 13:24:58',endtime:'2021-06-23 13:24:58', time:"",address:"浙江财经大学东操场", capcity:100,host:"浙江志愿者协会"});
// activity1.save();



// mongoose.model('Cat',schema)

// const Cat = mongoose.model('Cat', schema);
// //model名.find({查询条件}，callback(err,查询结果)=>{}) 
// var i=0;
// app.use('/',express.static('public'))
// app.get("/BtCount",(req,res)=>{i++;res.send(i.toString())})
app.listen(30506)