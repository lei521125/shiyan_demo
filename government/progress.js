$(function(){
    $.ajax({
        type: 'get',
        url: 'http://59.152.38.197:8188/SmartHotelInterface/api/community/listCommunityAgency?requestUser=sxbctv&requestPassword=123456',
        dataType: 'json',
        data: {appUserId:sessionStorage.getItem('appUserId'),kindCategroyId: sessionStorage.getItem('kindsCategroyId')},
        success: function (data) {
            console.log(data);
            $.each(data.dataList,function(index,val){
                $('.progres').append('<div class="pro" name="'+val.id+'"><h4>'+val.title+'</h4><span>状态: '+val.status+'</span></div>')
            })

        }
    })
})