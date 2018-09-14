$(function(){
    $.ajax({

        type: 'get',
        url: 'http://59.152.38.197:8188/HiSuOpenAPI/api/pubInterface/kinds?requestUser=sxbctv&requestPassword=123456',
        dataType: "json",
        data: {itemId: sessionStorage.getItem('itemId'), functionId: sessionStorage.getItem("kindsId"),cateId: sessionStorage.getItem("cateId")},
        success: function(data){
            console.log(data);
            var kindsId = data.dataList[0].categroyId;
            $(".passage .content").html(data.dataList[0].content);
            var imgSrc= sessionStorage.getItem("www");
            $.each($(".passage .content img"),function(index,el){
                var el = $(this);
                // console.log(el);
                var  src = el.attr("src");
                // console.log(src);
                src = imgSrc + src ;
                el.attr("src",src);
                // console.log(src);
            });
            //判断用户是否登录
            if(!sessionStorage.getItem('appUserId')){
                alert('未登录！');
                window.location.href = '../my/personal.html';
            }
            //查询用户是否已报名志愿者活动
            if(sessionStorage.getItem('appUserId') || sessionStorage.getItem('appUserId' != '')){
                $.ajax({
                    type: 'get',
                    url: 'http://59.152.38.197:8188/SmartHotelInterface/api/community/listVolunteerKinds?requestUser=sxbctv&requestPassword=123456',
                    dataType: 'json',
                    data: {appUserId: sessionStorage.getItem('appUserId'),kindsId:kindsId},
                    success: function(data){
                        console.log(data);
                        if(data.data == undefined ){
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


            //点击按钮
            $('.footer  .btn-danger').click(function(){
                //查询用户是否是志愿者
                if(sessionStorage.getItem('appUserId') || sessionStorage.getItem('appUserId' != '')){
                    $.ajax({
                        type: 'get',
                        url: 'http://59.152.38.197:8188/SmartHotelInterface/api/community/listVolunteer?requestUser=sxbctv&requestPassword=123456',
                        dataType: 'json',
                        data: {appUserId: sessionStorage.getItem('appUserId')},
                        success: function(data){
                            console.log(data);
                            if(data.data.id ==undefined){
                                //$('.look').append('')
                                $('.look').css('display','block')
                                //alert("您目前不是志愿者,请您先去完善信息");
                                //window.location.href = 'form.html'
                                $('.passage').css('display','none');
                                $('.submit').css('display','block');
                                $('.look .no').click(function(){
                                    $('.submit .btn').click(function(){
                                        console.log('aaaa');
                                        var userName = $('.form-group:nth-child(1) input').val();
                                        //console.log(userName);
                                        var phone = $('.form-group:nth-child(2) input').val();
                                        var reg = /^1[3|4|5|7|8][0-9]{9}$/;
                                        var flag = reg.test(phone);
                                        if (phone == '') {
                                            //$('.look').append('<p>请输入手机号！</p> <div class="sub"><span class="yes">是</span><span class="no">否</span>/div>')
                                            alert('请输入手机号！');
                                            return false;
                                        }else if (flag == false) {
                                            //$('.look').append('<p>请输入正确的手机号！</p> <div class="sub"><span class="yes">是</span><span class="no">否</span>/div>')
                                            alert('请输入正确的手机号');
                                            return false;
                                        }
                                        var address = $('.form-group:nth-child(3) input').val();
                                        //完善志愿者信息
                                        $.ajax({
                                            type: 'get',
                                            url: 'http://59.152.38.197:8188/SmartHotelInterface/api/community/addVolunteer?requestUser=sxbctv&requestPassword=123456',
                                            dataType: 'json',
                                            data: {realName : encodeURI(userName), phone: phone, address: encodeURI(address),appUserId: sessionStorage.getItem('appUserId')},
                                            success: function(data){
                                                console.log(data);
                                                $('.passage').css('display','block');
                                                $('.submit').css('display','none');
                                                $('.passage  button:nth-child(1)').css('display','none');
                                                $('.passage  .footer').append(' <button type="button" class="btn  btn-danger  btn-block">我要报名</button>');
                                                $('.footer  .btn').click(function(){
                                                    //志愿者报名
                                                    $.ajax({
                                                        type: 'get',
                                                        url: 'http://59.152.38.197:8188/SmartHotelInterface/api/community/addVolunteerKinds?requestUser=sxbctv&requestPassword=123456',
                                                        dataType: 'json',
                                                        data: {appUserId: sessionStorage.getItem('appUserId'),kindsId: kindsId},
                                                        success: function(data){
                                                            console.log(data);
                                                            if(data.resultCode &&data.resultCode == 200){
                                                                $('.footer  .btn-danger').css('display', 'none');
                                                                $('.footer  .btn-default').css('display','block');
                                                            }

                                                        }
                                                    })

                                                })

                                            }
                                        })
                                    })
                                })

                            }else{
                                $('.look .yes').click(function(){
                                    $('.passage  button:nth-child(1)').css('display','none');
                                    $('.passage  .footer').append(' <button type="button" class="btn  btn-danger  btn-block">我要报名</button>');
                                    $('.footer .btn').click(function(){
                                        // //参加活动
                                        $.ajax({
                                            type: 'get',
                                            url: 'http://59.152.38.197:8188/SmartHotelInterface/api/community/addVolunteerKinds?requestUser=sxbctv&requestPassword=123456',
                                            dataType: 'json',
                                            data: {appUserId: sessionStorage.getItem('appUserId'),kindsId: kindsId},
                                            success: function(data){
                                                console.log(data);
                                                // if(data.resultCode && data.resultCode == 200){
                                                //     $('.footer  .btn-danger').css('display', 'none');
                                                //     $('.footer  .btn-default').css('display','block');
                                                // }

                                            }
                                        })
                                    })
                                })


                            }
                        }
                    })
                }
            })




        }
    })
})