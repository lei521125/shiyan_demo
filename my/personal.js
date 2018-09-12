$(function(){
    //判断用户是否登录，未登录下面隐藏
    if(sessionStorage.getItem('appUserId') && sessionStorage.getItem('appUserId') != ''){
        $('.personalImg h4').html(sessionStorage.getItem('userName'));
        $('.userShow').fadeIn();
    }else if (!sessionStorage.getItem('appUserId')) {
        $('.personalImg h4').html('<a href="login.html">登录</a>&nbsp;|&nbsp;<a href="register.html">注册</a>');
        $('.userShow').css('display','none');
    }
    //修改密码
    $('.passwordShow').click(function(){
        window.location.href = 'password.html';
    })
    //忘记密码
    $('.userForget').click(function(){
        window.location.href = 'forget.html';
    })

    //扫一扫
    $(".personalDiv  .userBind").click(function(){
        System.startZbarQR(sessionStorage.getItem('appUserId'));
    });
    //联系我们
    $('.userCall').on('click',function(){
        //alert('客服电话：0931-8276359');
        $('.call').css('display', 'block')
        $('.call').click(function () {
            $('.call').css('display', 'none')
        })
    });
    //注销
    $('.cancellation').on('click',function(){
        if(sessionStorage.getItem('appUserId')== ''){
            window.location.href = 'login.html'
        }else {
            $('.cancell').css('display', 'block')
            $('.cancell  .yes').click(function () {
                $.ajax({
                    type: 'get',
                    url: 'http://59.152.38.197:8188/SmartHotelInterface/api/appUser/deleteAppUser?requestUser=sxbctv&requestPassword=123456',
                    dataType: 'json',
                    data: {appUserId: sessionStorage.getItem('appUserId')},
                    success: function (data) {
                        console.log(data);
                        window.history.go(0);
                        sessionStorage.removeItem('userName');
                        sessionStorage.removeItem('appUserId');
                        sessionStorage.removeItem('cityId');
                        sessionStorage.removeItem('itemId');
                        sessionStorage.removeItem('itemCode');
                        sessionStorage.removeItem('areaId');
                        sessionStorage.removeItem('www');
                        sessionStorage.removeItem('itemName');
                    }
                })
            });
            $('.cancell  .no').click(function () {
                $('.cancell').css('display', 'none')
            })
        }

    })
    //退出登录
    $('.userOut').on('click',function(){
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('appUserId');
        sessionStorage.removeItem('cityId');
        sessionStorage.removeItem('itemId');
        sessionStorage.removeItem('itemCode');
        sessionStorage.removeItem('areaId');
        sessionStorage.removeItem('www');
        sessionStorage.removeItem('itemName');

        window.location.href = 'personal.html';
    });
})