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
        var userName = $('.register ul li:nth-child(1)').find('input').val();
        var phone = $('.register ul li:nth-child(3)').find('input').val();

        var reg = /^1[3|4|5|7|8][0-9]{9}$/;
        var flag = reg.test(phone);
        if (phone == '') {
            // $('.look').append('<p>请输入手机号！</p> <div class="sub"><span class="yes">是</span><span class="no">否</span>/div>')
            alert('请输入手机号！');
            return false;
        }else if (flag == false) {
            // $('.look').append('<p>请输入正确的手机号!</p> <div class="sub"><span class="yes">是</span><span class="no">否</span>/div>')
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
            data      : {templateCode : 'templateCodeRegister', responseType : 'JSONP', phone : phone},
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

        //注册
        $(".registerBtn  button").click(function(){
            var userName = $('.register ul li:nth-child(1)').find('input').val();
            var realName = $('.register ul li:nth-child(2)').find('input').val();
            //console.log(userName);
            var phone = $('.register ul li:nth-child(3)').find('input').val();
            var passwordPhone = $('.register ul .bindPhone').find('input[type="text"]').val();
            //console.log(passwordPhone);
            var password = $('.register ul li:nth-child(5)').find('input').val();
            var post = $('.register ul li:nth-child(6)').find('input').val();
            var address = $('.register ul .address input').val();
            //console.log(address);
            //console.log(password);
            //console.log(post);
            var sex = 1;
            var customerType = 'common';
            if (userName == '' && phone == '' && password ==''&&post=='') {
                // $('.look').append('<p>内容不能为空！</p> <div class="sub"><span class="yes">是</span><span class="no">否</span>/div>')
                alert('内容不能为空！');
                return false;
            };
            if ($('.register .registerSex input[type=radio]').eq(1).is(':checked')) { sex = 0;};
            if ($('.register .customerType input[type=radio]').eq(1).is(':checked')) { customerType = 'dangyuan';};
            //console.log(customerType);
            if (password != post) {
                alert(密码不一致);
                // $('.look').append('<p>密码不一致！</p> <div class="sub"><span class="yes">是</span><span class="no">否</span>/div>')
                return false;
            }
            $.ajax({
                type      : "post",
                url       : "http://59.152.38.197:8188/SmartHotelInterface/api/appUser/register?requestUser=sxbctv&requestPassword=123456",
                dataType  : "JSONP",
                jsonp     : 'responseCallback',
                responseCallback : 'successCallBack',
                data      : {userName : encodeURI(userName),realName:encodeURI(realName), phone : phone, sex : sex, password : password, userCode : "",roleCode: customerType,verifyCode: passwordPhone,address: encodeURI(address), responseType : 'JSONP'},
                success: function(data){
                    console.log(data);
                    //alert(userName,realName,address)
                    if (data.resultCode && data.resultCode == 200) {
                        console.log(data);
                        $('.register').html('');
                        $('.button').css('display','block');
                        window.location.href = "personal.html";
                    }else{
                        // $('.look').append('<p>'+data.resultDesc+'</p> <div class="sub"><span class="yes">是</span><span class="no">否</span>/div>')
                        alert(data.resultDesc);
                    }


                }


            })
        })



});