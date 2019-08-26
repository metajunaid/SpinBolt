
$(document).ready(function(){
    $('.view-source').on('click', function(){
        var cssClass = $(this).siblings('div[class*="sbl-"]')[0].className;
        $.ajax({
            url: 'dist/'+cssClass+'.css',
            success: function(data){
                console.log(data);
                $('#cssSnippet').val(data);
                $('#htmlSnippet').val($('.'+cssClass)[0].outerHTML)
                $('.source-modal').show();
            },
            error: function(e){
                console.log(e);
            },
        });
    });

    $('.source-modal').on('click', function(){
        $(this).hide();
    });
    
    $('.source-container').on('click', function(e){
        e.stopPropagation(); 
    })
});
