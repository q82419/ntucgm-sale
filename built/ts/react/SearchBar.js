"use strict";
/// <reference path="../../typings/main.d.ts" />
var React = require('react');
var SearchBar = React.createClass({
    render: function () {
        return (React.createElement("div", {className: "panel", id: "searchmain"}, React.createElement("input", {type: "text", id: "searchmaintext", name: "query"}), React.createElement("input", {type: "text", id: "searchmaintype", name: "method"}), React.createElement("div", {id: "searchmainsubmit"}, React.createElement("a", {href: "#"}, "搜尋")), React.createElement("div", {className: "searchmainbutton"}, React.createElement("a", {href: "#"}, "列表顯示")), React.createElement("div", {className: "searchmainbutton"}, React.createElement("a", {href: "#"}, "圖片顯示"))));
    }
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SearchBar;
