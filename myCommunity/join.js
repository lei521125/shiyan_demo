$(function(){
    $.ajax({

        type: 'get',
        url: 'http://59.152.38.197:8188/HiSuOpenAPI/api/pubInterface/kinds?requestUser=sxbctv&requestPassword=123456',
        dataType: "json",
        data: {itemId: sessionStorage.getItem('itemId'), functionId: sessionStorage.getItem("kindsId"),cateId: sessionStorage.getItem("cateId")},
        success: function(data){
            console.log(data);
            var textData = sessionStorage.getItem('textData');
            textData = JSON.parse(textData);
            //console.log(textData)
            //console.log(sessionStorage.getItem("textData"));
            $(".passage>.con-tit").append(textData.name)
            $(".passage>.content").append(textData.content);
            //console.log($('.textCont img'));
            $.each($('.textCont img'),function(index, el) {
                //console.log(el,'el');
                textImg = 'http://59.152.38.197'+console.log(textImg);

                textImg =`http://59.152.38.197${textImg}`;
                console.log(textImg);
                $('.textCont img').eq(index).attr('src',textImg);

            });
            $('.footer').append('<button type="button" class="btn  btn-danger  btn-block">活动报名</button> <button type="button" class="btn  btn-default  btn-block">已参加</button>')

            //判断用户是否登录
            if(!sessionStorage.getItem('appUserId')){
                alert('未登录！');
                window.location.href = '../my/personal.html';
            }
            //查询用户是否已报名社区活动
            if(sessionStorage.getItem('appUserId') || sessionStorage.getItem('appUserId' != '')){
                $.ajax({
                    type: 'get',
                    url: 'http://59.152.38.197:8188/SmartHotelInterface/api/community/listCommunityEnroll?requestUser=sxbctv&requestPassword=123456',
                    dataType: 'json',
                    data: {appUserId: sessionStorage.getItem('appUserId'),kindsId: textData.categroyId},
                    success: function(data){
                        //console.log('----------------')
                        console.log(data);
                        if(data.data==undefined ){
                            $('.footer  .btn-danger').css('display', 'block');
                            $('.footer  .btn-default').css('display','none');

                        }else{
                            $('.footer  .btn-danger').css('display', 'none');
                            $('.footer  .btn-default').css('display','block');
                            $(".btn-default").attr({"disabled":"disabled"});
                        }

                    }
                })
            }

            //没有参加活动，点击按钮报名参加活动
            $('.footer .btn-danger').click(function(){
                $.ajax({
                    type: 'get',
                    url: 'http://59.152.38.197:8188/SmartHotelInterface/api/community/addCommunityEnroll?requestUser=sxbctv&requestPassword=123456',
                    dataType: 'json',
                    data: {appUserId: sessionStorage.getItem('appUserId'),kindsId: textData.categroyId},
                    success: function(data){
                        //console.log('----------------')
                        console.log(data);
                        if(data.resultCode &&data.resultCode == 200) {
                            $('.footer  .btn-danger').css('display', 'none');
                            $('.footer  .btn-default').css('display', 'block');
                        }
                    }
                })
            })
        }
    })
})