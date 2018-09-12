$(function(){
    console.log(areaInfo.getAreaListByParentCode('4203','shiyan'));
    $.each(areaInfo.getAreaListByParentCode('4203','shiyan'),function(index,val){
        $('.bindList ul').append('<li name="'+val.code+'" title="'+val.pinyin+'">'+val.name+'</li>');
        console.log($(this).attr('name'));
    });
    $('.bindList ul li').on('click',function(){
        $.get('http://59.152.38.197:8188/HiSuOpenAPI/api/pubInterface/listItems?requestUser=sxbctv&requestPassword=123456', {regionId : $(this).attr('name')}, function(data) {
            console.log(data);
            if (data.resultCode && data.resultCode == 200) {
                $('.bindList ul').html('');
                $.each(data.dataList, function(index, val) {
                    $('.bindList ul').append('<li name="'+val.id+'" title="'+val.cityId+'" rel="'+val.areaId+'" code="'+val.itemCode+'">'+val.name+'</li>');
                });

                $('.bindList ul li').on('click',function(){
                    sessionStorage.setItem('itemId',$(this).attr('name'));
                    sessionStorage.setItem('itemName',$(this).html());
                    sessionStorage.setItem('itemCode',$(this).attr('code'));
                    sessionStorage.setItem('cityId',$(this).attr('title'));
                    sessionStorage.setItem('areaId',$(this).attr('rel'));
                    $('.success').css('display','block')
                    $('.success  .yes').click(function(){
                        window.location.href = '../index.html';
                    });
                    $('.success  .no').click(function(){
                        $('.success').css('display','none')
                    })


                });
            }else if (data.resultCode && data.resultCode == 405) {
                $('.fail').css('display','block')
                $('.fail').click(function(){
                    $('.fail').css('display','none')
                })
                // $('.fail  .yes').click(function(){
                //     window.location.href = '../index.html';
                // });
                // $('.fail  .no').click(function(){
                //     $('.fail').css('display','none')
                // })
                return false;
            }
        });
    });
})