

function url2Json(url){
	var json="{"
	try{
		var arr = url.split("&")
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

//去掉首尾空格
//String.prototype.trim = function(){
//	return this.replace(/(^\s*)|(\s*$)/g,"");
//}


console.log("    11   11".trim())
