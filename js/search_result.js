function displayResult(type){
    if(type == 1){
        $('.productlist_g').toggleClass('productlist_g productlist_l');
    }
    else if(type == 2){
        $('.productlist_l').toggleClass('productlist_l productlist_g');
    }
    return false;
}
