sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/Label',
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
	'sap/ui/comp/smartvariants/PersonalizableInfo',
	"sap/m/MessageBox",
	"sap/m/Dialog",
	"sap/m/Button",
	"sap/m/Input",
	"sap/m/VBox",
	'sap/ui/core/Fragment',
	'sap/m/MessageToast',
], function(Controller, JSONModel, Label, Filter, FilterOperator, PersonalizableInfo,MessageBox,Dialog,Button,Input,VBox,Fragment,MessageToast) {
	"use strict";
	return Controller.extend("project1.controller.DynamicPageListReport", {
		onInit: function() {
			var currentDate = new Date();
            // Set the current date and time to the model
            var oModel = new JSONModel({
                currentDate: currentDate
            });
            this.getView().setModel(oModel, "curDate");
			var oUserData = {
				name: "",
				age: 0
				// Add more user data properties as needed
			  };
			  var oModel = new JSONModel(oUserData);
			  this.getView().setModel(oModel, "userData");
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
			alert("User ID clicked: " + sUserId);
		  },
		onsuperman: function(event) {
			sap.m.MessageBox.success("This is CS!");
		},
		onmouseout: function(event) {
			var oMessageBox = sap.m.InstanceManager.getOpenDialogs()[0]; // Get the open message box
			if (oMessageBox) {
				oMessageBox.close();
			}
		},
   onsuperman_CS:function(event){
	sap.m.MessageBox.success("this is CS!");
	},
	onsuperman_AP:function(){
		sap.m.MessageBox.success("this is AP!");
	},
	onsuperman_DC:function(){
		sap.m.MessageBox.success("this is DC!");
	},
	onsuperman_FC:function(){
		sap.m.MessageBox.success("this is FC!");
	},
	onsuperman_LF:function(){
		sap.m.MessageBox.success("this is LF!");
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
		// for dialog box 
		onDialogClose: function() {
			var oDialog = this.getView().byId("OpenDialog");
			oDialog.close();
		},		
		onOpenAddDialog: function() {
			var oDialog = this.getView().byId("OpenDialog");
			oDialog.open();			
		},
		
		onOpenModal: function() {
			// Create form elements
			var nameLabel = new Label({ text: "Input 1" });
			var nameInput = new Input();
			var emailLabel = new Label({ text: "Input 2" });
			var emailInput = new Input();			
			// Create submit button
			var submitButton = new Button({
			  text: "Submit",
			  press: function() {
				dialog.close();
			  }
			});	  
			// Create form layout
			var formLayout = new VBox({
			  items: [nameLabel, nameInput, emailLabel, emailInput]
			});	  
			// Create dialog
			var dialog = new Dialog({
			  title: "Sample Modal with Form",
			  content: [formLayout],
			  beginButton: submitButton,
			  endButton: new Button({
				text: "Close",
				press: function() {
				  dialog.close();
				}
			  }),
			  afterClose: function() {
				dialog.destroy();
			  }
			});
			// Open dialog
			dialog.open();
		  },
					
		  // anothe pop up 
		  handleOpenDialog: function () {
			if (!this._pDialog) {
				this._pDialog = Fragment.load({
					name: "project1.View.Dialog",
					controller: this
				});
			}
			this._pDialog.then(function(oDialog) {
				oDialog.open();
			});
		},
		onCloseDialog:function(){
			if (!this._pDialog) {
				this._pDialog = Fragment.load({
					name: "project1.View.Dialog",
					controller: this
				});
			}
			this._pDialog.then(function(oDialog) {
				oDialog.close();
			});
		},
		onDialogClose: function(oEvent) {
			var oDialog = oEvent.getSource();
			oDialog.destroy();
		},
		handleConfirm: function (oEvent) {
			if (oEvent.getParameters().filterString) {
				MessageToast.show(oEvent.getParameters().filterString);
			}
		},		
		
	});
});
