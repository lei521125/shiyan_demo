$(function(){
    $.ajax({
        type: 'get',
        url: 'http://59.152.38.197:8188/HiSuOpenAPI/api/pubInterface/kindsCate?requestUser=sxbctv&requestPassword=123456',
        dataType: "json",
        data: {itemId: sessionStorage.getItem('itemId'), functionId: sessionStorage.getItem("kindsCateId") },
        success: function(data){
            console.log(data);
            if (data.resultCode && data.resultCode == 200) {
                $.each(data.dataList, function(index, val) {
                    $(".container").append('<div class="registration" name="'+val.id+'"><div class="pic" ><img src="../image/zhengwu/biaoqian.png"></div><div class="title"><p>'+val.name+'</p></div><div class="upload"><p class="up-pic"><a href="javascript:;" name="'+val.id+'">上传表格及证件信息</a><p class="speed"><a href="progress.html" name="'+val.id+'">查看处理进度</a></p></div></div>');

                });
                //调起上传图片
                $(".container .registration  .upload  a").on('click', function(){
                    var kindsCategroyId = $(this).attr('name');
                    console.log(kindsCategroyId)
                    sessionStorage.setItem('kindsCategroyId',kindsCategroyId)
                    var appUserId = sessionStorage.getItem('appUserId');
                    var itemId = sessionStorage.getItem('itemId')
                    var kindsCategroyId = sessionStorage.getItem('kindsCategroyId');
                    //alert('用户名',appUserId,'社区id',itemId,'分类id',kindsCategroyId);
                    System.startImgSelectAC(1,itemId,appUserId,kindsCategroyId);
                    //alert(sessionStorage.getItem('kindsCategroyId'),'22222222');
                })
            }



        }
    })

})