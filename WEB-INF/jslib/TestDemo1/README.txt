/TestDemo1.js - This is the Demo Server Class file. It also creates any data objects if the main page isnt' found
/js - This should be contain any namespaces you wish to use on the client side. They should only be directories/namespaces and 
	will be copied to the appropriate location in the server heirarchy and also used for making builds.  Any CSS for
        your application should be within the resources directory of your namespace.  For theme specific css, the theme should be postfixed -theme
	in other words /js/resources/TestDemo1.css and /js/resources/TestDemo1-claro.css.  These CSS files should NOT import the base themes.
templates/ The template folder contains the templates specific to this application.  Templates will be copied/symlinked into the overall 
template structure.  In other words TestDemo1/templates  is available within the infrastructure as /templates/Demo/TestDemo1 .
 
