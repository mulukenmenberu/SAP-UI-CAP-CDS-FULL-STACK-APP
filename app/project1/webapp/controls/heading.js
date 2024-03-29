sap.ui.define([
   "sap/ui/core/Control"
], function(Control) {
    'use strict';
    Control.extend("project1.controls.heading",{
    metadata:{
        properties:{
            "magic":"",
            "mario":"",
            "border":""
        }
    },
    init:function(){
        this.setBorder("1px solid black");
    },
    renderer:function(oRm,oControl)
    {
    //    oRm.write("<h1 style='color:"+ oControl.getMario() + "'>" + oControl.getMagic()+"</h1>") 
    oRm.write("<h1");
    oRm.addStyle("color",oControl.getMario());
    oRm.addStyle("border",oControl.setBorder());
   oRm.writeStyles();
   oRm.write(">" + oControl.getMagic() + "</h1>");
 }

    });
});