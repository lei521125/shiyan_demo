$(function(){
    var countdown=60;
    function settime(obj){
        if (countdown == 0){
            obj.removeAttribute("disabled");
            obj.value="获取验证码";
            countdown = 60;
            return;
        } else {
            obj.setAttribute("disabled", true);
            obj.value="重新发送(" + countdown + ")";
            countdown--;
        }
        setTimeout(function(){settime(obj)},1000);
    }

    //验证码
    $('.bindPhone input:nth-child(2)').on('click',function(){
        var phone = $('.password ul li:nth-child(3)').find('input').val();
        var reg = /^1[3|4|5|7|8][0-9]{9}$/;
        var flag = reg.test(phone);
        if (phone == '') {
            // $('.look').append('<p>请输入手机号！</p> <div class="sub"><span class="yes">是</span><span class="no">否</span>/div>')
            alert('请输入手机号！');
            return false;
        }else if (flag == false) {
            // $('.look').append('<p>请输入正确的手机号！</p> <div class="sub"><span class="yes">是</span><span class="no">否</span>/div>')
            alert('请输入正确的手机号');
            return false;
        }

        var passwordPhoneBtn = this;
        settime(passwordPhoneBtn);
        $.ajax({
            type      : "post",
            url       : "http://59.152.38.197:8188/SmartHotelInterface/api/appUser/sendVerifyCode?requestUser=sxbctv&requestPassword=123456",
            dataType  : "JSONP",
            jsonp     : 'responseCallback',
            responseCallback : 'successCallBack',
            data      : {templateCode : 'templateCodePaswd', responseType : 'JSONP', phone : phone},
            success:function(data){
                console.log(data);
                if (data.resultCode && data.resultCode == 200) {


                }
            },
            error:function(data){
                console.log(data);
            }
        });
    });
    $('.passwordBtn').click(function(){
        var oldPassword = $('.password ul li:nth-child(1)').find('input').val();
        console.log(oldPassword);
        var newPassword = $('.password ul li:nth-child(2)').find('input').val();
        console.log(newPassword);
        var password = $('.password ul li:nth-child(3)').find('input').val();
        console.log(password);
        var passwordPhone = $('.password ul .bindPhone').find('input[type="text"]').val();
        var passAppUserId = sessionStorage.getItem('appUserId');
        //var passwordGet = 'http://10.10.7.213:8080/SmartHotelInterface/api/appUser/updateUserPwd?requestUser=sxbctv&requestPassword=123456';
        $.ajax({
            type      : "post",
            url       : "http://59.152.38.197:8188/SmartHotelInterface/api/appUser/updateUserPwd?requestUser=sxbctv&requestPassword=123456",
            dataType  : "JSONP",
            jsonp     : 'responseCallback',
            responseCallback : 'successCallBack',
            data: {oldPassword : oldPassword, newPassword : newPassword, appUserId : passAppUserId,verifyCode: passwordPhone,},
            success: function(data){
                if (data.resultCode == 200) {
                    //alert(JSON.stringify(data));
                    sessionStorage.setItem('userName','');
                    sessionStorage.setItem('appUserId','');
                    // $('.look').append('<p>修改成功！</p> <div class="sub"><span class="yes">是</span><span class="no">否</span>/div>')
                    alert('修改成功！');
                    window.location.href = "personal.html";
                }else{
                    // $('.look').append('<p>请登录！</p> <div class="sub"><span class="yes">是</span><span class="no">否</span>/div>')
                    alert('请登录！');
                }
            }
        })
        // $.get( passwordGet, {oldPassword : oldPassword, newPassword : newPassword, appUserId : passAppUserId,verifyCode: passwordPhone,}, function(data) {
        //     if (data.resultCode == 200) {
        //         //alert(JSON.stringify(data));
        //         sessionStorage.setItem('userName','');
        //         sessionStorage.setItem('appUserId','');
        //         alert('修改成功！');
        //         window.location.href = "personal.html";
        //     }else{
        //         alert('请登录！');
        //     }
        // });
    })
})