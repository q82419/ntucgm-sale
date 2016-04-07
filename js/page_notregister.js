$(document).keypress(function(e) {
    if((e.keyCode || e.which) == 13) {
        $('#signup input').trigger('click');
    }
});

function recvData(data){
    if(data['status'] == '1'){
        FB.getLoginStatus(function(response) {
            if(response.status === 'connected') {
                // A fb account logged in, try to pass access token for ntucgmid
                $('#page_profile_fb a').html('https://www.facebook.com/' + response.authResponse.userID);
                $('#page_profile_fb a').attr('href', 'https://www.facebook.com/' + response.authResponse.userID);
                $('#content_main').show();
                $('#content_prepare').hide();
                $('#signup input').removeAttr('disabled');
            }
            else
                $(location).attr("href", "notlogin.html");
        });
    }
    else if(data['status'] == '0' || data['status'] == '2')
        $(location).attr("href", "/");
    else if(data['status'] == '3')
        $(location).attr("href", "notauthorized.html");
    else if(data['status'] == '4')
        $(location).attr("href", "notallowed.html");
}

function checkData(callback){
    var regu = "^([\\w]+[\\.]{0,1})+@([\\w-]+\\.)+[\\w]{2,4}$";
    var re = new RegExp(regu);
    if($('#page_profile_name').val() == "")
        callback("姓名欄位不得為空白");
    else if($('#page_profile_ptt1id').val() == "")
        callback("PTT1 ID不得為空白");
    else if($('#page_profile_ptt2id').val() == "")
        callback("PTT2 ID不得為空白");
    else if($('#page_profile_tel').val() == "")
        callback("聯絡電話欄位不得為空白");
    else if($('#page_profile_email').val() == "")
        callback("E-mail欄位不得為空白");
    else if($('#page_profile_email').val().search(re) == -1 )
        callback("請輸入有效的E-mail地址");
    else
        callback("");
}

function transData(){
    $('#signup input').attr('disabled','disabled');
    $('#message').html("帳號驗證中......");
    getLoginState(false, false, function(data){
        if(JSON.parse(JSON.stringify(data))['status'] == '1'){
            $('#message').html("註冊處理中......");
            var dataset = {'fbid': JSON.parse(JSON.stringify(data))["fbid"],
                           'name': $('#page_profile_name').val(),
                           'ptt1id': $('#page_profile_ptt1id').val(),
                           'ptt2id': $('#page_profile_ptt2id').val(),
                           'tel': $('#page_profile_tel').val(),
                           'email': $('#page_profile_email').val()};
            connectServer('POST',
                          JSON.stringify(dataset),
                          'register',
                          function(data){
                var stat = JSON.parse(JSON.stringify(data))["status"];
                if(parseInt(stat) == 0)
                    $(location).attr("href", "notauthorized.html");
                else
                    $('#message').html("不明原因失敗");
            });
        }
        else
            $('#message').html("FB資訊驗證錯誤，可能您的FB已登出，請重新整理後再試");
        $('#signup input').removeAttr('disabled');
    });
}

function submitData(){
    checkData(function(res){
        $('#message').html(res);
        if(res == "")
            transData();
    });
}


$(document).ready(function(){
    $('#content_main').hide();
    $('#signup input').attr('disabled', 'disabled');
    getLoginState(false, true, recvData);
    $('#signup input').click(submitData);
});
