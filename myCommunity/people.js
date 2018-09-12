$(function(){
    $('.wrappe>.tabe').append(' <li class="tab-item"><a href="javascript:;" class="active">问题反映</a></li>')
    $(".tabe li:nth-child(1)").on('click',function () {
        $('.product>.main:nth-child(1)').html('');
        $('.product>.peopleLine').css('display','block');
        $('.product>.main').css('display','none');
        // System.startImgSelectAC();
    })
    $('.peopleLine li:nth-child(1)').click(function () {
        System.startImgSelectAC(2,sessionStorage.getItem('itemId'),sessionStorage.getItem('appUserId'),0)
    })
    $('.peopleLine li:nth-child(2)').click(function () {
        System.startImgSelectAC(2,sessionStorage.getItem('itemId'),sessionStorage.getItem('appUserId'),1)
    })
    $('.peopleLine li:nth-child(3)').click(function () {
        System.startImgSelectAC(2,sessionStorage.getItem('itemId'),sessionStorage.getItem('appUserId'),2)
    })
    $('.peopleLine li:nth-child(4)').click(function () {
        System.startImgSelectAC(2,sessionStorage.getItem('itemId'),sessionStorage.getItem('appUserId'),3)
    })
    $('.peopleLine li:nth-child(5)').click(function () {
        System.startImgSelectAC(2,sessionStorage.getItem('itemId'),sessionStorage.getItem('appUserId'),4)
    })
    $.ajax({
        type: 'get',
        url: 'http://59.152.38.197:8188/HiSuOpenAPI/api/pubInterface/kindsCate?requestUser=sxbctv&requestPassword=123456',
        dataType: 'json',
        data: {itemId: sessionStorage.getItem('itemId'), functionId: sessionStorage.getItem("kindsId") },
        success: function (data) {
            console.log(data);
            $.each(data.dataList,function(index,val){
                $(".wrappe>.tabe").append(' <li class="tab-item" ><a href="javascript:;" name="'+val.id+'">'+val.name+'</a></li>');
                var cateId = $('.wrapper>.tab>li>a').eq(1).attr('name');
                //console.log(cateId);
                $('.wrappe>.tabe>li>a').eq(0).addClass('active');
                $(".tabe a").click(function () {
                    $(".tabe a").removeClass("active");
                    $(this).addClass("active");
                    var index = $(this).parents('li').index();
                    console.log(index);
                    $(".products>div:eq("+index+")").siblings("div").removeClass("selected");
                    $(".products>div:eq("+index+")").addClass("selected");
                    cateId = $(this).attr('name');
                    //console.log(cateId);
                    sessionStorage.setItem("cateId", cateId);
                    $('.product>.peopleLine').css('display','none');
                    $('.product>.main').css('display','block');
                    $.ajax({
                        type: 'get',
                        url: 'http://59.152.38.197:8188/HiSuOpenAPI/api/pubInterface/kinds?requestUser=sxbctv&requestPassword=123456',
                        dataType: 'json',
                        data: {itemId: sessionStorage.getItem('itemId'),functionId: sessionStorage.getItem("kindsId"),cateId: sessionStorage.getItem("cateId") },
                        success:function(data){
                            console.log(data);
                            if(index==1){
                                $(".product>.main").html('');
                                $.each(data.dataList,function(index,val){
                                    $(".product>.main").append('<div class="past" name="'+val.id+'"><h4>'+val.name+'</h4><div class="time"><span class="date">'+val.articleTime+'</span><span class="detail">详情>></span></div></div>')
                                    $(".product>.main>.past").click(function(){
                                        var textData = data.dataList[$(this).index()];
                                        textData = JSON.stringify(textData);
                                        sessionStorage.setItem('textData',textData);
                                        console.log(textData);
                                        window.location.href = 'text.html';
                                    })
                                })
                            }
                            if(index==2){
                                $.ajax({
                                    type: 'get',
                                    url: 'http://59.152.38.197:8188/SmartHotelInterface/api/appUser/ getIdAndTitle?requestUser=sxbctv&requestPassword=123456',
                                    dataType: 'json',
                                    data: {hotelId: sessionStorage.getItem('itemId')},
                                    success:function(data){
                                        console.log(data);
                                        $(".product>.main").html('');
                                        $.each(data.dataList,function(index,val){
                                            $(".product>.main").append('<div class="past" name="'+val.id+'"><h4>'+val.title+'</h4><div class="time"><span class="date">'+val.creatime+'</span><span class="detail">详情>></span></div></div>')
                                            var id = val.id
                                            sessionStorage.setItem('id',id)
                                            $(".product>.main>.past").click(function(){


                                                window.location.href = 'result.html';

                                            })
                                        })
                                    }
                                })


                            }

                        }
                    })

                });

            })


        }
    })
})
