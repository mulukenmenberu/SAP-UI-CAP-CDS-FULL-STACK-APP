sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/Label',
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
	'sap/ui/comp/smartvariants/PersonalizableInfo'
], function(Controller, JSONModel, Label, Filter, FilterOperator, PersonalizableInfo) {
	"use strict";

	return Controller.extend("project1.controller.DynamicPageListReport", {
		onInit: function() {
			this.oModel = new JSONModel();
			this.oModel.loadData(sap.ui.require.toUrl("project1/Model/model.json"), null, false);
			this.getView().setModel(this.oModel);

			this.applyData = this.applyData.bind(this);
			this.fetchData = this.fetchData.bind(this);
			this.getFiltersWithValues = this.getFiltersWithValues.bind(this);

			this.oSmartVariantManagement = this.getView().byId("svm");
			this.oExpandedLabel = this.getView().byId("expandedLabel");
			this.oSnappedLabel = this.getView().byId("snappedLabel");
			this.oFilterBar = this.getView().byId("filterbar");
			this.oTable = this.getView().byId("table");

			this.oFilterBar.registerFetchData(this.fetchData);
			this.oFilterBar.registerApplyData(this.applyData);
			this.oFilterBar.registerGetFiltersWithValues(this.getFiltersWithValues);

			var oPersInfo = new PersonalizableInfo({
				type: "filterBar",
				keyName: "persistencyKey",
				dataSource: "",
				control: this.oFilterBar
			});
			this.oSmartVariantManagement.addPersonalizableControl(oPersInfo);
			this.oSmartVariantManagement.initialise(function () {}, this.oFilterBar);

    //    this.formatCSClass();

            
        
		},
     
		onExit: function() {
			this.oModel = null;
			this.oSmartVariantManagement = null;
			this.oExpandedLabel = null;
			this.oSnappedLabel = null;
			this.oFilterBar = null;
			this.oTable = null;
		},

		fetchData: function () {
			var aData = this.oFilterBar.getAllFilterItems().reduce(function (aResult, oFilterItem) {
				aResult.push({
					groupName: oFilterItem.getGroupName(),
					fieldName: oFilterItem.getName(),
					fieldData: oFilterItem.getControl().getSelectedKeys()
				});

				return aResult;
			}, []);

			return aData;
		},

		applyData: function (aData) {
			aData.forEach(function (oDataObject) {
				var oControl = this.oFilterBar.determineControlByName(oDataObject.fieldName, oDataObject.groupName);
				oControl.setSelectedKeys(oDataObject.fieldData);
			}, this);
		},

		getFiltersWithValues: function () {
			var aFiltersWithValue = this.oFilterBar.getFilterGroupItems().reduce(function (aResult, oFilterGroupItem) {
				var oControl = oFilterGroupItem.getControl();

				if (oControl && oControl.getSelectedKeys && oControl.getSelectedKeys().length > 0) {
					aResult.push(oFilterGroupItem);
				}

				return aResult;
			}, []);

			return aFiltersWithValue;
		},

		onSelectionChange: function (oEvent) {
			this.oSmartVariantManagement.currentVariantSetModified(true);
			this.oFilterBar.fireFilterChange(oEvent);
		},

		onSearch: function () {
			var aTableFilters = this.oFilterBar.getFilterGroupItems().reduce(function (aResult, oFilterGroupItem) {
				var oControl = oFilterGroupItem.getControl(),
					aSelectedKeys = oControl.getSelectedKeys(),
					aFilters = aSelectedKeys.map(function (sSelectedKey) {
						return new Filter({
							path: oFilterGroupItem.getName(),
							operator: FilterOperator.Contains,
							value1: sSelectedKey
						});
					});

				if (aSelectedKeys.length > 0) {
					aResult.push(new Filter({
						filters: aFilters,
						and: false
					}));
				}

				return aResult;
			}, []);

			this.oTable.getBinding("items").filter(aTableFilters);
			this.oTable.setShowOverlay(false);
		},

		onFilterChange: function () {
			this._updateLabelsAndTable();
		},

		onAfterVariantLoad: function () {
			this._updateLabelsAndTable();
		},

		getFormattedSummaryText: function() {
			var aFiltersWithValues = this.oFilterBar.retrieveFiltersWithValues();

			if (aFiltersWithValues.length === 0) {
				return "No filters active";
			}

			if (aFiltersWithValues.length === 1) {
				return aFiltersWithValues.length + " filter active: " + aFiltersWithValues.join(", ");
			}

			return aFiltersWithValues.length + " filters active: " + aFiltersWithValues.join(", ");
		},

		getFormattedSummaryTextExpanded: function() {
			var aFiltersWithValues = this.oFilterBar.retrieveFiltersWithValues();

			if (aFiltersWithValues.length === 0) {
				return "No filters active";
			}

			var sText = aFiltersWithValues.length + " filters active",
				aNonVisibleFiltersWithValues = this.oFilterBar.retrieveNonVisibleFiltersWithValues();

			if (aFiltersWithValues.length === 1) {
				sText = aFiltersWithValues.length + " filter active";
			}

			if (aNonVisibleFiltersWithValues && aNonVisibleFiltersWithValues.length > 0) {
				sText += " (" + aNonVisibleFiltersWithValues.length + " hidden)";
			}

			return sText;
		},

		_updateLabelsAndTable: function () {
			this.oExpandedLabel.setText(this.getFormattedSummaryTextExpanded());
			this.oSnappedLabel.setText(this.getFormattedSummaryText());
			this.oTable.setShowOverlay(true);
		},
		onUserIdClick: function(oEvent) {
			// Get the clicked user ID
			var sUserId = oEvent.getSource().getText();
	  
			// Navigate or perform any action based on the clicked user ID
			// You can use routing or any other logic here
			// For example, opening a new page or showing a dialog
			alert("User ID clicked: " + sUserId);
		  },

 // test modal
    onpress_cs:function(event){
	alert(" CS  Clicked"+event);
	},
	onpress_AP:function(){
	alert(" AP  Clicked");
	},
	onpress_DC:function(){
	alert(" DC  Clicked");
	},
	onpress_FC:function(){
	alert(" FC  Clicked");
	},
	onpress_LF:function(){
	alert(" LF  Clicked");
	},

		  onCopyTextToClipboard: function() {
			var table = this.getView().byId("table");
		
			// Get column names
			var columnNames = table.getColumns().map(function(column) {
				var header = column.getHeader();
				return header.getText();
			}).join(",");
		
			// Get table data
			var tableData = table.getItems().map(function(item) {
				var cells = item.getCells();
				return cells.map(function(cell) {
					// Adjust based on the actual content of the cells
					if (cell instanceof sap.m.Link) {
						return cell.getText();
					} else if (cell instanceof sap.m.ObjectIdentifier) {
						return cell.getTitle();
					} else if (cell instanceof sap.m.Text) {
						return cell.getText();
					} else {
						// Handle other types of controls if needed
						return "";
					}
				}).join(",");
			}).join("\n");
		
			// Concatenate column names and table data
			var textToCopy = columnNames + "\n" + tableData;
		
			// Display in the console (for testing)
			// console.log(textToCopy);
		
			// Copy to clipboard
			navigator.clipboard.writeText(textToCopy)
				.then(function() {
					// console.log("Table content copied to clipboard successfully");
					sap.m.MessageToast.show("Table content copied to clipboard");
				})
				.catch(function(error) {
					console.error("Error copying table content to clipboard: ", error);
				});
		},
		
		
		
		
		
	});
});
