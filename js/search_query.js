function searchMethod(method){
    if(method.value == 3){
        $('#searchmaintext').hide();
        $('#searchmainrare').show();
    }
    else{
        $('#searchmaintext').show();
        $('#searchmainrare').hide();
    }
}

$(document).ready(function(){
    $('#searchmainrare').hide();
    $.ajax({
        url: '../data/rarelist.xml',
        type: 'GET',
        dataType: 'xml',
        success: function(xml){
            $(xml).find("entry").each(function(index){
                var v = parseInt($(this).find('value').text()),
                    t = $(this).find('text').text();
                $('#searchmainrare').find('select').append($("<option></option>").attr("value", v).text(t));
            });
        }
    });
});
