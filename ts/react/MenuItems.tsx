/// <reference path="../../typings/main.d.ts" />
import * as React from 'react';

interface Props{
    menuItems:any
    active:String
}

var setActiveClass = function(menuItems, active: string){
    
    menuItems[active].idName = menuItems[active].idName+'_on'
    return menuItems
}

var MenuItems = React.createClass<Props,{}>({
    render: function() {
        var rows = []
        var memuItems = setActiveClass(this.props.menuItems, this.props.active)
       for(var index in memuItems){
           rows.push(<li key={index}><a className="menubutton" id={memuItems[index].idName} href={index+'.html'}>{memuItems[index].linkName}</a></li>) 
       }
        return (
            <ul>
                {rows}
            </ul>
        );
    }
})

export default MenuItems