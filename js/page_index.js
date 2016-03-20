$(document).keypress(function(e) {
    if((e.keyCode || e.which) == 13) {
        $('#searchmainsubmit a').trigger('click');
    }
});

$(document).ready(function(){
    $('#searchmainsubmit a').click(function(){
        var maindiv = $(this).parent().parent(),
            area = maindiv.find('#searchmainarea').find('select'),
            type = maindiv.find('#searchmaintype').find('select'),
            mode = maindiv.find('#searchmainmode').find('select'),
            rare = maindiv.find('#searchmainrare').find('select'),
            text = maindiv.find('#searchmaintext'),
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
        if(area.val() == 0)
            location.href = 'sale.html' + url;
        else
            location.href = 'purchase.html' + url;
        return false;
    });
});
