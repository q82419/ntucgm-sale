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

$(document).ready(function(){
    $("body").on("click", "a", hashScroll);
});
