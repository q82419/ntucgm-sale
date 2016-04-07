function inputValidNumber(e, pnumber){
    if(!/\d+$/.test(pnumber))
        $(e).val(/\d+/.exec($(e).val()));
    return false;
}

function inputValidAlpha(e, pnumber){
    if(!/[0-9a-zA-Z]+$/.test(pnumber))
        $(e).val(/[0-9a-zA-Z]+/.exec($(e).val()));
    return false;
}

function inputValidEmail(e, pnumber){
    if(!/[_@.0-9a-zA-Z]+$/.test(pnumber))
        $(e).val(/[0-9a-zA-Z]+/.exec($(e).val()));
    return false;
}

function connectServer(type, dataset, server, callback){
    $.ajax({
        type: type,
        data: dataset,
        contentType: 'application/json',
        dataType: 'json',
        url: "http://140.112.28.131:3000/" + server,
        success: function(data){
        	callback(data);
        },
        error: function(xhr, ajaxOptions, thrownError){
            if(xhr.readyState > 1)
                alert("伺服器連接錯誤，請稍候再試或聯絡管理員。");
        }
    });
}
