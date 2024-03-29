sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict";

	return Controller.extend("project1.controller.menu", {
		onInit: function() {
			// Example data
			var oModel = new sap.ui.model.json.JSONModel({
				yourItems: [
					{ Value: "High", Status: "green" },
					{ Value: "Medium", Status: "blue" },
					{ Value: "Low", Status: "red" },
				],
			});

			this.getView().setModel(oModel);
		},

		statusFormatter: function(sStatus) {
			var classes = "sapMText sapUiSelectable sapMTextBreakWord sapMTextMaxWidth cell-" + sStatus;
			// Add classes for hiding the element based on some condition
			if (sStatus === "someCondition") {
				classes += " sapUiHidden sapUiForcedHidden";
			}
			return classes;
		}
	});
});
