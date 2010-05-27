require("Demo");

var demoId = "TestDemo1";
var demoName = "Test Demo 1";

//this is basically the container for our demo.  Any pages for the demo are extensions of this page.
Class({
	"id": "Demo/" + demoId,
	properties: {
		name: {type: "string", "default": demoName},
	},
	"extends": Demo
});

try {
	//try to load it, if not it will throw an error
	var test = load("Demo/" + demoId);
}catch(err){
	print("Setting up Demo Data for " + demoId + " : " + demoName);
	// the new demo object
	var demo = new Demo({
		"id":demoId,
		"name": demoName,
		"bodyContent": "<h1>" + demoName + " default</h1>"
	});
	commit();

	// create some page definitions
	var pages = [
		{id: "index", name: demoName, bodyContent: "<h1>Hello World</h1>"},
		{id: "p2", name: demoName + " -  Page 2", bodyContent: "<h1>Page 2</h1>"}
	]

	// fore ach of the pages create a new instance.  Mark the one with index as the main page
	var className = "Demo/" + demoId;

	print("Creating Demo Pages for " + demoName);
	pages.forEach(function(p,index){
		var page = new global[className](p);
		if (page.id=="index"){
			demo.mainPage=page;
		}
	});

	commit();
}
