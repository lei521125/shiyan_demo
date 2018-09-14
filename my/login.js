$(function(){
   $(".login ul li:nth-child(3)").find('button').on('click',function(){
       //console.log('aaa');
       var userName = $('.login ul li').eq(0).find('input[type="text"]').val();
       var userPass = $('.login ul li').eq(1).find('input[type="password"]').val()
       console.log(userPass);

       if (userName == '' || userPass == '') {
           // $('.look').append('<p>内容不能为空！</p> <div class="sub"><span class="yes">是</span><span class="no">否</span>/div>')
           alert('内容不能为空！');
           return false;
       }
       $.ajax({
           type     : "post",
           url      : "http://59.152.38.197:8188/SmartHotelInterface/api/appUser/login?requestUser=sxbctv&requestPassword=123456",
           data     :{userName : encodeURI(userName), password : encodeURI(userPass),  loginType : '0'},
           success:function(data){
               console.log(data);
               if (data.resultCode && data.resultCode == 200) {
                   $('.login').css('display','none');
                   $('.button').css('display','block');
                   sessionStorage.setItem('appUserId',data.data.id);
                   sessionStorage.setItem('userName',data.data.userName);
                   //sessionStorage.setItem('confirm','ture');
                   //.setItem('itemType','ture');
                   window.location.href = "../index.html";
               }else if (data.resultCode && data.resultCode == 302) {
                   $('.login ul li').eq(1).find('input[type="password"]').val('');
                   // $('.look').append('<p>密码错误！</p> <div class="sub"><span class="yes">是</span><span class="no">否</span>/div>')
                   alert('密码错误！');
                   //window.location.href = "login.html";
               }
           },

           error:function(data){

           }
       });
   })
})