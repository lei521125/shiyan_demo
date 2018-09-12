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
            console.log(textData.content);
            $(".passage .content").html(textData.content);
            var imgSrc= sessionStorage.getItem("www");

                $.each($(".passage .content img"),function(index,el){
                    var el = $(this);
                    var  src = el.attr("src");

                    src = imgSrc + src ;
                    el.attr("src",src);
                    console.log(src);
                })



            // console.log(sessionStorage.getItem("textData"));
            // $(".passage>.con-tit").append(textData.name);
            // $(".passage>.content").append(textData.content);
            //console.log(textData.content);
            // $.each(   ,function(index, el) {
               // var  textImg = sessionStorage.getItem('www')+textImg;
               //
               //  $('.textCont img').eq(index).attr('src',textImg);
               //  console.log(textImg);
            // });

        }
    })
})