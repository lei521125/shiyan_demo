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
        var phone = $('.forget ul li:nth-child(1)').find('input').val();
        var reg = /^1[3|4|5|7|8][0-9]{9}$/;
        var flag = reg.test(phone);
        if (phone == '') {
            //$('.phone').css('display','block');
            alert('请输入手机号！');
            return false;
        }else if (flag == false) {
            $('.phone').css('display','none');
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
            data      : {templateCode : 'templateCodeChange', responseType : 'JSONP', phone : phone},
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
   $('.forgetBtn').click(function(){
      var forgetPhoneNumber = $('.forget ul li:nth-child(1)').find('input').val();
       var passwordPhone = $('.forget ul .bindPhone').find('input[type="text"]').val();
      //console.log(forgetPhoneNumber);
       var reg = /^1[3|4|5|7|8][0-9]{9}$/;
       var flag = reg.test(forgetPhoneNumber);
       if (forgetPhoneNumber == '') {
           //$('.phone').css('display','block');
           alert('请输入手机号！');
           return false;
       }else if (flag == false) {
           // $('.phone').css('display','none');
           alert('请输入正确的手机号');
           return false;
       }
       if($('.forgetPhoneNumber input').val() == ''|| $('.bindPhone input:nth-child(1)').val() =='' ){
           // $('.look').css('display','block');
           // $('.look').append('<p>内容不能为空！</p> <div class="sub"><span class="yes">是</span><span class="no">否</span>/div>')
           alert('内容不能为空');
           return false;
       }else{
           $.ajax({
               type     : "post",
               url      : "http://59.152.38.197:8188/SmartHotelInterface/api/appUser/resetUserPwd?requestUser=sxbctv&requestPassword=123456",
               dataType  : "JSONP",
               jsonp     : 'responseCallback',
               responseCallback : 'successCallBack',
               data     :{ verifyCode :passwordPhone , phone : forgetPhoneNumber},
               success:function(data){
                   console.log(data);
                   if (data.resultCode && data.resultCode == 200) {
                       //alert(JSON.stringify(data));
                       sessionStorage.setItem('userName','');
                       sessionStorage.setItem('appUserId','');
                       // $('.look').append('<p>重置成功！</p> <div class="sub"><span class="yes">是</span><span class="no">否</span>/div>')
                       alert('重置成功！');
                       window.location.href = "personal.html";
                   }else if (data.resultCode && data.resultCode == 806) {
                       // $('.look').append('<p>验证码错误！！</p> <div class="sub"><span class="yes">是</span><span class="no">否</span>/div>')
                       alert('验证码错误！');
                   }
               },

               error:function(data){

               }
           });
       }
   })
})