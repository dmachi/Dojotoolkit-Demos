var TemplateHandler = require("TemplateHandler").TemplateHandler

Class({
	id: "Demo",
	properties: {
		name: {type: "string"},
		template: {type: "string", optional: true}
	}
});

Demo.prototype["representation:text/html"] =  { "quality": 1.0, "output": TemplateHandler };
