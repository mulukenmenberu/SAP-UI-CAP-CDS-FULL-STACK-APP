sap.ui.define([
  "sap/m/FlexBox"
], function(FlexBox) {
  "use strict";
  return FlexBox.extend("project1.controls.CustomFlexBox", {
      metadata: {
          properties: {
              backgroundColor: { type: "sap.ui.core.CSSColor", defaultValue: "" }
          }
      },
      renderer: {},
      onAfterRendering: function() {
          // Call the parent onAfterRendering function
          FlexBox.prototype.onAfterRendering.apply(this, arguments);
          // Set background color based on the provided value
          var backgroundColor = this.getBackgroundColor();
          if (backgroundColor) {
              this.$().css("background-color", backgroundColor);
          }
      }
  });
});
