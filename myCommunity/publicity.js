$(function(){
    $.ajax({

        type: 'get',
        url: 'http://59.152.38.197:8188/HiSuOpenAPI/api/pubInterface/kinds?requestUser=sxbctv&requestPassword=123456',
        dataType: "json",
        data: {itemId: sessionStorage.getItem('itemId'), functionId: sessionStorage.getItem("kindsId"),cateId: sessionStorage.getItem("cateId")},
        success: function(data){
            console.log(data);
            var textData = sessionStorage.getItem('textData');
            textData = JSON.parse(textData);
            //console.log(textData)
            //console.log(sessionStorage.getItem("textData"));
            $(".passage>.con-tit").append(textData.name)
            $(".passage>.content").append(textData.content);
            //console.log($('.textCont img'));
            $.each($('.textCont img'),function(index, el) {
                //console.log(el,'el');
                textImg = 'http://59.152.38.197'+                console.log(textImg);

                textImg =`http://59.152.38.197${textImg}`;
                console.log(textImg);
                $('.textCont img').eq(index).attr('src',textImg);

            });
            $('.footer').append('<button type="button" class="btn  btn-danger  btn-block">查询捐款用户</button>')
            $('.footer  button').click(function(){
                $.ajax({
                    type: 'get',
                    url: 'http://59.152.38.197:8188/SmartHotelInterface/api/community/listDonationUser?requestUser=sxbctv&requestPassword=123456',
                    dataType: 'json',
                    data: {kindsId: textData.categroyId},
                    success: function(data){
                        console.log(data);
                        $.each(data.dataList,function(index,val){
                            $('.menu').append('<div class="line"><span class="userName">'+val.realName+'</span><span class="money">'+val.money+'</span></div>')

                        })
                    }
                })
            })
        }
    })
})