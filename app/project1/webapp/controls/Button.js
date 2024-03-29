sap.ui.define([
    "sap/m/Button"
], function(Button) {
    return Button.extend("project1.controls.Button", {
        metadata: {
            events: {
                "superman": {},
                "mouseout": {}
            }
        },
        renderer:{},
        onmouseover: function(event) {
            this.fireSuperman();
            event.stopPropagation();
        },
        onmouseout: function(event) {
            this.fireEvent("mouseout"); // Fire the custom 'mouseout' event
        }
    });
});
