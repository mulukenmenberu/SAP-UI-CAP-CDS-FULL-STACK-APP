sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
  ], function(Controller, MessageToast) {
    "use strict";
  
    return Controller.extend("project1.controller.Member", {
      onInit: function() {
        // Initialize the model for data binding
      // Sample data for ComboBoxes
const oModel = new sap.ui.model.json.JSONModel({
  officeItems: [
    { key: "1", text: "Office A" },
    { key: "2", text: "Office B" },
    { key: "3", text: "Office C" }
  ],
  counselorItems: [
    { key: "1", text: "Counselor 1" },
    { key: "2", text: "Counselor 2" },
    { key: "3", text: "Counselor 3" }
  ],
  levelOfInterestItems: [
    { key: "1", text: "High" },
    { key: "2", text: "Medium" },
    { key: "3", text: "Low" }
  ],
  leadTypeItems: [
    { key: "1", text: "Type 1" },
    { key: "2", text: "Type 2" },
    { key: "3", text: "Type 3" }
  ],
  lastContactStatusItems: [
    { key: "1", text: "Status 1" },
    { key: "2", text: "Status 2" },
    { key: "3", text: "Status 3" }
  ],
  workingStudentItems: [
    { key: "1", text: "Yes" },
    { key: "2", text: "No" }
  ],
  initialStudentSourceItems: [
    { key: "1", text: "Source 1" },
    { key: "2", text: "Source 2" },
    { key: "3", text: "Source 3" }
  ],
  failureReasonItems: [
    { key: "1", text: "Reason 1" },
    { key: "2", text: "Reason 2" },
    { key: "3", text: "Reason 3" }
  ],
  itlsEnglishItems: [
    { key: "1", text: "English Course 1" },
    { key: "2", text: "English Course 2" },
    { key: "3", text: "English Course 3" }
  ]
});

this.getView().setModel(oModel);


        // Sample data for ComboBoxes



      },
  
      onRegisterPress: function() {
        // Retrieve data from the model
        var oModel = this.getView().getModel();
        var firstName = oModel.getProperty("/firstName");
        var lastName = oModel.getProperty("/lastName");
        var email = oModel.getProperty("/email");
        var password = oModel.getProperty("/password");
  
        // Perform registration logic (you can replace this with your actual registration logic)
        if (firstName && lastName && email && password) {
          // Registration successful
          MessageToast.show("Registration successful!");
          // You can add further logic here, e.g., navigate to a different page
        } else {
          // Registration failed - show an error message
          MessageToast.show("Please fill in all fields");
        }
      },onCreateNewLeadPress:function(){
        alert('Register clicked')
      }

      ,onSearchPress:function(){
        alert('Search clicked')
      }
    });
  });
  