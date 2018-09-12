$(function(){
    $.ajax({
        type: 'get',
        url: 'http://59.152.38.197:8188/SmartHotelInterface/api/appUser/ getPublicResult?requestUser=sxbctv&requestPassword=123456',
        dataType: "json",
        data: {id: sessionStorage.getItem('id')},
        success: function(data){
            console.log(data);
            $(".passage>.con-tit").html(data.dataList[0].title);
            $(".passage>.content").html(data.dataList[0].content);
            $(".passage>.dealResult").html(data.dataList[0].dealResult);
        }
    })
    //查询点赞状态
    $.ajax({
        type: 'get',
        url: 'http://59.152.38.197:8188/SmartHotelInterface/api/appUser/querySupportStatus?requestUser=sxbctv&requestPassword=123456',
        dataType: 'json',
        data: {appUserId: sessionStorage.getItem('appUserId'),publicResultId: sessionStorage.getItem('id')},
        success: function(data){
            console.log(data);
            console.log(data.data);
            if(data.data==1){
                $('.praise').find("img").attr("src",'../image/shequ/dianzan1.png')
            }else{
                $('.praise').find("img").attr("src",'../image/shequ/dianzan2.png')
            }

        }
    })
    // 查询点赞的总数
    $.ajax({
        type: 'get',
        url: 'http://59.152.38.197:8188/SmartHotelInterface/api/appUser/querySupportNum?requestUser=sxbctv&requestPassword=123456',
        dataType: 'json',
        data: {publicResultId: sessionStorage.getItem('id')},
        success: function(data){
            console.log(data);
            $('.praise>span').html('('+data.data+')');
        }
    });


    //添加点赞
    $('.praise>img').click(function(){
        var path = $('.praise').find("img").attr("src")
        //console.log(path);
        var img = path.slice(-5,-4);
        console.log(img);
        if(img==2) {
            var status = 1;
            var path = path.replace(/2/g, '1');
            console.log(path);
            $('.praise>img').attr('src',path);

        }else{
            var status = 0;
            var path = path.replace(/1/g, '2');
            console.log(path);
            $('.praise>img').attr('src',path);

        }
        $.ajax({
            type: 'get',
            url: 'http://59.152.38.197:8188/SmartHotelInterface/api/appUser/addSupport?requestUser=sxbctv&requestPassword=123456',
            dataType: 'json',
            data: {appUserId: sessionStorage.getItem('appUserId'),publicResultId: sessionStorage.getItem('id'),type: 0, status: status},
            success: function(data){
                console.log(data);
                if(data.resultCode == 200){
                    $.ajax({
                        type: 'get',
                        url: 'http://59.152.38.197:8188/SmartHotelInterface/api/appUser/querySupportNum?requestUser=sxbctv&requestPassword=123456',
                        dataType: 'json',
                        data: {publicResultId: sessionStorage.getItem('id')},
                        success: function(data){
                            console.log(data);
                            $('.praise>span').html('('+data.data+')');
                        }
                    })
                }
            }
        })

    })

    //查询评论
    listComment();
    function  listComment(){
        $.ajax({
            type: 'get',
            url: 'http://59.152.38.197:8188/SmartHotelInterface/api/appUser/listComment?requestUser=sxbctv&requestPassword=123456',
            dataType: 'json',
            data: {publicResultId: sessionStorage.getItem('id')},
            success: function(data){
                console.log(data);
                $('.comment-show>.commonContentList').html('');
                $.each(data.dataList,function(index,val){
                    $('.comment-show>.commonContentList').append(' <div class="comment-show-con clearfix"  ><div class="userName">'+val.userName+'</div><div class="content"><div class="commonContent">'+val.content+'</div><div class="delBtn" appUserId= "'+val.appUserId+'" id="'+val.id+'" >删除</div></div></div>')
                    var appUserId= val.appUserId;
                    console.log(appUserId);
                    if(appUserId == sessionStorage.getItem('appUserId')){
                        $('.comment-show>.commonContentList>.comment-show-con>.content>.delBtn').css('display','block');
                    }
                })

                //删除评论
                $('.comment-show>.commonContentList>.comment-show-con>.content>.delBtn').click(function(){
                    var listId = $(this).attr('id');
                    console.log(listId);
                    var appUserId= $(this).attr('appUserId');
                    console.log(appUserId);
                    $.ajax({
                        type: 'get',
                        url: 'http://59.152.38.197:8188/SmartHotelInterface/api/appUser/delCommentById?requestUser=sxbctv&requestPassword=123456',
                        dataType: 'json',
                        data: {id:listId},
                        success: function(data){
                            console.log(data);
                            listComment();
                        }
                    })




                })
            }
        })
    }
    //添加评论
    $('.plBtn').click(function(){
        var content = $('.reviewArea>.comment-input').val();
        //console.log(content);
        $.ajax({
            type: 'get',
            url: 'http://59.152.38.197:8188/SmartHotelInterface/api/appUser/addComment?requestUser=sxbctv&requestPassword=123456',
            dataType: 'json',
            data: {publicResultId: sessionStorage.getItem('id'),appUserId: sessionStorage.getItem('appUserId'),type: 0,content: encodeURI(content)},
            success: function(data){
                console.log(data);
                $('.reviewArea>.comment-input').val('');
                $('.comment-show>.commonContentList').html('');
                listComment();
            }
        })

    })


})