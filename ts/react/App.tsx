/// <reference path="../../typings/main.d.ts" />
import * as React from 'react'
import Menu from './Menu'
import SearchBar from './SearchBar'
var ReactDom = require('react-dom')

require('../../css/style.css')
require('../../css/menu.css')
require('../../css/panel.css')
require('../../css/search.css')
require('../../css/form.css')
require('../../css/productlist.css')
require('../../css/footer.css')
require('../../css/page_index.css')
var menuItems;
var userName;
var active;

var IndexApp = React.createClass({
    componentWillMount: function() {
        menuItems = {
            index: { linkName: '拍賣首頁', idName: 'menubutton_f' },
            member: { linkName: '我的拍賣', idName: 'menubutton_b1' },
            quickon: { linkName: '快速上架', idName: 'menubutton_b2' },
            profile: { linkName: '會員中心', idName: 'menubutton_b3' },
            ntucup: { linkName: '台大盃', idName: 'menubutton_c' },
            admin: { linkName: '管理系統', idName: 'menubutton_m' },
            record: { linkName: '訊息公告', idName: 'menubutton_e' }
        }
        userName = 'q82419'
        active = 'index'
    },
    render: function() {
        return (
           <div> 
            <div id="menu">
                    <Menu menuItems={menuItems} userName={userName} active={active} />
            </div>
            <div id="content">
                    <SearchBar />
            </div>
           </div> 
        );
    }
})

ReactDom.render(
    <IndexApp />,
    document.getElementById('container')
);
