"use strict";
/// <reference path="../../typings/main.d.ts" />
var React = require('react');
var MenuItems_1 = require('./MenuItems');
var Menu = React.createClass({
    render: function () {
        return (React.createElement("div", {id: "menuinner"}, React.createElement(MenuItems_1.default, {menuItems: this.props.menuItems, active: this.props.active}), React.createElement("div", {id: "menulogin"}, React.createElement("a", {href: "#"}, "登出")), React.createElement("div", {id: "menulogname"}, "Hi, ", this.props.userName)));
    }
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Menu;
