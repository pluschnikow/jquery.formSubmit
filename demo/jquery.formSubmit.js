// functional scope
;(function ($) {
  // strict mode
  "use strict";

  // plugin name & defaults
  var pluginName = "formSubmit",
      defaults = {
        // plugin option
        submitBtn: "[type=\"submit\"]",
        classNoPrevention: "btn-no-prevention", 
        classBtn: "btn-loading",

        //
        prevent: false
      };

  // Constructor
  var Plugin = function( self, options ) {
    
    // extend defaults/options
    this.opt = $.extend( {}, defaults, options);
    this.obj = self;
    this.init();
  };

  // Plugin prototype methods
  Plugin.prototype.init = function() {
   var self = this;

    // init event
    self.initEvent();

    return true;
  };

  /**
  * Initialize click event
  */
  Plugin.prototype.initEvent = function() {
    var self = this;

    // on submit
    self.obj.on("click", self.opt.submitBtn, function(event) {
      // get current event target
      var _eventTarget = event.target;
 
      // if the target is an sub-element
      if( $(_eventTarget).is(self.opt.submitBtn) === false ) {
        _eventTarget = $(_eventTarget).closest(self.opt.submitBtn);
      }

      // only submit without classes (see var: classNoPrevention)
      if( self.hasAnyClass(_eventTarget, self.opt.classNoPrevention) === false &&
          self.opt.prevent === false
        ) {

        // checking the HTML5 validation
        // and set before the beforeunload-event
        self.onHTMLValidation(_eventTarget);

        // windows on uload
        $(window).on("beforeunload",function() { 
          // set prevention
          self.setPrevention(_eventTarget);
        });

        // windows on uload
        // safari bugfix
        $(window).on("unload",function() { 
          // set prevention
          self.setPrevention(_eventTarget);
        });
      }
      else if( self.opt.prevent === true ) {
        event.preventDefault();
      }
    });
  };

  /**
  * In some cases the browser is to fast and do not set the loading class
  * by unload-event. This function set the class befor unload 
  * by checking the HTML5 validation
  * @param (_eventTarget) Current target Object
  */
  Plugin.prototype.onHTMLValidation = function(_eventTarget) {
    var self = this;

    // html5 browser with attribute-"require" support
    if( typeof $(_eventTarget).closest("form")[0].checkValidity === "function" ) {
      // is valid
      if( $(_eventTarget).closest("form")[0].checkValidity() === true ) {
        // set prevention
        self.setPrevention(_eventTarget);
      }
    }    
  };

  /**
  * Set prevention css class
  * set prevent flag
  * @param (_eventTarget) Current target Object
  */
  Plugin.prototype.setPrevention = function(_eventTarget) {
    var self = this;

    // set loading button
    $(_eventTarget).addClass(self.opt.classBtn);
    // set flag form send
    self.opt.prevent = true;
  };

  /**
  * Has any class
  * @param (_this) Current Object
  * @param (classesString) String
  *
  * @return Boolean
  */
  Plugin.prototype.hasAnyClass = function(_this, classesString) {

    var classes = classesString.split(" ");
    for ( var j = 0; j < classes.length; j++ ) {
      if ( $(_this).hasClass(classes[j]) ) {
        return true;
      }
    }
    return false;
  };
    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {

        yourOtherFunction: function () {
            console.log("sxsxsxs");
        }
    });
  // jQuery fn
  $.fn[pluginName] = function(options) {
    return this.each(function () {
      if ( !$.data(this, "plugin_" + pluginName) ) {
        $.data(this, "plugin_" + pluginName, new Plugin( $(this), options));
      }
    });
  };
   
})(jQuery);