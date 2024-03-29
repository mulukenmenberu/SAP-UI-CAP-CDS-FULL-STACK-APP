sap.ui.core.Control.extend("CustomProgressBar.rpb", {

  polarToCartesian: function (centerX, centerY, radius, angleInDegrees) {
        var angleInRadians = angleInDegrees * Math.PI / 180.0;
        var x = centerX + radius * Math.cos(angleInRadians);
        var y = centerY + radius * Math.sin(angleInRadians);
        return [x, y];
    },
    drawCircle: function (elm, centerX, centerY, radius, percentage) {
        var angle = (360 * (percentage / 100)) % 360;
        var start = this.polarToCartesian(centerX, centerY, radius, -90);
        var end = this.polarToCartesian(centerX, centerY, radius, -(angle + 90));
        var large = percentage < 50 ? 0 : 1;
        var length = (2 * Math.PI * radius) * (percentage / 100);
        console.log(start, end, angle);
        elm.setAttribute('d', 'M ' + start[0] + ',' + start[1] + ' A ' + radius + ',' + radius + ' ' + 0 + ' ' + large + ',' + 0 + ' ' + end[0] + ',' + end[1]);
        //elm.setAttribute('stroke-dasharray', length);
        //elm.setAttribute('stroke-dashoffset', length);
    },
  metadata: {
    properties: {
      "size" : {type: "sap.ui.core.CSSSize", defaultValue: "200px"},
      "radius": {type: "int", defaultValue: 100},
      "thickness": {type: "int", defaultValue: 8},
      "bgcolor": {type: "sap.ui.core.CSSColor", defaultValue: "lightgreen"},
      "progresscolor": {type: "sap.ui.core.CSSColor", defaultValue: "green"}
    }
  },
  
  renderer: function(oRm, oControl) {
    var radius = parseInt(oControl.getProperty('radius'), 10);
    var thickness = parseInt(oControl.getProperty('thickness'), 10);
    var computedRadius = radius - thickness/2;
    oRm.write("<div"); 
    oRm.writeControlData(oControl);  // writes the Control ID and enables event handling - important!
    oRm.addStyle("width", oControl.getSize());  // write the Control property size; the Control has validated it to be a CSS size
    oRm.addStyle("height", oControl.getSize());
    oRm.writeStyles();
    oRm.addClass("rpb");        // add a CSS class for styles common to all control instances
    oRm.writeClasses();              // this call writes the above class plus enables support for Square.addStyleClass(...)
    oRm.write(">");
    oRm.write('<svg width="'+oControl.getSize()+'" height="'+oControl.getSize()+'"><circle cx="'+radius+'" cy="'+radius+'" r="'+computedRadius+'" stroke="'+oControl.getProperty('bgcolor')+'" stroke-width="'+thickness+'" fill="none" />'+
          '<path id="svgpath" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);" fill="none" stroke="'+oControl.getProperty('progresscolor')+'" stroke-width="'+thickness+'"></path>'+
          '</svg>');
    oRm.write('<span class="rpb_text">');
    oRm.writeEscaped('0%'); // write another Control property, with XSS protection
    oRm.write('</span>');
    oRm.write("</div>");
  },

  setPercentage: function(percentage) {
    var radius = parseInt(this.getProperty('radius'), 10);
    var thickness = parseInt(this.getProperty('thickness'), 10);
    var computedRadius = radius - thickness/2;    
    this.drawCircle(document.getElementById('svgpath'), radius, radius, computedRadius, percentage);
    $('.rpb_text').text(percentage + "%");	//TODO This selection should be context specific and not generic class based otherwise it will change value on all rpb 
            var path = document.querySelector('svg path');
    var length = path.getTotalLength();
    // Clear any previous transition
    path.style.transition = path.style.WebkitTransition =
      'none';
    // Set up the starting positions
    path.style.strokeDasharray = length + ' ' + length;
    path.style.strokeDashoffset = length;
    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    path.getBoundingClientRect();
    // Define our transition
    path.style.transition = path.style.WebkitTransition =
      'stroke-dashoffset 2s ease-in-out';
    // Go!
    path.style.strokeDashoffset = '0';
  }
});
window.rpb = new CustomProgressBar.rpb({size: "100px", radius: 50, thickness: 14, bgcolor: "lightblue", progresscolor: "blue"}).placeAt("content");//.setPercentage('75');
$('#updatePercentage').click(function(){
window.rpb.setPercentage($('#percent').val())
});