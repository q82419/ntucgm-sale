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

$(document).keypress(function(e) {
    if((e.keyCode || e.which) == 13) {
        $('#searchmainsubmit a').trigger('click');
    }
});


function initSearchBar(){
    $('#searchmain').find('#searchmaintype').find('select').val($.url().param('type'));
    if(parseInt($.url().param('type')) == 3){
        $('#searchmaintext').hide();
        $('#searchmainrare').show();
        $('#searchmain').find('#searchmainrare').find('select').val($.url().param('text'));
    }
    else
        $('#searchmain').find('#searchmaintext').val($.url().param('text'));
    $('#searchmain').find('#searchmainmode').find('select').val($.url().param('mode'));
    $('#searchmain').find('#searchmainpricelow').val($.url().param('plow'));
    $('#searchmain').find('#searchmainpriceup').val($.url().param('pup'));
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
        },
        complete: function(){
            initSearchBar();
        }
    });

    $('#searchmainsubmit a').click(function(){
        var maindiv = $(this).parent().parent(),
            type = maindiv.find('#searchmaintype').find('select'),
            mode = maindiv.find('#searchmainmode').find('select'),
            rare = maindiv.find('#searchmainrare').find('select'),
            text = maindiv.find('#searchmaintext'),
            plow = maindiv.find('#searchmainpricelow'),
            pup = maindiv.find('#searchmainpriceup'),
            url = "?type=" + type.val() + "&";
        if(type.val() == 3)
            url += "text=" + rare.val() + "&mode=" + mode.val();
        else{
            if(text.val() == ""){
                alert("搜尋欄位不得為空白。");
                return false;
            }
            url += "text=" + text.val() + "&mode=" + mode.val();
        }
        if(plow.val() != "" && pup.val() != ""){
            if(parseInt(plow.val()) > parseInt(pup.val())){
                alert("搜尋價格範圍輸入錯誤。");
                return false;
            }
        }
        if(plow.val() != "")
            url += "&plow=" + plow.val();
        if(pup.val() != "")
            url += "&pup=" + pup.val();
        location.href = $.url().attr('file') + url;
        return false;
    });
});
