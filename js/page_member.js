function hashScroll(href) {
    href = typeof(href) == "string" ? href : $(this).attr("href");
    var fromTop = 65;
    if(href.indexOf("#") == 0) {
        var $target = $(href);
        if($target.length) {
            $('html, body').animate({ scrollTop: $target.offset().top - fromTop });
            if(history && "pushState" in history) {
                history.pushState({}, document.title, window.location.pathname + href);
                return false;
            }
        }
    }
}

function contentVisible() {
    if($(this).text() == "＋"){
        $(this).parent().parent().find(".panelcontent").show();
        $(this).text("－");
    }
    else{
        $(this).parent().parent().find(".panelcontent").hide();
        $(this).text("＋");
    }
    return false;
}

$(document).ready(function(){
    $("div[id^=page_member_menu]").on("click", "a", hashScroll);
    $(".panelhead").on("click", "a", contentVisible);
    menuLoginState(true);
});
