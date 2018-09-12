$(function(){
    // 导航条
    var menuSwiper = new Swiper('.menuSwiper', {
        slidesPerView: 5,
        paginationClickable: true,
        freeMode: true    //自动贴合
    });
    $('.menuSwiper a').eq(1).addClass('active');
    $('.menuSwiper a').on('click',function(){
        $('.menuSwiper a').removeClass('active');
        $(this).addClass('active');
    });
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
    var indexUrl = window.location.href;
    var indexIdx = indexUrl.indexOf('functionId=');
    var functionId = indexUrl.substring(indexIdx+11,indexIdx.length);
    //导航条
    $.ajax({
        type: 'get',
        url: 'http://59.152.38.197:8188/HiSuOpenAPI/api/pubInterface/portal?requestUser=sxbctv&requestPassword=123456',
        dataType: "json",
        data: {itemId: sessionStorage.getItem('itemId') },
        success: function(data){
            console.log(data);
            data.dataList[1].subList
                .splice(3,4);
            if (data.resultCode && data.resultCode == 200) {
                for (var i = 0; i < data.dataList.length; i++) {
                    //console.log(data.dataList[i].id)
                    if (functionId == data.dataList[i].id) {
                        for (var j = 0; j < data.dataList[i].subList.length; j++) {
                            $('.row').append(' <div class="col-xs-4"><a href="javascript:;" name="'+data.dataList[i].subList[j].functionId+'"><img src="'+data.dataList[i].subList[j].blurImg+'"><p >'+data.dataList[i].subList[j].name+'</p></a></div>');


                        }
                    }
                }
                //kindsCate(kindsCateId);
                $('.row .col-xs-4 a').eq(0).addClass('active');
                $('.row .col-xs-4  a').on('click',function(){
                    $('.row .col-xs-4 a').removeClass('active');
                    $(this).addClass('active');
                    var kindsCateId = $(this).attr('name');
                    sessionStorage.setItem("kindsCateId",kindsCateId);
                    console.log(kindsCateId);
                    var index = $(".row .col-xs-4 a").index(this);
                    console.log(index);
                    if(index==0 ){
                        window.location.href = 'open.html';
                    }else if(index==1){
                        window.location.href = 'agency.html';
                    }else if(index==2){
                        window.location.href = 'guide.html';
                    }
                    // $.ajax({
                    //     type: 'get',
                    //     url: 'http://59.152.38.197:8188/HiSuOpenAPI/api/pubInterface/kindsCate?requestUser=sxbctv&requestPassword=123456',
                    //     dataType: "json",
                    //     data: {itemId: sessionStorage.getItem('itemId'), functionId: kindsCateId },
                    //     success: function(data){
                    //         console.log(data);
                    //     }
                    // })
                });
            }

        }
    })

})