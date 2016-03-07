"use strict";
/// <reference path="../../typings/main.d.ts" />
var React = require('react');
var Menu_1 = require('./Menu');
var SearchBar_1 = require('./SearchBar');
var ReactDom = require('react-dom');
require('../../css/style.css');
require('../../css/menu.css');
require('../../css/panel.css');
require('../../css/search.css');
require('../../css/form.css');
require('../../css/footer.css');
require('../../css/page_index.css');
var menuItems;
var userName;
var active;
var IndexApp = React.createClass({
    componentWillMount: function () {
        menuItems = {
            index: { linkName: '拍賣首頁', idName: 'menubutton_f' },
            member: { linkName: '我的拍賣', idName: 'menubutton_b1' },
            quickon: { linkName: '快速上架', idName: 'menubutton_b2' },
            profile: { linkName: '會員中心', idName: 'menubutton_b3' },
            ntucup: { linkName: '台大盃', idName: 'menubutton_c' },
            admin: { linkName: '管理系統', idName: 'menubutton_m' },
            record: { linkName: '訊息公告', idName: 'menubutton_e' }
        };
        userName = 'q82419';
        active = 'index';
    },
    render: function () {
        return (React.createElement("div", null, React.createElement("div", {id: "menu"}, React.createElement(Menu_1.default, {menuItems: menuItems, userName: userName, active: active})), React.createElement("div", {className: "content"}, React.createElement(SearchBar_1.default, null))));
    }
});
ReactDom.render(React.createElement(IndexApp, null), document.getElementById('container'));
