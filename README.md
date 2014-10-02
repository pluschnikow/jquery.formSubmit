# jQuery Form-Submit [![Build Status](https://secure.travis-ci.org/pluschnikow/jquery.formSubmit.svg?branch=master)]

A jQuery-Plugin to prevent a user send a form several times (double-click). In addition, it set a loading status to the button which signals that the form was already dispatched.

## Usage

1. Include jQuery:

	```html
	<script src="https://code.jquery.com/jquery-x.xx.x.min.js"></script>
	```

2. Include plugin's code:

	```html
	<script src="jquery.formSubmit.min.js"></script>
	```

3. Call the plugin:

	```javascript
	$("body").formSubmit({
			
			// set submit button selector 
      submitBtn: "[type=\"submit\"]",

			// blacklist
      // set a space seperated list of classes
      classNoPrevention: "btn-no-prevention", 

      // class for the loading state
      classBtn: "btn-loading"
	});
	```

#### [demo/](https://github.com/pluschnikow/jquery.formSubmit/tree/master/demo)

Contains a simple HTML file to demonstrate your plugin.

#### [dist/](https://github.com/pluschnikow/jquery.formSubmit/tree/master/dist)

This is where the generated files are stored once Grunt runs.

#### [src/](https://github.com/pluschnikow/jquery.formSubmit/tree/master/src)

Contains the files responsible for your plugin.


## License

[MIT License](http://pluschnikow.mit-license.org/) © Konstantin Pluschnikow
