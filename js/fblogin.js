// FB SDK Loading and Initialization
var fbsdkStat = false;
function fbsdkInitialization(callback) {
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
        fbsdkStat = true;
        callback();
    };
}

// Login Button Click Listener
function loginPressListenerCallback(response){
    if (response.status === 'connected') {
        passAccessToken(response.authResponse.accessToken, false, function(data){
            if(data['status'] == '1')
                $(location).attr("href", "notregister.html");
            else if(data['status'] == '3')
                $(location).attr("href", "notauthorized.html");
            else if(data['status'] == '4')
                $(location).attr("href", "notallowed.html");
        });
    } else if (response.status === 'not_authorized') {
        alert('Please log into this app.');
    } else {
        alert('Please log into Facebook.');
    }
}
function loginPressListener(buttonID) {
    $('#' + buttonID + ' a').click(function(){
        FB.getLoginStatus(function(response) {
            if(response.status !== 'connected') {
                FB.login(function(res){
                    loginPressListenerCallback(res);
                });
            }
            else
                loginPressListenerCallback(response);
        });
        return false;
    });
}
// Logout Button Click Listener
function logoutPressListenerCallback(){
    FB.getLoginStatus(function(response) {
        if(response.status === 'connected' || response.status === 'not_authorized') {
            FB.logout(function(response){
                localStorage.removeItem("ntucgmid");
                setMenuLoginName(false, '');
                $(location).attr("href", "index.html");
            });
        }
    });
}
function logoutPressListener(buttonID) {
    $('#' + buttonID + ' a').click(function(){
        if(confirm("確定要登出嗎？\n請注意，此動作會將您的Facebook一起登出。")){
            setMenuLoginName(false, 'Loading...');
            if(!fbsdkStat)
                fbsdkInitialization(logoutPressListenerCallback);
            else
                logoutPressListenerCallback();
        }
        return false;
    });
}
// UI Login name
function setMenuLoginName(isLogin, name) {
    if(isLogin){
        $('#menulogname').html('Hi, ' + name);
        $('#menulogin a').html('登出');
        logoutPressListener('menulogin');
    }
    else{
        $('#menulogname').html('');
        if(name != '')
            $('#menulogin a').html(name);
        else{
            $('#menulogin a').html('登入');
            loginPressListener('menulogin');
        }
    }
}


// Menu Login Status
function getLoginState(isRedirect, isForcedAuth, callback) {
    if(localStorage.ntucgmid && !isForcedAuth){
        // Has login in this computer
        connectServer('POST', JSON.stringify({'cmd': 'getStat', 'id': localStorage.ntucgmid}), 'login', function(data){
            var stat = JSON.parse(JSON.stringify(data))["status"];
            var name = JSON.parse(JSON.stringify(data))["name"];
            if(parseInt(stat) == 0){
                // Updated the timestamp
                setMenuLoginName(true, name);
                if(callback !== undefined)
                    callback(JSON.parse(JSON.stringify(data)));
            }
            else{
                // Need to check login state
                setMenuLoginName(false, 'Loading...');
                fbsdkInitialization(function(){
                    tryGetNTUCGMID(isRedirect, callback);
                });
            }
        });
    }
    else{
        // May changed computer or public computer
        setMenuLoginName(false, 'Loading...');
        if(!fbsdkStat){
            fbsdkInitialization(function(){
                tryGetNTUCGMID(isRedirect, callback);
            });
        }
        else
            tryGetNTUCGMID(isRedirect, callback);
    }
}



// Try to check the FB login status in this computer.
// If an account logged in, try to check if this account is registered in server.
// Else, redirect to login page.
function tryGetNTUCGMID(isRedirect, callback){
    FB.getLoginStatus(function(response) {
        if(response.status === 'connected') {
            // A fb account logged in, try to pass access token for ntucgmid
            passAccessToken(response.authResponse.accessToken, isRedirect, callback);
        }
        else {
            if(isRedirect){
                // In other pages, redirect to notlogin.html
                $(location).attr("href", "notlogin.html");
            }
            else{
                setMenuLoginName(false, '');
                if(callback !== undefined)
                    callback();
            }
        }
    });
}


// Pass access token to server for getting user ID.
function passAccessToken(token, isRedirect, callback){
    connectServer('POST', JSON.stringify({'cmd': 'checkToken', 'token': token}), 'login', function(data){
        var stat = JSON.parse(JSON.stringify(data))["status"];
        var uid = JSON.parse(JSON.stringify(data))["uid"];
        var name = JSON.parse(JSON.stringify(data))["name"];
        if(parseInt(stat) == 0){
            // Checked the logged in fb account is registered
            localStorage.ntucgmid = uid;
            setMenuLoginName(true, name);
            if(callback !== undefined)
                callback(JSON.parse(JSON.stringify(data)));
        }
        else{
            localStorage.removeItem("ntucgmid");
            setMenuLoginName(false, '');
            if(isRedirect){
                if(parseInt(stat) == 1){
                    // FB account is not registered in server
                    $(location).attr("href", "notregister.html");
                }
                else if(parseInt(stat) == 3){
                    // Account has not been authorized yet
                    $(location).attr("href", "notauthorized.html");
                }
                else if(parseInt(stat) == 4){
                    // Account has been forbidden
                    $(location).attr("href", "notallowed.html");
                }
                else{
                    $(location).attr("href", "error.html");
                }
            }
            else if(callback !== undefined)
                callback(JSON.parse(JSON.stringify(data)));
        }
    });
}
