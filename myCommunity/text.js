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
            $(".passage .content").html(textData.content);
            var imgSrc= sessionStorage.getItem("www");
            $.each($(".passage .content img"),function(index,el){
                var el = $(this);
                var  src = el.attr("src");

                src = imgSrc + src ;
                el.attr("src",src);
                console.log(src);
            })


        }
    })
});