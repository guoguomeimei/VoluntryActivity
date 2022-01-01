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
app.use(express.json())
app.use(express.urlencoded({extended:false})); 
// mongoose.model('Cat',schema)

// const Cat = mongoose.model('Cat', schema);
// //model名.find({查询条件}，callback(err,查询结果)=>{}) 
// var i=0;
// app.use('/',express.static('public'))
app.get("/index",(req,res,next)=>{
    console.log(req);
    res.send('主页')
})
app.use("/activity",(req,res,next)=>{
    ejs.renderFile('public/htmls/volactivity.html',function(err, str){
        // str => 输出渲染后的 HTML 字符串
        if(err){console.log(err)}
        else{
            res.setHeader('Content-Type', 'text/html');
            res.end(str)
        }
    });
})







// public class UserService {

// 	public static Connection getConnection() {

// 		Connection conn = null;
// 		try {
// 			Class.forName("com.mysql.jdbc.Driver");
// 			// ÊýŸÝ¿âµØÖ·
// 			String url = "jdbc:mysql://localhost:3306/db506?useUnicode=true&characterEncoding=utf8";
// 			String user = "root";
// 			String pass = "123456";
// 			conn = DriverManager.getConnection(url, user, pass);
// 		} catch (ClassNotFoundException e) {
// 			e.printStackTrace();
// 			System.out.println("ÊýŸÝ¿âÇý¶¯ŽíÎó£¡");
// 		} catch (SQLException e) {
// 			e.printStackTrace();
// 			System.out.print("ÊýŸÝ¿âSQLŽíÎó£¡");
// 		}
// 		return conn;
// 	}

// 	/**
// 	 * žùŸÝusernameºÍpasswordœøÐÐµÇÂœ
// 	 * @param username
// 	 * @param password
// 	 * @return
// 	 */
// 	public static boolean userLogin(String username, String password) {

// 		try {

// 			Connection conn = UserService.getConnection();

// 			QueryRunner qr = new QueryRunner();

// 			String sql = "select count(*) from t_user where username=? and password=?  ";

// 			Long r = qr.query(conn, sql, new ScalarHandler<Long>(), username, password);

// 			if (r > 0) {

// 				return true;

// 			} else {

// 				return false;

// 			}

// 		} catch (SQLException e) {
// 			e.printStackTrace();
// 			System.out.print("ÊýŸÝ¿âSQLŽíÎó£¡");

// 			return false;
// 		}

// 	}

// 	/**
// 	 * ×¢²áœçÃæ
// 	 * @param username
// 	 * @param password
// 	 * @param sex
// 	 * @param major
// 	 */
// 	public static void addUser(String username,

// 			String password, String sex,Date birth, String organ, String cardid, String major, String identity) {
// 		// TODO Auto-generated method stub

// 		try {
// 			Class.forName("com.mysql.jdbc.Driver");

// 			// ÊýŸÝ¿âµØÖ·
// 			String url = "jdbc:mysql://localhost:3306/db506?useUnicode=true&characterEncoding=utf8";
// 			String user = "root";
// 			String pass = "123456";
// 			Connection conn;
// 			conn = DriverManager.getConnection(url, user, pass);
// 			QueryRunner qr = new QueryRunner();
							
// 			String sql = "insert into t_user(username,password,sex,birth,organ,cardid,major,identity) values(?,?,?,?,?,?,?,?)";
// 			qr.update(conn, sql, username, password, sex, birth,organ, cardid, major, identity);

// 		} catch (ClassNotFoundException e) {
// 			e.printStackTrace();

// 		} catch (SQLException e) {
// 			e.printStackTrace();
// 			System.out.println("ÊýŸÝ¿âsqlŽíÎó");
// 		}

// 	}
	
// 	/**
// 	 * ²åÈëÒ»Ôò»î¶¯£¬Á¬œÓ»î¶¯×éÖ¯œçÃæ
// 	 * žùŸÝÒ»ÏÂ²ÎÊýœøÐÐ×¢²áÒ»Ôò»î¶¯
// 	 * @param id
// 	 * @param name
// 	 * @param content
// 	 * @param starttime
// 	 * @param endtime
// 	 * @param time
// 	 * @param address
// 	 * @param capcity
// 	 * @param host
// 	 */
// 	public static void addOrganic(String id,String name,

// 			String content, Date starttime,Date endtime, String time, String address, String capcity, String host) {
// 		// TODO Auto-generated method stub

// 		try {
// 			Class.forName("com.mysql.jdbc.Driver");

// 			// ÊýŸÝ¿âµØÖ·
// 			String url = "jdbc:mysql://localhost:3306/db506?useUnicode=true&characterEncoding=utf8";
// 			String user = "root";
// 			String pass = "123456";
// 			Connection conn;
// 			conn = DriverManager.getConnection(url, user, pass);
// 			QueryRunner qr = new QueryRunner();		
// 			String sql = "insert into t_activity(id,name,content,starttime,endtime,time,address,capcity,host) values(?,?,?,?,?,?,?,?,?)";
// 			qr.update(conn, sql, id,name,content,starttime,endtime,time,address,capcity,host);

