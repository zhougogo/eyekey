$(function(){
    //判断设备
    var platfrom = navigator.userAgent;
    var regplatfrom = /iPhone/gi;
    console.log("IOS");
    if(!regplatfrom.test(platfrom)) {
        console.log("Android");
        $("#file").attr("accept", "image/*");
        $("#file").attr("capture", "camera");
        $("#file2").attr("accept", "image/*");
        $("#file2").attr("capture", "camera");
    }
	// 第一页跳转第二页
	$('.page1 .btn').click(function(){
		$('.page2').show().siblings().hide();
	})
	//对勾切换
	$('.page2 .look').click(function(){
		$(this).toggleClass('selected').siblings().removeClass('selected');
		var dex = $(this).index();
		$('.page3 .xk img').attr('src','images/'+(dex+1)+'.png');
		$('.page4 .xk img').attr('src','images/'+(dex+1)+'.png');
        $('.page6 .xk img').attr('src','images/'+(dex+1)+'.png');
        $('.page7 .xk img').attr('src','images/'+(dex+1)+'.png');
		$('.page8 .star').attr('src','images/'+(dex+1)+'.png');
		$('.page2 .okBtn').click(function(){
			$('.page3').show().siblings().hide();
		})
	})
	// 第三页跳转第四页
    var face_id1 = "";
    var face_id2 = "";
    var index;
	$('.page3 input').change(function(){
	    var data = new FormData();
	    data.append('image',$('#file')[0].files[0]);
        jQuery.ajax({
            type: "POST",
            url: "http://api.touchworld-sh.com:8000/api/image/upload",//检测有效后会由系统生成唯一的face_id
            cache: false,
            processData: false,
            contentType: false,
            data: data,
        }).done(function(res){
            face_id2 = res;
        }).fail(function(res){
            console.log(res);
        });
        index = 0;
		$('.page3').hide();
		var photo= new FileReader();
		file=document.getElementById('file').files[0];
		photo.readAsDataURL(file);
		photo.onload=function(e) {
			document.getElementById('show').src=this.result;
			/*相似度比较*/
            var f1 = $('.page4 .xk img')[0];
            var f2 = $('.page4 .photo img').attr('src');
                f1 = f1.getAttribute('src').substr(f1.getAttribute('src').indexOf('png')-2,1)
                if(f1 == 1){
                    face_id1 = 'http://api.touchworld-sh.com:8000/face/face_1.png'
                }
                if(f1 == 2){
                    face_id1 = 'http://api.touchworld-sh.com:8000/face/face_2.png'
                }
                if(f1 == 3){
                    face_id1 = 'http://api.touchworld-sh.com:8000/face/face_3.png'
                }
                if(f1 == 4){
                    face_id1 = 'http://api.touchworld-sh.com:8000/face/face_4.png'
                }
            // f1 = getBase64Image(f1);
            // face_id1 = f1.substring(f1.indexOf(',') + 1);
            face_id2 = f2.substring(f2.indexOf(',') + 1);
            check_info(face_id1,face_id2);
            $('.page4').show().siblings().hide();
		}
	});
	// 第四页跳转第五页
	$('.page4 .btn').click(function(){
        $('.page5').show().siblings().hide();
	});
    // 第五页跳转第六页
    $('.page5 .btn').click(function(){
        $('.page6').show().siblings().hide();
    });
    // 第六页跳转第七页
    var face_id3 = "";
    $('.page6 input').change(function(){
        var data = new FormData();
        data.append('image',$('#file2')[0].files[0]);
        jQuery.ajax({
            type: "POST",
            url: "http://api.touchworld-sh.com:8000/api/image/upload",//检测有效后会由系统生成唯一的face_id
            cache: false,
            processData: false,
            contentType: false,
            data: data,
        }).done(function(res){
            face_id3 = res;
        }).fail(function(res){
            console.log(res);
        });
        index = 0;
        var photo= new FileReader();
        file=document.getElementById('file2').files[0];
        photo.readAsDataURL(file);
        photo.onload=function(e) {
            document.getElementById('show2').src=this.result;
			/*相似度比较*/
            var f1 = $('.page7 .xk img')[0];
            var f2 = $('.page7 .photo img').attr('src');
            f1 = f1.getAttribute('src').substr(f1.getAttribute('src').indexOf('png')-2,1)
            if(f1 == 1){
                face_id1 = 'http://api.touchworld-sh.com:8000/face/face_1.png'
            }
            if(f1 == 2){
                face_id1 = 'http://api.touchworld-sh.com:8000/face/face_2.png'
            }
            if(f1 == 3){
                face_id1 = 'http://api.touchworld-sh.com:8000/face/face_3.png'
            }
            if(f1 == 4){
                face_id1 = 'http://api.touchworld-sh.com:8000/face/face_4.png'
            }
            // f1 = getBase64Image(f1);
            // face_id1 = f1.substring(f1.indexOf(',') + 1);
            face_id3 = f2.substring(f2.indexOf(',') + 1);
            check_info(face_id1,face_id3);
            $('.page7').show().siblings().hide();
        }
    });
    // 第七页跳转第八页
    $('.page7 .btn').click(function(){
    	var forward = $('.page4 .photo img').attr('src');
        var last = $('.page7 .photo img').attr('src');
    	var star = $('.page3 .xk img').attr('src');
    	$('.forward').attr('src',forward);
        $('.last').attr('src',last);
        $('.star').attr('src',star);
        $('.page8').show().siblings().hide();
    });


    function check_info(uri1,uri2) {
        //获取app_id和app_key
        var aid = 'b484e3f8310d40c8a55becb645059fca';
        var akey = '711fccd4091649cfb8072f831fff1751';
        jQuery.ajax({
            type: "POST",
            url: "http://api.eyekey.com/face/Check/checking",//检测有效后会由系统生成唯一的face_id
            data: {
                'app_id': aid,
                'app_key': akey,
                'url': uri1,
                'mode': "",
                'tip': ""
            },
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: function (data) {
                if (data.res_code == "0000" && index == 0) {
                    face_id1 = data.face[0].face_id;
                    index++;
                    check_info2(uri2);
                } else if (data.res_code == "0000" && index == 1) {
                    face_id2 = data.face[0].face_id;
                    match_compare();
                }
            },
            error: function (res) {
                // alert(JSON.stringify(res));
                // alert("异常：请确认填写信息正确后再刷新重试！");
            }
        });
    }

    function check_info2(uri2){
        var aid = 'b484e3f8310d40c8a55becb645059fca';
        var akey = '711fccd4091649cfb8072f831fff1751';
        jQuery.ajax({
            type: "POST",
            url: "http://api.eyekey.com/face/Check/checking",//检测有效后会由系统生成唯一的face_id
            data: {
                'app_id': aid,
                'app_key': akey,
                'img': uri2,
                'mode': "",
                'tip': ""
            },
            contentType: "application/x-www-form-urlencoded",
            dataType: "json",
            success: function (data) {
                face_id2 = data.face[0].face_id;
                match_compare();
            },
            error: function (res) {
                // alert(JSON.stringify(res));
                // alert("异常：请确认填写信息正确后再刷新重试！");
            }
        });
    }



    function match_compare() {
        jQuery.ajax({
            url: "http://api.eyekey.com/face/Match/match_compare",
            type: 'GET',
            dataType: 'json',
            data: {
                app_id: '6b628d50d3a045b8b9f7a3db9b7cd544',
                app_key: '8ed3d0cfa21b4c378a96f7f678d2654c',
                face_id1: face_id1,
                face_id2: face_id2
            },
            success: function (resMsg) {
                if (resMsg.res_code == "0000") {
                    // $("result_info").innerHTML = "相似度 " + (Math.round(resMsg.similarity * 100) / 100 + "%");
					$('.page4 span').text(Math.round(resMsg.similarity * 100) / 100);
                    $('.page5 span').text(Math.round(resMsg.similarity * 100) / 100);
                    $('.page7 span').text(Math.round(resMsg.similarity * 100) / 100);
                }
            },
            error: function (res) {
                // alert(JSON.stringify(res));
                // alert("异常：请确认填写信息正确后再刷新重试！");
            }
        })
    }

	//图片转成base64
	// function getBase64Image(img){
	// 	var canvas = document.createElement('canvas');
	// 	canvas.width = img.width;
	// 	canvas.height = img.height;
	// 	var ctx = canvas.getContext('2d');
	// 	ctx.drawImage(img,0,0,canvas.width,canvas.height);
	// 	var dataURL = canvas.toDataURL('image/jpeg');
	// 	return dataURL;
	// }


});