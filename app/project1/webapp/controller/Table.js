sap.ui.define([
    'sap/m/MessageToast',
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'require'
],
function (MessageToast, Controller, JSONModel, require) {
    "use strict";

    var PageController = Controller.extend("sap.suite.ui.microchart.sample.ComparisonMicroChartInGridTable.Page", {
        onInit: function() {
            var sPath = require.toUrl("./SampleData.json");
            this.oModel = new JSONModel(sPath);
            this.getView().setModel(this.oModel);
        },
        formatColor: function (value) {
            // Your condition for setting the color
            if (value === 1) {
              return "red";
            } else if (value === 2) {
              return "blue";
            } else if (value === 3) {
              return "green";
            } else {
              return "black";
            }
          },
        press: function (oEvent) {
            MessageToast.show("demo toast");
        }
    });

    return PageController;

});
