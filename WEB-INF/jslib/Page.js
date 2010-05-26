var TemplateHandler = require("TemplateHandler").TemplateHandler;

Class({
	id: "Page",
	properties: {
		name: {type: "string"},
		template: {type: "string", optional: true}
	}
});

Page.prototype["representation:text/html"] = { "quality": 1.0, "output": TemplateHandler };

