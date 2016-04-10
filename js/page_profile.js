$(document).keypress(function(e) {
    if((e.keyCode || e.which) == 13) {
        $('#signup input').trigger('click');
    }
});

function recvData(data){
    $('#page_profile_fb a').html('https://www.facebook.com/' + data['fbid']);
    $('#page_profile_fb a').attr('href', 'https://www.facebook.com/' + data['fbid']);
    $('#page_profile_name').val(data['name']);
    $('#page_profile_ptt1id').val(data['ptt1id']);
    $('#page_profile_ptt2id').val(data['ptt2id']);
    $('#page_profile_tel').val(data['tel']);
    $('#page_profile_email').val(data['email']);
    if(data['permission'] == 0)
        $('#page_profile_permission').html('一般社員');
    else if(data['permission'] == 1)
        $('#page_profile_permission').html('管理人員');
    else if(data['permission'] == 2)
        $('#page_profile_permission').html('系統管理員');
    $('#content_main').show();
    $('#content_prepare').hide();
    $('#signup input').removeAttr('disabled');
}

function checkData(callback){
    var regu = "^([\\w]+[\\.]{0,1})+@([\\w-]+\\.)+[\\w]{2,4}$";
    var re = new RegExp(regu);
    if($('#page_profile_name').val() == "")
        callback("姓名欄位不得為空白");
    else if($('#page_profile_name').val().indexOf('"') != -1 || $('#page_profile_name').val().indexOf('\\') != -1 || $('#page_profile_name').val().indexOf("'") != -1)
        callback("姓名欄位不得有特殊字元");
    else if($('#page_profile_ptt1id').val() == "")
        callback("PTT1 ID不得為空白");
    else if($('#page_profile_ptt1id').val().length > 12 || $('#page_profile_ptt1id').val().length < 4)
        callback("PTT1 ID的長度必須在4~12之間");
    else if($('#page_profile_ptt2id').val() == "")
        callback("PTT2 ID不得為空白");
    else if($('#page_profile_ptt2id').val().length > 12 || $('#page_profile_ptt2id').val().length < 4)
        callback("PTT2 ID的長度必須在4~12之間");
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
    getLoginState(false, true, function(data){
        if(JSON.parse(JSON.stringify(data))['status'] == '0'){
            $('#message').html("資料儲存中......");
            var dataset = {'uid': JSON.parse(JSON.stringify(data))["uid"],
                           'name': $('#page_profile_name').val(),
                           'ptt1id': $('#page_profile_ptt1id').val(),
                           'ptt2id': $('#page_profile_ptt2id').val(),
                           'tel': $('#page_profile_tel').val(),
                           'email': $('#page_profile_email').val()};
            connectServer('POST',
                          JSON.stringify(dataset),
                          'profile',
                          function(data){
                var stat = JSON.parse(JSON.stringify(data))["status"];
                if(parseInt(stat) == 0)
                    $('#message').html("資料變更成功");
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
        if(res == "" && confirm("確定要儲存您的個人資訊嗎？"))
            transData();
    });
}


$(document).ready(function(){
    $('#content_main').hide();
    $('#signup input').attr('disabled','disabled');
    getLoginState(true, true, recvData);
    $('#signup input').click(submitData);
});
