/// <reference path="../../typings/main.d.ts" />
import * as React from 'react';

interface Props{
   
}

var SearchBar = React.createClass<Props,{}>({
    render: function() {
        return (
            <div className="panel" id="searchmain">
               <input type="text" id="searchmaintext" name="query" />
                <input type="text" id="searchmaintype" name="method" />
                <div id="searchmainsubmit"><a href="#">搜尋</a></div>
                <div className="searchmainbutton"><a href="#">列表顯示</a></div>
                <div className="searchmainbutton"><a href="#">圖片顯示</a></div>  
            </div>
        );
    }
})

export default SearchBar