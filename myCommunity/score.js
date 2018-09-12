$(function(){
    $.ajax({

        type: 'get',
        url: 'http://59.152.38.197:8990/ShoppingInterface/hscm/common/listVolunteerIntegral?requestUser=sxbctv&requestPassword=123456',
        dataType: "json",
        data: {appUserId: sessionStorage.getItem('appUserId')},
        success: function(data){
            console.log(data);
            $('.passage').append('<h4 class="con-tit">我的积分：'+data.data.integral+'</h4>')


        }
    })
})