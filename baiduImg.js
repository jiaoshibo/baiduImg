var http=require('http');
var https=require('https')
var fs=require('fs');
var cheerio=require('cheerio');

var wz='http://images.baidu.com/';


var strHtml='';
//解析网址
http.get(wz,(res)=>{
	res.on('data',(chunk)=>{
		strHtml+=chunk;
	});
	
	res.on('end',()=>{
		var $=cheerio.load(strHtml);
		var imgdata=[];
		$('.img_single_box img').each(function(index,item){
			imgdata.push($(item).attr('src'))
			
		});

		//解析图片并保存
		function saveImage(imgdata){
			https.get(imgdata,(res)=>{
				res.setEncoding('binary');
				var data='';
				res.on('data',(a)=>{
					data+=a;
				}).on('end',()=>{
					if(!fs.existsSync('./images')){
						fs.mkdirSync('./images');
					};
					fs.writeFile('images/'+Math.random()+'.png',data,'binary',(err)=>{
						if(!err)
						console.log('成功')
					})
				})
			});
		}

		for(var i=0;i<imgdata.length;i++){
			saveImage(imgdata[i]);
		}
		
	})
})
