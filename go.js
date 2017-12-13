var http=require("http");

var server=http.createServer(function(req,res){
	res.writeHead(200,{
		"content-type":"text/html"
	})
	http.get(url+x+","+y,function(sres){
		var json=""
		sres.on('data',function(data){
			json+=data.toString('utf8')
		});
		sres.on("end",function(){
			res.write((JSON.parse(json).results[0].formatted_address.split(',')[1]));
			res.end() 
		})
	})
	
}).listen(8888)


	


//首字母大写
String.prototype.firstUpperCase = function(){
    return this.replace(/\b(\w)(\w*)/g, function($0, $1, $2) {
        return $1.toUpperCase() + $2.toLowerCase();
    });
}