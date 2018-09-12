$(function(){
    $.ajax({
        type: 'get',
        url: 'http://59.152.38.197:8188/HiSuOpenAPI/api/pubInterface/kindsCate?requestUser=sxbctv&requestPassword=123456',
        dataType: 'json',
        data: {itemId: sessionStorage.getItem('itemId'),functionId: sessionStorage.getItem("kindsId")},
        success: function(data){
            console.log(data);
            $.each(data.dataList,function(index,val){
                $(".wrapper>.tab").append(' <li class="tab-item"><a href="javascript:;" name="'+val.id+'">'+val.name+'</a></li>')
                var cateId = $(".wrapper>.tab>li>a").eq(0).attr('name');
                $('.wrapper>.tab>li>a').eq(0).addClass('active');
                //console.log(cateId)
                $(".wrapper>.tab>li>a").click(function(){
                    $(".tab a").removeClass("active");
                    $(this).addClass("active");
                    var index = $(this).parents('li').index();
                    console.log(index);
                    $(".products>div:eq("+index+")").siblings("div").removeClass("selected");
                    $(".products>div:eq("+index+")").addClass("selected");
                    cateId = $(this).attr('name');
                    //console.log(cateId);
                    sessionStorage.setItem("cateId", cateId);
                    $.ajax({
                        type: 'get',
                        url: 'http://59.152.38.197:8188/HiSuOpenAPI/api/pubInterface/kinds?requestUser=sxbctv&requestPassword=123456',
                        dataType: 'json',
                        data: {itemId: sessionStorage.getItem('itemId'), functionId: sessionStorage.getItem("kindsId"),cateId: sessionStorage.getItem("cateId") },
                        success: function(data){
                            console.log(data);
                            $(".products>.main").html('')
                            $.each(data.dataList,function
                                (index,val){
                                $(".products>.main").append('<div class="past" name="'+val.id+'"><h4>'+val.name+'</h4><div class="time"><span class="date">'+val.articleTime+'</span><span class="detail">详情>></span></div></div>')
                                $(".products>.main>.past").click(function(){
                                    var textData = data.dataList[$(this).index()];
                                    textData = JSON.stringify(textData);
                                    sessionStorage.setItem('textData',textData);
                                    console.log(textData);
                                    window.location.href = 'text.html';
                                })
                            })
                        }
                    })
                })
                $.ajax({
                    type: 'get',
                    url: 'http://59.152.38.197:8188/HiSuOpenAPI/api/pubInterface/kinds?requestUser=sxbctv&requestPassword=123456',
                    dataType: 'json',
                    data: {itemId: sessionStorage.getItem('itemId'), functionId: sessionStorage.getItem("kindsId"),cateId: cateId},
                    success: function(data){
                        console.log(data);
                        $(".products>.main").html('')
                        $.each(data.dataList,function
                            (index,val){
                            $(".products>.main").append('<div class="past" name="'+val.id+'"><h4>'+val.name+'</h4><div class="time"><span class="date">'+val.articleTime+'</span><span class="detail">详情>></span></div></div>')
                            $(".products>.main>.past").click(function(){
                                var textData = data.dataList[$(this).index()];
                                textData = JSON.stringify(textData);
                                sessionStorage.setItem('textData',textData);
                                console.log(textData);
                                window.location.href = 'text.html';
                            })
                        })
                    }
                })
            })
        }
    })
})