/// <reference path="../../typings/main.d.ts" />
import * as React from 'react';
import MenuItems from './MenuItems'

interface Props{
    menuItems:any
    userName:String
    active:String
}

var Menu = React.createClass<Props,{}>({
    render: function() {
        return (
                 <div id="menuinner">
                 <MenuItems menuItems={this.props.menuItems} active={this.props.active} />
                  <div id="menulogin"><a href="#">登出</a></div>
                    <div id="menulogname">Hi, {this.props.userName}</div>
                   </div>
                
        );
    }
})

export default Menu