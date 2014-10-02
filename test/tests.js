// Qunit Tests


// assert: options
QUnit.test( "options", function( assert ) {

  // init plugin
  $("#qunit-fixture").formSubmit({
    submitBtn: ".submit"
  });
  
  assert.ok( $("#qunit-fixture").data('plugin_formSubmit').opt, "default global options are set" );

  assert.equal( $("#qunit-fixture").data('plugin_formSubmit').opt.submitBtn, ".submit",
    "can change the default options");
});


// assert: find class
QUnit.test( "find class", function( assert ) {

  // init plugin
  $("#qunit-fixture").formSubmit();
  
  var classCase1 = "class3",
      classCase2 = "class23 class12 class2",
      classCase3 = "class23 class12 class22";

  assert.ok( 
    $("#qunit-fixture").data('plugin_formSubmit').findClass($(".submit"), classCase1), 
    "class found!" 
  );

  assert.ok( 
    $("#qunit-fixture").data('plugin_formSubmit').findClass($(".submit"), classCase2), 
    "class found!" 
  );

  assert.ok( 
    !$("#qunit-fixture").data('plugin_formSubmit').findClass($(".submit"), classCase3), 
    "class not found!" 
  );

});


// assert: set prevention
QUnit.test( "set prevention", function( assert ) {

  // init plugin
  $("#qunit-fixture").formSubmit({
    submitBtn: ".submit"
  });
  
  $("#qunit-fixture").data('plugin_formSubmit').setPrevention( $(".submit") );

  assert.ok( 
    $(".submit").hasClass("btn-loading"), 
    "class 'btn-loading' found!" 
  );

  assert.ok( 
    $("#qunit-fixture").data('plugin_formSubmit').opt.prevent, 
    "prevent var is true!" 
  );

  // set var back to initial state
  $("#qunit-fixture").data('plugin_formSubmit').opt.prevent = false;

});


// assert: HTML5 validation check
QUnit.test( "by HTML5 validation error", function( assert ) {

  // init plugin
  $("#qunit-fixture").formSubmit({
    submitBtn: ".submit"
  });
  
  $("#qunit-fixture").data('plugin_formSubmit').onHTMLValidation( $(".submit") );

  assert.ok( 
    !$(".submit").hasClass("btn-loading"), 
    "class 'btn-loading' not found!" 
  );

  assert.ok( 
    !$("#qunit-fixture").data('plugin_formSubmit').opt.prevent, 
    "prevent var is false!" 
  );

  // set var back to initial state
  $("#qunit-fixture").data('plugin_formSubmit').opt.prevent = false;

});


// assert: HTML5 validation check
QUnit.test( "by HTML5 validation success", function( assert ) {

  // init plugin
  $("#qunit-fixture").formSubmit({
    submitBtn: ".submit"
  });

  // set value
  $(".submit").siblings("input").val("test");
  
  $("#qunit-fixture").data('plugin_formSubmit').onHTMLValidation( $(".submit") );

  assert.ok( 
    $(".submit").hasClass("btn-loading"), 
    "class 'btn-loading' found!" 
  );

  assert.ok( 
    $("#qunit-fixture").data('plugin_formSubmit').opt.prevent, 
    "prevent var is true!" 
  );

  // set var back to initial state
  $("#qunit-fixture").data('plugin_formSubmit').opt.prevent = false;
});