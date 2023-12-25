sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "sap/m/ColumnListItem",
    "sap/m/Input"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */

    function (Controller, MessageToast, ColumnListItem,Input) {
        "use strict";

        return Controller.extend("project1.controller.Login", {
            onLoginClick: function(){
                var username = this.getView().byId('username').getValue();
                var pwd = this.getView().byId('pwd').getValue();

                this._sendLoginRequest(username, pwd);
           
            },
            _sendLoginRequest: function (username, password) {
                // Construct the request body
                var requestBody = {
                    input: {
                        username: username,
                        password: password
                    }
                };
    
                // Make the POST request using fetch API
                fetch("https://port4004-workspaces-ws-wml98.us10.trial.applicationstudio.cloud.sap/rest/root/Login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                })
                .then(response => response.json())
                .then(data => {
                    // Handle the response data
                    console.log(data);
                    if(data.user && data.user.Account_status ==1){
                        MessageToast.show('Logged in sucecssfully');
                        this.getOwnerComponent().getRouter().navTo("dashboard");
                    }else{
                        MessageToast.show('Invalid credentials');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            },
       

        });
    });

