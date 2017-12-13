//var cheerio=require("cheerio");
var http=require("http");

var googleUrl="http://maps.google.com/maps/api/geocode/json?sensor=true&latlng="

var wei=30.745087750483506,jing=-122.50371077810719//默认地址

process.stdin.setEncoding('utf8')


var server=http.createServer(function(req,res){
	res.writeHead(200,{
		"content-type":"text/html"
	})
	
	//res.write(req.url+"<br>")
	var urlJson={}//url传入参数对象
	try{
		urlJson=url2Json(req.url)
		wei=urlJson.wei||1
		jing=urlJson.jing||1
	}catch(e){
		wei=33,jing=-120
	}
	
//res.write(wei+"") //调试用
//res.write(JSON.stringify(urlJson))


	http.get(googleUrl+wei+","+jing,function(sres){
		var json=""
		sres.on('data',function(data){
			json+=data.toString('utf8')//确定编码
		});
		console.log(googleUrl+wei+","+jing+"\n"+req.url)
		sres.on("end",function(){
			var addJson=JSON.parse(json)
			if(addJson.status.firstUpperCase()=="OK".firstUpperCase()){
				
				var outPutString=urlJson.callback+"({result:'"+getLocation(addJson,urlJson.format)+"',status:'Success'})"//城市
//res.write(urlJson.format+"<br>")	

				console.log(outPutString)
				console.log("******************************************************************************************************************")
				res.write(outPutString);  
			}else{

				console.log(urlJson.callback+"({result:'',status:'"+addJson.status+"'})")
				console.log("******************************************************************************************************************")
				
				
				res.write(urlJson.callback+"({result:'',status:'"+addJson.status+"'})")
			}
			//res.write(googleUrl+wei+","+jing+"<br>"+json);
			//res.write((addJson.results[0].formatted_address));
			res.end() 
		})
	})
	
}).listen(8888)



/**
 * getLocation(json, flag)  
 * 返回google json 的数值
 * (不区分大小写)flag:
 * 	1 或者 "Address"		是 详细地址
 *  2 或者 "Street" 		是街道
 * 	3 或者 "city" 		是城市 ; 
 *  4 或者 "State" 		是州
 *  5 或者 "Zip" 			是zip code
 *  6 或者"Country"     是国家
 * 	不写 或者"json"		是整个google json
 * */
function getLocation(json, flag) {
	var tjson=json;
	var tflag=(flag+"").trim().firstUpperCase()
	var address = tjson.results[0].formatted_address
	var returnString=""
	
	try{
		if(tflag=="3" || tflag=="City"){//城市
			returnString= address.split(',')[1]
		}else if(tflag=="1" || tflag=="Address"){//全地址
			returnString= address
		}else if(tflag=="2" || tflag=="Street"){ //街道
			returnString= address.split(",")[0]
		}else if(tflag=="4" || tflag=="State"){ //州
			returnString= address.split(",")[2].trim().split(" ")[0]
		}else if(tflag=="5" || tflag=="Zip"){ //zip code
			returnString= address.split(",")[2].trim().split(" ")[1]
		}else if(tflag=="6" || tflag=="Country"){ //国家
			returnString= address.split(",")[3]
		}else if(tflag=="Json"){
			returnString= JSON.stringify(tjson)
		}else{
			returnString= JSON.stringify(tjson)
		}
	}catch(e){
		returnString= JSON.stringify(tjson)
	}
	
	try{
		returnString=returnString.trim()
	}catch(e){
		returnString=returnString
	}
	
	return returnString
}


/*
 *将url 转化成json; return 一个json 对象
 * */
function url2Json(url){
	var json="{"
	try{
		var curl = url
		if (curl.indexOf("/?")!=-1) curl=curl.split("/?")[1]//判断是否包含头的/?
		var arr = curl.split("&")
		for(var i=0;i<arr.length;i++){
			var jkey=arr[i].split("=")[0]
			var jvalue=arr[i].split("=")[1]
			json+='"'+jkey+'":"'+jvalue+'",'
		}
	}catch(e){
		
	}
	json+="'end':null})"
	return eval("("+json)
}

//首字母大写
String.prototype.firstUpperCase = function(){
    return this.replace(/\b(\w)(\w*)/g, function($0, $1, $2) {
        return $1.toUpperCase() + $2.toLowerCase();
    });
}
/*
//去掉首尾空格
String.prototype.trim() = function(){
	return this.replace(/(^\s*)|(\s*$)/g,"");
}
*/