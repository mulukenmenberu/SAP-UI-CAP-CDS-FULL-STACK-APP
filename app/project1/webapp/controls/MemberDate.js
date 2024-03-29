sap.ui.define([
    "sap/ui/core/Control"
], function(Control) {
    "use strict";
    return Control.extend("project1.controls.MemberDate", {
        metadata: {
            properties: {
                value: { type: "string", defaultValue: "" }
            }
        },
        renderer: function(oRm, oControl) {
            var sValue = oControl.getValue();
            var sCssClass = "";
            if (sValue) {
                var memberDate = new Date(sValue);
                var currentDate = new Date();                
                // Set time to 00:00:00 to compare only date/month/year
                memberDate.setHours(0, 0, 0, 0);
                currentDate.setHours(0, 0, 0, 0);
                console.log(memberDate)
                console.log(currentDate)
                if (memberDate < currentDate) {
                    sCssClass = "redText";
                } else if (memberDate > currentDate) {
                    sCssClass = "greyText";
                } else {
                    sCssClass = "greenText";
                }
            }
            oRm.openStart("span", oControl);
            oRm.class(sCssClass);
            oRm.class("customMemberDateIcon"); // Add this line to apply custom CSS class
            oRm.openEnd();
            oRm.text(sValue);
            oRm.close("span");
        }
    });
});
