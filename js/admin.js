$(function(){  
    /*
    $('#signup input[id=submit_signup]').click(function(){
        var vid = $("#pttid").val();
        var vperm = $('input[name="permission"]:checked').val();
        var aperm = ["一般", "管理人員"];
        var checkExp = /^[\d|a-zA-Z]+$/;
        if($("#pttid").val() == ""){
            alert("使用者名稱欄位不得為空。");
        }
        else if(!checkExp.test(vid)){
            alert("PTT ID只能有數字與英文字母。");
        }
        else if(confirm("確定要把 " + vid + " 的權限設為 " +
                        aperm[vperm] + " 嗎？")){
            var user = {};
            user.pttid = vid;
            user.permission = vperm;
            $.ajax({
                type: 'POST',
                data: JSON.stringify(user),
                contentType: 'application/json',
                dataType: 'json',
                url: "http://140.112.28.131:3000/permission",
                success: function(data){
                    var stat = JSON.parse(JSON.stringify(data))["status"];
                    if(parseInt(stat) == 1){
                        alert("變更成功。");
                        $("#pttid").val("");
                    }
                    else if(parseInt(stat) == 2){
                        alert("找不到PTT ID " + vid + " 。");
                    }
                    else{
                        alert("不明原因失敗。");
                    }
                },
                error: function(xhr, ajaxOptions, thrownError){ 
                    alert(xhr.status + ' ' + thrownError);
                }
            });
        }
    });
    */
    
    
    menuLoginState(true);
});
