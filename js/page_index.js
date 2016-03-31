$(document).keypress(function(e) {
    if((e.keyCode || e.which) == 13) {
        $('#searchmainsubmit a').trigger('click');
    }
});

$(document).ready(function(){
    initSearchBar(true);
    submitListener(true);
    menuLoginState(false);
});
