sap.ui.define([
    "sap/m/Button",
    "sap/ui/core/Control"
  ], function(Button, Control) {
    "use strict";  
    var CustomColorButton = Button.extend("project1.controls.CustomColorButton", {
      metadata: {
        properties: {
          "color": { type: "string", defaultValue: "Default" } // Custom property to define button color
        },     
       
      },
      renderer: {
        render: function(oRm, oControl) {
          oRm.write("<div");
          oRm.writeControlData(oControl);
          oRm.addClass("customColorButton");
          if (oControl.getColor() === "Green") {
            oRm.addClass("greenButton");
          } else if (oControl.getColor() === "Red") {
            oRm.addClass("redButton");
          } 
          else if (oControl.getColor() === "Grey") {
            oRm.addClass("greyButton");
          }
          else if (oControl.getColor() === "blue") {
            oRm.addClass("blueButton");
          }
          else if (oControl.getColor() === "def") {
            oRm.addClass("defaultButton");
          }
          else {
            oRm.addClass("defaultButton");
          }
          oRm.writeClasses();
          oRm.write(">");
          oRm.writeEscaped(oControl.getText());
          oRm.write("</div>");
        }
      },    

    });  
    return CustomColorButton;
  });
  