sap.ui.define([], function () {
    "use strict";
  
    return {
      formatStatusClass: function(sStatus) {
        alert("Inside formatter");  // Check if this alert is triggered
        return "cell-" + sStatus;
      }
    };
  });
  