// FB SDK Loading and Initialization
function fbsdkInitialization(isRedirect) {
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id))
            return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '802857543191575',
            cookie     : true,
            xfbml      : true,
            version    : 'v2.5'
        });
        tryGetNTUCGMID(isRedirect);
    };
}

// Login Button Click Listener
function loginPressListener(buttonID) {
    $('#' + buttonID + ' a').click(function(){
        FB.login(function(response){
            if (response.status === 'connected') {
                passAccessToken(response.authResponse.accessToken, false);
                $(location).attr("href", "index.html");
            } else if (response.status === 'not_authorized') {
                alert('Please log into this app.');
            } else {
                alert('Please log into Facebook.');
            }
        });
        return false;
    });
}
// UI Login name
function setMenuLoginName(isLogin, name) {
    if(isLogin){
        $('#menulogname').html('Hi !!');
        $('#menulogin a').html('登出');
    }
    else{
        $('#menulogname').html('');
        $('#menulogin a').html('登入');
    }
}


// Menu Login Status
function menuLoginState(isRedirect) {
    if(localStorage.ntucgmid){
        // Has login in this computer
        $.ajax({
            type: 'POST',
            data: JSON.stringify({'cmd': 'getStat', 'id': localStorage.ntucgmid}),
            contentType: 'application/json',
            dataType: 'json',
            url: "http://140.112.28.131:3000/login",
            success: function(data){
                var stat = JSON.parse(JSON.stringify(data))["status"];
                var uid = JSON.parse(JSON.stringify(data))["id"];
                if(parseInt(stat) == 1){
                    // Updated the timestamp
                    setMenuLoginName(true, '1234');
                }
                else{
                    // Need to check login state
                    fbsdkInitialization(isRedirect);
                }
            },
            error: function(xhr, ajaxOptions, thrownError){ 
                alert(xhr.status + ' ' + thrownError);
            }
        });
    }
    else{
        // May changed computer or public computer
        setMenuLoginName(false, '');
        fbsdkInitialization(isRedirect);
    }
}


// Try to check the FB login status in this computer.
// If an account logged in, try to check if this account is registered in server.
// Else, redirect to login page.
function tryGetNTUCGMID(isRedirect){
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            // A fb account logged in, try to pass access token for ntucgmid
            passAccessToken(response.authResponse.accessToken, isRedirect);
        }
        else{
            if(isRedirect){
                // In other pages, redirect to notlogin.html
                $(location).attr("href", "notlogin.html");
            }
        }
    });
}


// Pass access token to server for getting user ID.
function passAccessToken(token, isRedirect){
    $.ajax({
        type: 'POST',
        data: JSON.stringify({'cmd': 'checkToken', 'token': token}),
        contentType: 'application/json',
        dataType: 'json',
        url: "http://140.112.28.131:3000/login",
        success: function(data){
            var stat = JSON.parse(JSON.stringify(data))["status"];
            var uid = JSON.parse(JSON.stringify(data))["id"];
            if(parseInt(stat) == 1){
                // Checked the logged in fb account is registered
                localStorage.ntucgmid = uid;
                setMenuLoginName(true, uid);
            }
            else{
                // FB account is not registered in server
                localStorage.removeItem("ntucgmid");
                setMenuLoginName(false, '');
                if(isRedirect){
                    $(location).attr("href", "notlogin.html");
                }
            }
        },
        error: function(xhr, ajaxOptions, thrownError){
            alert('passaccess' + xhr.status + ' ' + thrownError);
        }
    });
}


