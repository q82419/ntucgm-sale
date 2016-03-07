"use strict";
/// <reference path="../../typings/main.d.ts" />
var React = require('react');
var setActiveClass = function (menuItems, active) {
    menuItems[active].idName = menuItems[active].idName + '_on';
    return menuItems;
};
var MenuItems = React.createClass({
    render: function () {
        var rows = [];
        var memuItems = setActiveClass(this.props.menuItems, this.props.active);
        for (var index in memuItems) {
            rows.push(React.createElement("li", {key: index}, React.createElement("a", {className: "menubutton", id: memuItems[index].idName, href: index + '.html'}, memuItems[index].linkName)));
        }
        return (React.createElement("ul", null, rows));
    }
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = MenuItems;
