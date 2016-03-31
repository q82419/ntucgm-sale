$(document).keypress(function(e) {
    if((e.keyCode || e.which) == 13) {
        $('#searchmainsubmit a').trigger('click');
    }
});

$(document).ready(function(){
    initSearchBar(false);
    submitListener(false);
    menuLoginState(true);
});
