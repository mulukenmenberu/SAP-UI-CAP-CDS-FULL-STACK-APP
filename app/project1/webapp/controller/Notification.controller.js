sap.ui.define([
    "sap/ui/core/mvc/Controller"
  ], function (Controller) {
    "use strict";
  
    return Controller.extend("project1.controller.Notification", {
      // Your controller logic for SubItem1 goes here
      onInit: function () {
      alert('helo');
      }
    });
  });
  