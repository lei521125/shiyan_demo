$(function(){
    //启动页
    sessionStorage.setItem('www','http://59.152.38.197');
    // 轮播图
    var idxSwiper = new Swiper('.idxSwiper', {
        autoplay: 2000,//可选选项，自动滑动
        loop    : true,
        autoHeight: true,
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next',
        pagination : '.swiper-pagination',
        paginationClickable :true,		//点切换
        autoplayDisableOnInteraction : false,    //操作后继续
    });

    //判断是否绑定社区

    //一级栏目
    if(sessionStorage.getItem('itemId') && sessionStorage.getItem('appUserId')){
        //通知公告
        $.ajax({
            type: 'get',
            url: "http://59.152.38.197:8188/HiSuOpenAPI/api/pubInterface/itemMarquee?requestUser=sxbctv&requestPassword=123456",
            dataType: "json",
            data: {itemId: sessionStorage.getItem("itemId")},
            success: function(data){
                console.log(data);
                var html = template("idxNotice-template",data);
                $(".idxNotice>.line>li").html(html);
            }
        });
        $.ajax({
            type: "post",
            url: "http://59.152.38.197:8188/HiSuOpenAPI/api/pubInterface/portal?requestUser=sxbctv&requestPassword=123456",
            dataType: "json",
            data: {itemId: sessionStorage.getItem('itemId') },
            success: function(data){
                console.log(data);
                if (data.resultCode && data.resultCode == 200) {
                    for (var i = 0; i <=$('.main-p .col-xs-4').length; i++) {
                        //console.log($('.idxNav .idxDiv')[i],'222');
                        var idxDivName = $('.main-p .col-xs-4').eq(i).find('a p').html();
                        for (var j = 0; j < data.dataList.length; j++) {
                            if (idxDivName == data.dataList[j].name) {
                                //console.log(arr[j],"1")
                                var idxDivHref = $('.main-p .col-xs-4').eq(i).attr('title');
                                idxDivHref += '?functionId='+data.dataList[j].id;

                                $('.main-p .col-xs-4').eq(i).attr('title',idxDivHref);
                                $('.main-p .col-xs-4').eq(i).attr('name',data.dataList[j].id);
                            }
                        }
                    }

                    $('.common').on('click',function(){
                        window.location.href = $(this).attr('title');
                    });


                    $(".partyServe").on("click",function(){
                        console.log($(this).attr('title'));
                        $.get("http://59.152.38.197:8188/SmartHotelInterface/api/appUser/queryUserRole?requestUser=sxbctv&requestPassword=123456",{appUserId:sessionStorage.getItem("appUserId")},function(data){
                            console.log(data);
                            if(data.data == "dangyuan"){
                                window.location.href = "partyMember/partyMember.html?functionId=67514"
                            }else if(data.data == "common"){
                                alert("群众身份,权限不足")
                            }
                        })
                    })
                }

            }
        })
    }

        $('.main-p  .col-xs-4').on('click',function(){
            // console.log('bbbb')
            if (!sessionStorage.getItem('appUserId')) {
                $('.look').css('display','block');
                $('.look  .yes').click(function(){
                    window.location.href = 'my/login.html';
                });
                $('.look  .no').click(function(){
                    $('.look').css('display','none')
                })
            }else if(!sessionStorage.getItem('itemId')){
                $('.bind').css('display','block');
                $('.bind  .yes').click(function(){
                    window.location.href = 'my/personal.html';
                });
                $('.bind  .no').click(function(){
                    $('.bind').css('display','none')
                })
            }
        });


})