// 		} catch (ClassNotFoundException e) {
// 			e.printStackTrace();

// 		} catch (SQLException e) {
// 			e.printStackTrace();
// 			System.out.println("ÊýŸÝ¿âsqlŽíÎó");
// 		}

// 	}

	
	
// //ËùÓÐ»î¶¯µÄÐÅÏ¢ŽÓTActivtyŸ­¹ýUserServiceÒ»ÏÂº¯Êý·â×°ºó×ªµœvolactivity
// 	/*
// 	 * ËùÓÐÐÅÏ¢»î¶¯ºÍ±šÃûµÄÐÅÏ¢
// 	 */
// 	public static List<TActivity> getAllactivity() {

// 		Connection conn = UserService.getConnection();
// 		QueryRunner qr = new QueryRunner();

// 		String sql = "select v.id,v.`name`,v.content,v.host,v.starttime,v.endtime,v.time,v.address,v.capcity,username from t_activity v left join t_apply p on v.`name`=p.activityname";
		
// 		List<TActivity> activityList = null;
// 		try {
// 			activityList = qr.query(conn, sql, new BeanListHandler<TActivity>(TActivity.class));
		
// 		} catch (SQLException e) {
// 			e.printStackTrace();
// 			System.out.println("ÊýŸÝ¿âSQLŽíÎó");

// 		}
// 		return activityList;
// 	}
	
	
// 	/**
// 	 * ²éÑ°ËùÓÐµÄ»î¶¯±šÃûŒÇÂŒ£¬°üº¬ËùÓÐµÄÓÃ»§±šÃûÐÅÏ¢
// 	 * @return
// 	 */
	
	
// 	public static List<ApplyActivity> getAllApply() {

// 		Connection conn = UserService.getConnection();
// 		QueryRunner qr = new QueryRunner();

// 		String sql = "select activityname,username,regtime from t_apply";
		
// 		List<ApplyActivity> applyList = null;
// 		try {
// 			applyList = qr.query(conn, sql, new BeanListHandler<ApplyActivity>(ApplyActivity.class));
		
// 		} catch (SQLException e) {
// 			e.printStackTrace();
// 			System.out.println("ÊýŸÝ¿âSQLŽíÎó");

// 		}
// 		return applyList;
// 	}
	

// 	/*
// 	 * ¶ÔµÇÂœÓÃ»§²éÑ¯ÓÃ»§ÒÑŸ­±šÃûµÄ»î¶¯
// 	 * 把用户activity中的信息
// 	 */
// 	public static List<UserActivity> queryUserActivity(String username) {

// 		Connection conn = UserService.getConnection();
// 		QueryRunner qr = new QueryRunner();

// 		String sql = "select p.id,p.activityname,v.content,v.`host`,v.time,v.address,v.capcity,p.regtime from t_apply  p LEFT JOIN t_activity v on v.`name`=p.activityname where username=?";
// 		List<UserActivity> useractivityList = null;
// 		try {
// 			useractivityList = qr.query(conn, sql, new BeanListHandler<UserActivity>(UserActivity.class),username);
			
// 		} catch (SQLException e) {
// 			e.printStackTrace();
// 			System.out.println("ÊýŸÝ¿âSQLŽíÎó");

// 		}
// 		return useractivityList;
// 	}
// 	/*
// 	 * 取消报名时对申请表的操作
// 	 */
// 	public static void invalidUser(String activityname,String username) {
// 		Connection conn = UserService.getConnection();

// 		QueryRunner qr = new QueryRunner();
// 		String sql = "delete from t_apply where username=? and activityname=?";
// 		try {
// 			qr.update(conn, sql, username,activityname);
// 		} catch (SQLException e) {
// 			e.printStackTrace();
			
// 		}
		
// 	}么他和哦qr = new QueryRunner();
// 		String sql = "UPDATE t_activity SET capcity=capcity+1 where activityname=?";
// 		try {
// 			qr.update(conn, sql, activityname);
// 		} catch (SQLException e) {
// 			e.printStackTrace();
			
// 		}
// 	}
	
// 	/*
// 	 * 用户报名需要增加信息进入系统
// 	 */
// 	public static void applyUser(String activityname, String username) {
// 		// TODO Auto-generated method stub
// 		Connection conn = UserService.getConnection();

// 		QueryRunner qr = new QueryRunner();
// 		String sql = "INSERT INTO t_apply (activityname, username, regtime) VALUES (?, ?, NOW());";
// 		try {
// 			qr.update(conn, sql, activityname,username);
// 		} catch (SQLException e) {
// 			e.printStackTrace();
			
// 		}
		
// 	}

// 	/*
// 	 * 减少已报名数量，因为用户取消报名
// 	 */
// 	public static void decreaseCapcity(String activityname) {
// 		// TODO Auto-generated method stub
// 		Connection conn = UserService.getConnection();

// 		QueryRunner qr = new QueryRunner();
// 		String sql = "UPDATE t_activity SET capcity=capcity-1 where name=?";
// 		try {
// 			qr.update(conn, sql, activityname);
// 		} catch (SQLException e) {
// 			e.printStackTrace();
			
// 		}
		
// }
app.listen(30506)