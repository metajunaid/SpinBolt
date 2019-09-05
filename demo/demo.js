
$(document).ready(function(){
    //Setting default background and foreground colors.
    var bgColor = '#ffffff', fgColor = '#5a5a5a';
    $('#backgroundColor').val(bgColor);
    $('#foregroundColor').val(fgColor);

    //Adding view-source button
    $('.loader-container').append('<div class="view-source">&lt;/&gt; Source</div>');
    var addStyle = function (styleId, cssRule) {
        $('#'+styleId).remove();
        $('<style>').prop({'type': 'text/css','id':styleId}).html(cssRule).appendTo('head');
    };
    //Function to convert HEX color to RGB
    var convertHexToRGB = function(hex){
	    hex = hex.replace('#','');
	    r = parseInt(hex.substring(0,2), 16);
	    g = parseInt(hex.substring(2,4), 16);
	    b = parseInt(hex.substring(4,6), 16);

	    result = r+','+g+','+b;
	    return result;
    }
    //Change background color
    $('#backgroundColor').off().on('change', function(){
        var color = $(this).val();
        var bgStyle = 'body{background-color:'+color+'}';
        addStyle('bgStyle', bgStyle);
        
    });
    //Change foreground color
    $('#foregroundColor').off().on('change', function(){
        var color = $(this).val();
        //Color change support for psudo elements
        var fgStyle = 'div[class*="sbl-"], div[class*="sbl-"]::after{color:'+color+'}';
        fgStyle += '.sbl-circ-path{color:rgba('+convertHexToRGB(color)+',0.2);border-color:rgba('+convertHexToRGB(color)+',0.2);border-right-color:'+color+'}';
        fgStyle += '.sbl-rect-spin-fill::after{background:rgba('+convertHexToRGB(color)+',0.5);}';
        addStyle('fgStyle', fgStyle);
    });
    //Showing view-source after ajax call
    $(document).on('click', '.view-source', function(){
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
